#!/usr/bin/env python3
"""
Statický klon www.silwer.sk pre Vercel.

Stiahne všetky stránky zo sitemap (+ stránkovanie kategórií, ktoré nájde v odkazoch),
odstráni z nich meracie kódy (GTM, GA4, Meta pixel, Luigi's Box, Ellity/Leadhub),
nastaví noindex a uloží ich ako statické HTML do web-klon/public/.

Vlastné súbory Silweru z /user/documents/ (CSS a JS redizajnu, upravy hlavičky,
recenzie…) sa stiahnu lokálne, aby sa dali na klone upravovať. Obrázky produktov
a šablóna Shoptetu zostávajú na CDN Shoptetu (cdn.myshoptet.com).

Použitie:
    python3 web-klon/scripts/mirror.py            # celý web
    python3 web-klon/scripts/mirror.py --limit 5  # rýchly test na 5 stránkach
"""
import argparse
import gzip
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlparse

import requests

ORIGIN = "https://www.silwer.sk"
HOST = "www.silwer.sk"
CDN_OWN = "https://cdn.myshoptet.com/usr/www.silwer.sk"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0 Safari/537.36")

# Cesty, ktoré sa neklonujú (dynamické časti e-shopu + robots.txt Disallow).
SKIP_PREFIXES = (
    "/action/", "/admin/", "/api/", "/export/", "/script/", "/kosik/",
    "/objednavka/", "/login/", "/registracia/", "/klient/", "/affiliate",
    "/vyhladavanie/", "/ashwagandha-2/", "/user/", "/cms/",
)
# Ktoré vlastné súbory sa sťahujú lokálne (ostatné, napr. PDF, Vercel preposiela na silwer.sk).
LOCAL_EXT = re.compile(r"\.(css|js|svg|png|jpe?g|webp|gif|woff2?|ttf|json)$", re.I)
ASSET_EXT = re.compile(r"\.(jpe?g|png|gif|webp|svg|ico|pdf|zip|docx?|xlsx?|css|js|xml|gz|txt|mp4|webm)$", re.I)

# Meracie a marketingové skripty, ktoré na klone nemajú čo robiť
# (inak by klon zapisoval návštevy do GA4 / Meta / Leadhubu ostrého webu).
TRACKER_PATTERNS = [
    # Google Tag Manager loader + noscript iframe
    re.compile(r"<script>[^<]*googletagmanager\.com/gtm\.js[^<]*</script>", re.S),
    re.compile(r"<noscript>\s*<iframe[^>]*googletagmanager\.com/ns\.html[^>]*>\s*</iframe>\s*</noscript>", re.S),
    # GA4 knižnica (inline stub gtag() necháme, iba plní dataLayer)
    re.compile(r"<script[^>]*src=\"https://www\.googletagmanager\.com/gtag/js[^\"]*\"[^>]*>\s*</script>"),
    # Meta pixel (blok s fbevents.js) + noscript pixel
    re.compile(r"<script[^>]*>(?:(?!</script>).)*?fbevents\.js(?:(?!</script>).)*?</script>", re.S),
    re.compile(r"<noscript>\s*<img[^>]*facebook\.com/tr\?[^>]*>\s*</noscript>", re.S),
    # Luigi's Box (vyhľadávanie + analytika)
    re.compile(r"<script[^>]*src=\"https://scripts\.luigisbox\.tech/[^\"]*\"[^>]*>\s*</script>"),
    # Ellity / Leadhub bundle
    re.compile(r"<script[^>]*src=\"https://cdn-a\.ellity\.eu/[^\"]*\"[^>]*>\s*</script>"),
]

# Iba vlastné súbory Silweru: absolútne na silwer.sk / jeho CDN priečinku, alebo relatívne
# (/user/documents/... hneď za úvodzovkou či zátvorkou) – nie súbory iných doplnkov na CDN.
OWN_DOC_RE = re.compile(
    r"(?:https://cdn\.myshoptet\.com/usr/www\.silwer\.sk|https://www\.silwer\.sk|(?<=[\"'(=]))"
    r"(/user/(?:documents|icons)/[^\"'()<>\n]+)"
)


def session():
    s = requests.Session()
    s.headers["User-Agent"] = UA
    ca = os.environ.get("REQUESTS_CA_BUNDLE") or (
        "/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None)
    if ca:
        s.verify = ca
    return s


def get(s, url, tries=6):
    """GET s opakovaním. Shoptet pri rýchlom sťahovaní dočasne vracia 403/429 – vtedy počkáme."""
    r = None
    for i in range(tries):
        try:
            r = s.get(url, timeout=60, allow_redirects=True)
            if r.status_code not in (403, 429, 503) or i == tries - 1:
                return r
            wait = 15 * (i + 1)
            print(f"  {r.status_code} {url} – čakám {wait} s", file=sys.stderr)
        except requests.RequestException as e:
            if i == tries - 1:
                raise
            wait = 2 ** (i + 1)
            print(f"  retry {url}: {e}", file=sys.stderr)
        time.sleep(wait)
    return r


def sitemap_urls(s):
    idx = get(s, ORIGIN + "/sitemap.xml").text
    urls = []
    for sm in re.findall(r"<loc>([^<]+)</loc>", idx):
        data = get(s, sm).content
        if sm.endswith(".gz"):
            data = gzip.decompress(data)
        urls += re.findall(r"<loc>([^<]+)</loc>", data.decode("utf-8"))
    return urls


def norm_path(url):
    """Vráti normalizovanú cestu stránky (s lomkou na konci) alebo None."""
    p = urlparse(url)
    if p.scheme not in ("http", "https") or p.netloc not in (HOST, "silwer.sk"):
        return None
    if not p.path.startswith("/") and p.path:
        return None
    if p.query or ":" in p.path:
        return None
    path = p.path or "/"
    if path.startswith(SKIP_PREFIXES) or ASSET_EXT.search(path):
        return None
    if not path.endswith("/"):
        path += "/"
    return path


def out_file(public, path):
    rel = path.strip("/")
    return public / rel / "index.html" if rel else public / "index.html"


def make_links_relative(html):
    """V <a href> nahradí absolútne odkazy na silwer.sk relatívnymi (canonical ostáva)."""
    def fix_tag(m):
        return re.sub(r'href="https?://(?:www\.)?silwer\.sk(/[^"]*)?"',
                      lambda h: f'href="{h.group(1) or "/"}"', m.group(0))
    return re.sub(r"<a\b[^>]*>", fix_tag, html)


def transform(html, own_docs):
    for pat in TRACKER_PATTERNS:
        html = pat.sub("", html)
    html = re.sub(r'<meta name="robots" content="[^"]*"\s*/?>',
                  '<meta name="robots" content="noindex,nofollow">', html)
    html = make_links_relative(html)

    # Vlastné CSS/JS z /user/documents/ -> lokálne kópie
    def localize(m):
        path = unquote(m.group(1).split("?")[0].split("#")[0])
        if LOCAL_EXT.search(path):
            own_docs.add(path)
        return m.group(1)
    html = OWN_DOC_RE.sub(localize, html)
    return html


def find_links(html, base):
    for href in re.findall(r'<a\b[^>]*?href="([^"#]+)', html):
        yield urljoin(base, href.replace("&amp;", "&"))


def download_own_docs(s, public, docs):
    """Stiahne súbory z /user/documents/, v CSS dohľadá ďalšie url() odkazy."""
    done, queue = set(), list(docs)
    while queue:
        path = queue.pop()
        if path in done:
            continue
        done.add(path)
        # súbory sú aj na CDN Shoptetu – šetrí to samotný e-shop
        r = get(s, CDN_OWN + quote(path))
        if r.status_code != 200:
            r = get(s, ORIGIN + quote(path))
        if r.status_code != 200:
            print(f"  ! {r.status_code} {path}", file=sys.stderr)
            continue
        dest = public / path.lstrip("/")
        dest.parent.mkdir(parents=True, exist_ok=True)
        data = r.content
        if path.endswith(".css"):
            text = data.decode("utf-8", "replace")
            for ref in re.findall(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)", text):
                if ref.startswith("data:"):
                    continue
                full = urljoin(ORIGIN + path, ref)
                m = OWN_DOC_RE.search(full)
                if m and (full.startswith(ORIGIN) or full.startswith(CDN_OWN)):
                    ref_path = unquote(m.group(1).split("?")[0].split("#")[0])
                    if LOCAL_EXT.search(ref_path):
                        queue.append(ref_path)
            text = text.replace(CDN_OWN + "/user/documents/", "/user/documents/")
            data = text.encode("utf-8")
        dest.write_bytes(data)
    return done


# ---------------------------------------------------------------------------
# Vyhľadávanie na klone (náhrada za Luigi's Box): index produktov + stránka výsledkov
# ---------------------------------------------------------------------------
KLON_SRC = Path(__file__).resolve().parent.parent / "klon"
SEARCH_TAG = '<script src="/klon/search.js" defer></script>'
# nadradené kategórie, ktoré obsahujú takmer všetko – do hľadania nepatria
GENERIC_CATS = {"Všetky produkty", "Hľadám niečo na", "Pre koho", "Výživové doplnky"}


def div_end(html, start):
    """Index za uzatváracím </div> elementu <div ...> začínajúceho na pozícii start."""
    depth, pos = 0, start
    tag = re.compile(r"<(/?)div\b[^>]*>", re.I)
    for m in tag.finditer(html, start):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return m.end()
        pos = m.end()
    return len(html)


def page_type(html):
    m = re.search(r'"pageType":\s*"([^"]+)"', html)
    return m.group(1) if m else ""


def listing_cards(html):
    """Karty produktov z výpisu kategórie: [(cesta, obrázok, html karty)]."""
    i = html.find('id="products"')
    if i < 0:
        return []
    start = html.rfind("<div", 0, i)
    block = html[start:div_end(html, start)]
    out = []
    for m in re.finditer(r'<div class="product">', block):
        card = block[m.start():div_end(block, m.start())]
        href = re.search(r'<a href="(/[^"]+)" class="image"', card)
        img = re.search(r'<img[^>]*?(?:data-src|src)="(https://[^"]+)"', card)
        if href:
            out.append((href.group(1), html_unescape(img.group(1)).strip() if img else "", card))
    return out


def html_unescape(s):
    import html as _h
    return _h.unescape(s)


def build_search(public):
    products, cats, card_img = {}, {}, {}
    for f in sorted(site_pages(public)):
        if f.name != "index.html":
            continue
        rel = "/" + "/".join(f.parent.relative_to(public).parts) + "/"
        rel = rel.replace("//", "/")
        html = f.read_text(encoding="utf-8")
        if '<meta name="klon-novy" content="skryty">' in html:
            continue
        pt = page_type(html)
        if pt == "productDetail":
            name = re.search(r'"product":\s*\{.*?"name":\s*("(?:[^"\\]|\\.)*")', html, re.S)
            title = re.search(r'<meta property="og:title" content="([^"]*)"', html)
            img = re.search(r'<meta property="og:image" content="([^"]*)"', html)
            price = re.search(r'<meta itemprop="price" content="([0-9.]+)"', html)
            if not name:
                continue
            p = {"u": rel, "n": json.loads(name.group(1)),
                 "t": html_unescape(title.group(1)) if title else "",
                 "i": html_unescape(img.group(1)) if img else "", "c": []}
            if price:
                p["p"] = f"{float(price.group(1)):.2f}".replace(".", ",") + " €"
            products[rel] = p
        elif pt == "category":
            h1 = re.search(r'<h1[^>]*class="category-title"[^>]*>\s*([^<]+)', html)
            cname = html_unescape(h1.group(1)).strip() if h1 else ""
            for href, img, _ in listing_cards(html):
                if img:
                    card_img.setdefault(href, img)
                if cname and cname not in GENERIC_CATS:
                    cats.setdefault(href, set()).add(cname)
    for u, p in products.items():
        p["c"] = sorted(cats.get(u, ()))
        if u in card_img:          # menší obrázok z výpisu namiesto 1024 px og:image
            p["i"] = card_img[u]
    out = public / "klon"
    out.mkdir(parents=True, exist_ok=True)
    data = sorted(products.values(), key=lambda p: p["n"])
    (out / "search.json").write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")),
                                     encoding="utf-8")
    return len(data)


def build_search_page(public):
    """/vyhladavanie/ = stránka Všetky produkty so všetkými kartami; filtruje ich klon/search.js."""
    first = public / "vsetky" / "index.html"
    if not first.exists():
        return 0
    html = first.read_text(encoding="utf-8")
    cards = []
    for f in [first] + sorted((public / "vsetky").glob("strana-*/index.html"),
                              key=lambda p: int(re.sub(r"\D", "", p.parent.name) or 0)):
        cards += [c for _, _, c in listing_cards(f.read_text(encoding="utf-8"))]
    i = html.find('id="products"')
    start = html.rfind("<div", 0, i)
    end = div_end(html, start)
    open_tag = html[start:html.find(">", start) + 1]
    html = html[:start] + open_tag + "\n".join(cards) + "</div>" + html[end:]
    # stránkovanie preč
    for cls in ("pagination-wrapper", "pagination"):
        m = re.search(r'<div[^>]*class="[^"]*\b%s\b[^"]*"' % cls, html)
        if m:
            html = html[:m.start()] + html[div_end(html, m.start()):]
            break
    html = re.sub(r"<title>[^<]*</title>", "<title>Vyhľadávanie - Silwer.sk</title>", html, count=1)
    dest = public / "vyhladavanie" / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")
    return len(cards)


def site_pages(public):
    """Všetky HTML stránky klonu okrem pomocných súborov v klon/ a cache/."""
    for f in list(public.rglob("index.html")) + [public / "404.html"]:
        rel = f.relative_to(public).parts
        if f.exists() and rel[0] not in ("klon", "cache"):
            yield f


def postprocess(public):
    """Kroky, ktoré netreba sťahovať znova: nové produkty, skripty klonu, vyhľadávanie."""
    import shutil
    import produkty
    if KLON_SRC.exists():
        shutil.copytree(KLON_SRC, public / "klon", dirs_exist_ok=True)
    produkty.build(public)
    for f in site_pages(public):
        html = f.read_text(encoding="utf-8")
        new = html
        if SEARCH_TAG not in new and "</body>" in new:
            new = new.replace("</body>", SEARCH_TAG + "\n</body>", 1)
        new = produkty.inject_data_patch(new)
        if new != html:
            f.write_text(new, encoding="utf-8")
    n_cards = build_search_page(public)
    n_idx = build_search(public)
    print(f"vyhľadávanie: {n_idx} produktov v indexe, {n_cards} kariet na /vyhladavanie/")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(Path(__file__).resolve().parent.parent / "public"))
    ap.add_argument("--limit", type=int, default=0, help="max. počet stránok (test)")
    ap.add_argument("--max-pages", type=int, default=800)
    ap.add_argument("--delay", type=float, default=0.5)
    ap.add_argument("--postprocess", action="store_true",
                    help="nesťahovať, iba pregenerovať vyhľadávanie a skripty klonu v public/")
    args = ap.parse_args()

    public = Path(args.out)
    public.mkdir(parents=True, exist_ok=True)
    if args.postprocess:
        postprocess(public)
        return
    s = session()
    import produkty
    produkty.reset(public)   # nový snapshot: náhľady nových produktov sa poskladajú nanovo

    queue = []
    for u in sitemap_urls(s):
        p = norm_path(u)
        if p and p not in queue:
            queue.append(p)
    print(f"sitemap: {len(queue)} stránok")

    seen, pages, own_docs, failed = set(queue), [], set(), []
    limit = args.limit or args.max_pages
    while queue and len(pages) < limit:
        path = queue.pop(0)
        url = ORIGIN + path
        r = get(s, url)
        ctype = r.headers.get("content-type", "")
        if r.status_code != 200 or "html" not in ctype:
            print(f"  ! {r.status_code} {path}")
            failed.append({"path": path, "status": r.status_code})
            continue
        html = r.content.decode("utf-8", "replace")
        for link in find_links(html, r.url):
            p = norm_path(link)
            if p and p not in seen:
                seen.add(p)
                queue.append(p)
        f = out_file(public, path)
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(transform(html, own_docs), encoding="utf-8")
        pages.append(path)
        print(f"  [{len(pages):3d}] {path}")
        time.sleep(args.delay)

    # 404 stránka
    r = get(s, ORIGIN + "/tato-stranka-neexistuje-klon-404/")
    if "html" in r.headers.get("content-type", ""):
        (public / "404.html").write_text(transform(r.content.decode("utf-8", "replace"), own_docs),
                                         encoding="utf-8")

    # Blok "Hodnotenie obchodu" sa dočítava AJAXom z /cache/hodnotenie-obchodu/?ratingDetails
    r = get(s, ORIGIN + "/cache/hodnotenie-obchodu/?ratingDetails")
    if r.status_code == 200:
        dest = public / "cache" / "hodnotenie-obchodu" / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(make_links_relative(r.content.decode("utf-8", "replace")), encoding="utf-8")

    fav = get(s, ORIGIN + "/favicon.ico")
    if fav.status_code == 200:
        (public / "favicon.ico").write_bytes(fav.content)

    docs = download_own_docs(s, public, own_docs)
    print(f"vlastné súbory /user/documents/: {len(docs)}")

    (public / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")
    manifest = {
        "source": ORIGIN,
        "mirrored_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "pages": pages,
        "failed": failed,
        "user_documents": sorted(docs),
    }
    (public.parent / "pages.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1),
                                              encoding="utf-8")
    postprocess(public)
    print(f"hotovo: {len(pages)} stránok, {len(failed)} chýb")


if __name__ == "__main__":
    main()
