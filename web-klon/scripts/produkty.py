#!/usr/bin/env python3
"""
Nové produkty na klone – náhľad produktovej stránky skôr, než sa produkt založí v Shoptete.

Každý produkt je priečinok web-klon/produkty/<slug>/ s produkt.json (vzor: produkty/_vzor/).
Stránka sa poskladá z existujúcej produktovej stránky klonu (šablóna, predvolene
rybi-kolagen – nový produkt bez hodnotení) výmenou názvu, ceny, fotiek, krátkeho a dlhého
popisu, parametrov a kategórie. Produkt sa pridá aj na začiatok výpisu zvolených
kategórií, do Všetkých produktov, do vyhľadávania a do dát, z ktorých silwer-redesign.js
skladá balenie, množstevné zľavy a štítky oblastí.

Spúšťa sa cez:  python3 web-klon/scripts/mirror.py --postprocess
(priečinky začínajúce „_“ alebo „.“ sa preskakujú – napr. _vzor)
"""
import html as H
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent           # web-klon/
PRODUKTY = ROOT / "produkty"
KATEGORIE = ROOT / "kategorie"
DEFAULT_CAT_TEMPLATE = "gold"
DLHY_POPIS = ROOT.parent / "skills" / "silwer-dlhy-popis" / "scripts"
DEFAULT_TEMPLATE = "rybi-kolagen"
DEFAULT_TIERS = [[3, 0.8], [6, 0.7]]
DATA_PATCH_TAG = '<script src="/klon/data-patch.js"></script>'
REDESIGN_JS = "user/documents/upload/KODY/silwer-redesign.js"
MARK_RE = re.compile(r"<!--klon-novy:[^>]*-->.*?<!--/klon-novy-->\s*", re.S)


# ---------------------------------------------------------------- pomocné
def block_end(html, start, tag="div"):
    """Index za uzatváracím tagom elementu, ktorý začína na pozícii start."""
    depth = 0
    for m in re.finditer(r"<(/?)%s\b[^>]*>" % tag, html[start:], re.I):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return start + m.end()
    raise ValueError(f"neuzavretý <{tag}> na pozícii {start}")


def replace_block(html, marker, new_inner, keep_open=True):
    """Nahradí obsah prvého <div …marker…> (marker = časť otváracieho tagu)."""
    i = html.find(marker)
    if i < 0:
        return html, False
    start = html.rfind("<div", 0, i + 1) if not html.startswith("<div", i) else i
    end = block_end(html, start)
    open_tag = html[start:html.find(">", start) + 1]
    new = (open_tag + new_inner + "</div>") if keep_open else new_inner
    return html[:start] + new + html[end:], True


def price(x, always_decimals=True):
    s = f"{x:.2f}".replace(".", ",")
    if not always_decimals and s.endswith(",00"):
        s = s[:-3]
    return s + " €"


def esc(s):
    return H.escape(str(s), quote=True)


def jstr(s):
    """Reťazec tak, ako ho Shoptet píše do dataLayer (JSON s \\u escapmi)."""
    return json.dumps(s)[1:-1]


def page_file(public, slug):
    return public / slug / "index.html"


def original_file(public, slug):
    """Pôvodná (stiahnutá) verzia stránky – ak ju náhľad prepísal, je odložená v klon/originaly."""
    saved = public / "klon" / "originaly" / slug / "index.html"
    return saved if saved.exists() else page_file(public, slug)


def category_name(public, path):
    f = original_file(public, path.strip("/"))
    if f.exists():
        m = re.search(r'<h1[^>]*class="category-title"[^>]*>\s*([^<]+)', f.read_text(encoding="utf-8"))
        if m:
            return H.unescape(m.group(1)).strip()
    return path.strip("/")


# ---------------------------------------------------------------- načítanie
def load_products():
    out = []
    if not PRODUKTY.exists():
        return out
    for d in sorted(PRODUKTY.iterdir()):
        if not d.is_dir() or d.name.startswith(("_", ".")) or not (d / "produkt.json").exists():
            continue
        p = json.loads((d / "produkt.json").read_text(encoding="utf-8"))
        p["_dir"] = d
        p["slug"] = (p.get("slug") or p.get("url_slug") or d.name).strip("/")
        for key in ("nazov", "cena"):
            if key not in p:
                raise SystemExit(f"{d}/produkt.json: chýba „{key}“")
        p["path"] = f"/{p['slug']}/"
        p.setdefault("kategorie", [])
        p["kategorie"] = ["/" + c.strip("/") + "/" for c in p["kategorie"]]
        p.setdefault("kategoria", p["kategorie"][0] if p["kategorie"] else None)
        p.setdefault("stitky", ["Novinka"])
        p.setdefault("mnozstevne_zlavy", DEFAULT_TIERS)
        p.setdefault("kod", "NOVÝ")
        out.append(p)
    return out


def asset(public, p, ref, sub=""):
    """Fotka z priečinka produktu -> /klon/produkty/<slug>/…; URL ostáva URL."""
    if re.match(r"^(https?:)?/", ref):
        return ref
    d = p["_dir"]
    for cand in (d / sub / ref, d / "fotky" / ref, d / ref):
        if cand.exists():
            dest = public / "klon" / "produkty" / p["slug"] / sub / cand.name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(cand, dest)
            return f"/klon/produkty/{p['slug']}/" + (f"{sub}/" if sub else "") + cand.name
    raise SystemExit(f"{d}: fotka „{ref}“ neexistuje (hľadané v priečinku produktu aj vo fotky/)")


def html_field(p, key, default_file):
    v = p.get(key)
    d = p["_dir"]
    if isinstance(v, str) and v.endswith(".html") and (d / v).exists():
        return (d / v).read_text(encoding="utf-8")
    if isinstance(v, str):
        return v
    if (d / default_file).exists():
        return (d / default_file).read_text(encoding="utf-8")
    return ""


def long_description(public, p):
    """Dlhý popis: hotový blok.html, alebo „blok“ z produkt.json cez render_pp.py (silwer-dlhy-popis)."""
    d = p["_dir"]
    local_imgs = d / "obrazky"
    base_local = None
    if local_imgs.is_dir():
        for f in local_imgs.iterdir():
            if f.is_file():
                asset(public, p, f.name, "obrazky")
        base_local = f"/klon/produkty/{p['slug']}/obrazky/"
    v = p.get("dlhy_popis")
    if isinstance(v, str) and (d / v).exists():
        out = (d / v).read_text(encoding="utf-8")
    elif p.get("blok"):
        sys.path.insert(0, str(DLHY_POPIS))
        import render_pp  # noqa: E402  (renderer zo skillu silwer-dlhy-popis)
        base = p.get("obrazky_base") or base_local or ""
        out = '<div class="pp">' + "".join(render_pp.KOMP[b["typ"]](b, base) for b in p["blok"]) + "</div>"
    elif (d / "blok.html").exists():
        out = (d / "blok.html").read_text(encoding="utf-8")
    else:
        out = ""
    # fotky, ktoré ešte nie sú nahraté v Shoptete, ukáže náhľad z priečinka obrazky/
    names = {f.name for f in local_imgs.iterdir()} if base_local else set()
    remote = []

    def img(m):
        name = m.group(2).rsplit("/", 1)[-1]
        if name in names:
            return m.group(1) + base_local + name
        remote.append(m.group(2))
        return m.group(0)
    out = re.sub(r'(<img[^>]*?src=["\'])([^"\']+)', img, out)
    for u in remote:
        print(f"    fotka z webu (nie je v obrazky/): {u}")
    return out


def flags_html(stitky):
    spans = []
    for t in stitky:
        if t.lower() == "novinka":
            spans.append('<span class="flag flag-new" style="background-color:#00fa1d;">Novinka</span>')
        else:
            spans.append(f'<span class="flag flag-custom" style="background-color:#1a1a1c;">{esc(t)}</span>')
    return '<div class="flags flags-default">' + "".join(spans) + "</div>"


def standard_price(html, p, card=False):
    """Prečiarknutá pôvodná cena (pole cena_povodna) – doplní, prepíše alebo odstráni."""
    c, orig = float(p["cena"]), p.get("cena_povodna")
    has = 'class="price-standard"' in html
    if orig:
        pct = round((1 - c / float(orig)) * 100)
        save = f"(&ndash;{pct} %)" if card else f"&ndash;{pct} %"
        if has:
            # všetky výskyty – aj štítok so zľavou na fotke (flags-extra)
            html = re.sub(r'(<span class="price-standard">\s*<span>\s*(?:<strong>)?)[^<]*',
                          lambda x: x.group(1) + price(float(orig)), html)
            html = re.sub(r'(<span class="price-save">)\s*(\(?)[^<)]*\)?',
                          lambda x: x.group(1) + (f"(&ndash;{pct} %)" if x.group(2) else f"&ndash;{pct} %"), html)
        elif card:
            html = re.sub(r'(<div class="price price-final" data-testid="productCardPrice">.*?</div>)',
                          lambda x: x.group(1) + f'<span class="price-standard"><span><strong>{price(float(orig))}</strong></span></span>'
                          f'<span class="price-save">{save}</span>', html, count=1, flags=re.S)
        else:
            html = html.replace('<strong class="price-final"',
                                '<span class="standard-price-label">štandardná cena:</span>'
                                f'<span class="price-standard"><span>{price(float(orig))}</span></span>'
                                f'<span class="price-save">{save}</span><strong class="price-final price-action"', 1)
    elif has:
        html = re.sub(r'<div class="flags flags-extra">\s*<span class="flag flag-discount">.*?</span>\s*</span>\s*</div>',
                      "", html, flags=re.S)
        html = re.sub(r'<span class="standard-price-label">[^<]*</span>\s*', "", html, count=1)
        html = re.sub(r'<span class="price-standard">.*?</span>\s*</span>\s*', "", html, count=1, flags=re.S)
        html = re.sub(r'<span class="price-save">[^<]*</span>\s*', "", html, count=1)
        html = html.replace("price-final price-action", "price-final", 1)
    return html


def unit_price(p):
    if p.get("jednotkova_cena"):
        return p["jednotkova_cena"]
    if p.get("pocet") and p.get("forma"):
        unit = {"kap.": "kap.", "tab.": "tab.", "g": "g", "ml": "ml"}.get(p["forma"], p["forma"])
        return f"{price(p['cena'] / p['pocet'])}&nbsp;/&nbsp;1&nbsp;{unit}"
    return ""


# ---------------------------------------------------------------- produktová stránka
def build_page(public, p, images):
    tpl = p.get("sablona", DEFAULT_TEMPLATE).strip("/")
    src = original_file(public, tpl)
    if not src.exists():
        raise SystemExit(f"šablóna /{tpl}/ na klone neexistuje")
    html = src.read_text(encoding="utf-8")
    m = re.search(r'"product":\s*\{.*?"name":\s*("(?:[^"\\]|\\.)*")', html, re.S)
    tpl_name = json.loads(m.group(1))
    name, slug = p["nazov"], p["slug"]

    # 1) adresa a názov šablóny všade (canonical, breadcrumb, dataLayer, alt texty…)
    html = html.replace(f"https://www.silwer.sk/{tpl}/", f"https://www.silwer.sk/{slug}/")
    html = html.replace(f'"/{tpl}/"', f'"/{slug}/"').replace(f"%2F{tpl}%2F", f"%2F{slug}%2F")
    # názov len v <head> (title, meta, dataLayer) a od drobčekov po koniec <main> – nie v menu a pätičke
    body = html.find("<body")
    bread = html.find('class="breadcrumbs')
    main_end = html.find("</main>")
    if body < 0 or bread < 0 or main_end < 0:
        raise SystemExit(f"šablóna /{tpl}/ nemá očakávanú štruktúru produktovej stránky")
    tid = re.search(r'"product":\s*\{\s*"id":\s*(\d+)', html).group(1)

    def swap(s):
        s = s.replace(tpl_name, name).replace(jstr(tpl_name), jstr(name))
        s = re.sub(r'("product":\s*\{\s*"id":\s*)%s\b' % tid, lambda x: x.group(1) + str(p["_id"]), s)
        return re.sub(r'((?:name="(?:productId|priceId)" value|data-micro-product-id)=")%s(")' % tid,
                      lambda x: x.group(1) + str(p["_id"]) + x.group(2), s)
    html = swap(html[:body]) + html[body:bread] + swap(html[bread:main_end]) + html[main_end:]

    # 2) SEO hlavička
    seo = p.get("seo", {})
    title = seo.get("title") or f"{name} | Silwer"
    desc = seo.get("meta_description", "")
    html = re.sub(r"<title>[^<]*</title>", f"<title>{esc(title)}</title>", html, count=1)
    html = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda x: x.group(1) + esc(title), html)
    if desc:
        for pat in (r'(<meta name="description" content=")[^"]*', r'(<meta property="og:description" content=")[^"]*',
                    r'(<meta itemprop="text" content=")[^"]*'):
            html = re.sub(pat, lambda x: x.group(1) + esc(desc), html)
    if images:
        html = re.sub(r'(<meta property="og:image" content=")[^"]*', lambda x: x.group(1) + esc(images[0]), html, count=1)

    # 3) kategória (breadcrumb, schema, dataLayer)
    if p.get("kategoria"):
        cpath, cname = p["kategoria"], category_name(public, p["kategoria"])
        html = re.sub(r'<a href="[^"]*" itemprop="item" data-testid="breadcrumbsSecondLevel"><span itemprop="name">[^<]*</span>',
                      f'<a href="{cpath}" itemprop="item" data-testid="breadcrumbsSecondLevel"><span itemprop="name">{esc(cname)}</span>',
                      html, count=1)
        html = re.sub(r'(<meta itemprop="category" content=")[^"]*',
                      lambda x: x.group(1) + esc(f"Úvodná stránka > {cname} > {name}"), html, count=1)
        html = re.sub(r'("(?:current|default)Category":\s*)"(?:[^"\\]|\\.)*"',
                      lambda x: x.group(1) + json.dumps(cname), html)

    # 4) krátky popis
    html, _ = replace_block(html, 'class="p-short-description"', "\n" + html_field(p, "kratky_popis", "kratky-popis.html") + "\n")

    # 5) cena, množstevné zľavy, kód
    c = float(p["cena"])
    html = re.sub(r'(<span class="price-final-holder">)\s*[^<]*', lambda x: x.group(1) + "\n" + price(c) + "\n", html)
    html = re.sub(r'data-orig-price=[0-9.]+', f"data-orig-price={c:g}", html)
    html = re.sub(r'(<meta itemprop="price" content=")[0-9.]+', lambda x: x.group(1) + f"{c:.2f}", html)
    html = re.sub(r'("priceWithVat":\s*)[0-9.]+', lambda x: x.group(1) + f"{c:g}", html)
    html = re.sub(r'(data-price-ratio="([0-9.]+)".*?quantity-discounts__price"[^>]*>)[^<]*',
                  lambda x: x.group(1) + price(c * float(x.group(2)), always_decimals=False), html, flags=re.S)
    html = standard_price(html, p)
    up = unit_price(p)
    html = re.sub(r'(<span class="price-measure">\s*<span class="sr-only">[^<]*</span>\s*<span>)[^<]*',
                  lambda x: x.group(1) + up, html, count=1)
    html = re.sub(r'(<span class="p-code-label row-header-label">Kód:</span>\s*<span>)[^<]*',
                  lambda x: x.group(1) + esc(p["kod"]), html, count=1)

    # 6) fotky a štítky
    if images:
        alt = esc(f"{name} – balenie produktu")
        main = (f'<a href="{images[0]}" class="p-main-image cloud-zoom" data-href="{images[0]}" data-alt="{alt}">'
                f'<img src="{images[0]}" alt="{alt}" width="1024" height="1024" fetchpriority="high" /></a>')
        html = re.sub(r'<a href="[^"]*" class="p-main-image cloud-zoom[^"]*".*?</a>', lambda _: main, html, count=1, flags=re.S)
        thumbs = "".join(
            f'<a href="{u}" class="p-thumbnail{" highlighted" if i == 0 else ""}">'
            f'<img src="{u}" alt="{esc(name)}" width="100" height="100" /></a>'
            f'<a href="{u}" class="cbox-gal" data-gallery="lightbox[gallery]" data-alt="{esc(name)}" aria-hidden="true" tabindex="-1"></a>'
            for i, u in enumerate(images))
        i = html.find('class="p-thumbnails-inner"')
        if i >= 0:
            inner = html.find("<div", i + 10)
            html = html[:inner] + "<div>" + thumbs + "</div>" + html[block_end(html, inner):]
    i = html.find('class="p-image"')
    if i >= 0:
        f = html.find('<div class="flags flags-default">', i)
        if f >= 0:
            html = html[:f] + flags_html(p["stitky"]) + html[block_end(html, f):]

    # 7) dlhý popis (Detailný popis v Shoptete)
    html, _ = replace_block(html, 'class="basic-description"', "\n<h4>Podrobný popis</h4>\n" + long_description(public, p) + "\n")

    # 8) záložka Parametre
    rows = []
    if p.get("kategoria"):
        rows.append(("Kategória", f'<a href="{p["kategoria"]}">{esc(category_name(public, p["kategoria"]))}</a>'))
    rows += [(k, esc(v)) for k, v in p.get("parametre", {}).items()]
    table = ('<table class="detail-parameters"><tbody>' + "".join(
        f'<tr><th><span class="row-header-label">{esc(k)}<span class="row-header-label-colon">:</span></span></th>'
        f'<td>{v}</td></tr>' for k, v in rows) + "</tbody></table>")
    html, _ = replace_block(html, 'class="extended-description"', table)

    marker = '<meta name="klon-novy" content="%s">' % ("skryty" if p.get("skryty") else "1")
    html = html.replace("</head>", marker + "\n</head>", 1)
    return html


# ---------------------------------------------------------------- karta vo výpise
def find_card(public, tpl_slug):
    for f in [public / "vsetky" / "index.html"] + sorted((public / "vsetky").glob("strana-*/index.html")):
        if not f.exists():
            continue
        h = f.read_text(encoding="utf-8")
        i = h.find(f'<a href="/{tpl_slug}/" class="image"')
        if i >= 0:
            start = h.rfind('<div class="product">', 0, i)
            return h[start:block_end(h, start)]
    return None


def build_card(public, p, images):
    tpl = p.get("sablona", DEFAULT_TEMPLATE).strip("/")
    card = find_card(public, tpl) or find_card(public, DEFAULT_TEMPLATE)
    if not card:
        return ""
    tpl_name = re.search(r'data-testid="productCardName">\s*([^<]+?)\s*</span>', card).group(1)
    card = card.replace(f'"/{tpl}/"', f'"{p["path"]}"').replace(tpl_name, p["nazov"])
    if images:
        card = re.sub(r'(<a href="[^"]*" class="image">\s*<img src=")[^"]*', lambda x: x.group(1) + images[0], card, count=1)
        card = re.sub(r'(<img[^>]*?\sdata-src=")[^"]*', lambda x: x.group(1) + images[0], card, count=1)  # lazy-load
        card = re.sub(r'(data-micro-image=")[^"]*', lambda x: x.group(1) + images[0], card)
        card = re.sub(r'(<meta id="ogImage" property="og:image" content=")[^"]*', lambda x: x.group(1) + images[0], card)
    i = card.find('<div class="flags flags-default">')
    if i >= 0:
        card = card[:i] + flags_html(p["stitky"]) + card[block_end(card, i):]
    tpl_id = re.search(r'data-micro-product-id="(\d+)"', card)
    if tpl_id:  # vlastné ID, aby sa karta nebila s kartou šablóny
        card = re.sub(r'(=")%s(")' % tpl_id.group(1), lambda x: x.group(1) + str(p["_id"]) + x.group(2), card)
    c = float(p["cena"])
    card = re.sub(r'(data-testid="productCardPrice">\s*<strong>)[^<]*', lambda x: x.group(1) + price(c), card)
    card = re.sub(r'data-micro-price="[0-9.]+"', f'data-micro-price="{c:.2f}"', card)
    card = standard_price(card, p, card=True)
    card = re.sub(r'(<div class="price-measure">\s*<span class="sr-only">[^<]*</span>)[^<]*',
                  lambda x: x.group(1) + unit_price(p), card)
    card = re.sub(r'(data-micro="sku">)[^<]*', lambda x: x.group(1) + esc(p["kod"]), card)
    return f"<!--klon-novy:{p['slug']}-->{card}<!--/klon-novy-->\n"


def update_listings(public, products):
    """Vyčistí staré vložené karty a vloží aktuálne na začiatok výpisu kategórií."""
    want = {}
    for p in products:
        if p.get("skryty") or p.get("_existujuci"):
            continue
        for cat in dict.fromkeys(p["kategorie"] + ["/vsetky/"]):
            want.setdefault(cat, []).append(p)
    for f in public.rglob("index.html"):
        if "klon" in f.parts[len(public.parts):len(public.parts) + 1]:
            continue
        h = f.read_text(encoding="utf-8")
        if 'id="products"' not in h:
            continue
        rel = "/" + "/".join(f.parent.relative_to(public).parts) + "/"
        new = MARK_RE.sub("", h)
        cards = [p["_card"] for p in want.get(rel, []) if p.get("_card")]
        if cards:
            i = new.find('id="products"')
            open_end = new.find(">", i) + 1
            new = new[:open_end] + "".join(cards) + new[open_end:]
        # počet položiek vo výpise
        def fix_total(m):
            base = int(m.group(2) or m.group(3))
            return f'<strong data-klon-base="{base}">{base + len(cards)}</strong>' if cards else f"<strong>{base}</strong>"
        new = re.sub(r'(<div class="itemsTotal">\s*)?<strong(?: data-klon-base="(\d+)">\d+|>(\d+))</strong>(?=\s*položiek)',
                     lambda m: (m.group(1) or "") + fix_total(m), new, count=1)
        if new != h:
            f.write_text(new, encoding="utf-8")


# ---------------------------------------------------------------- nové kategórie
def load_categories():
    out = []
    if not KATEGORIE.exists():
        return out
    for d in sorted(KATEGORIE.iterdir()):
        if not d.is_dir() or d.name.startswith(("_", ".")) or not (d / "kategoria.json").exists():
            continue
        k = json.loads((d / "kategoria.json").read_text(encoding="utf-8"))
        if "nazov" not in k:
            raise SystemExit(f"{d}/kategoria.json: chýba „nazov“")
        k["_dir"] = d
        k["slug"] = (k.get("slug") or d.name).strip("/")
        k["path"] = f"/{k['slug']}/"
        out.append(k)
    return out


def build_category(public, k):
    """Prázdna stránka kategórie zo šablóny (predvolene /gold/); karty doplní update_listings."""
    tpl = k.get("sablona", DEFAULT_CAT_TEMPLATE).strip("/")
    src = original_file(public, tpl)
    if not src.exists():
        raise SystemExit(f"šablóna kategórie /{tpl}/ na klone neexistuje")
    html = src.read_text(encoding="utf-8")
    m = re.search(r'<h1 class="category-title"[^>]*>\s*([^<]+?)\s*</h1>', html)
    tpl_name = H.unescape(m.group(1))
    name, slug = k["nazov"], k["slug"]
    html = html.replace(f"https://www.silwer.sk/{tpl}/", f"https://www.silwer.sk/{slug}/")
    html = re.sub(r'(<h1 class="category-title"[^>]*>)[^<]*', lambda x: x.group(1) + esc(name), html, count=1)
    html = re.sub(r'(<span itemprop="name" data-title=")[^"]*(">)[^<]*',
                  lambda x: x.group(1) + esc(name) + x.group(2) + esc(name), html, count=1)
    title = k.get("seo", {}).get("title") or f"{name} | Silwer"
    desc = k.get("seo", {}).get("meta_description", "")
    html = re.sub(r"<title>[^<]*</title>", f"<title>{esc(title)}</title>", html, count=1)
    html = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda x: x.group(1) + esc(title), html)
    for pat in (r'(<meta name="description" content=")[^"]*', r'(<meta property="og:description" content=")[^"]*'):
        html = re.sub(pat, lambda x: x.group(1) + esc(desc), html)
    html = html.replace(jstr(tpl_name), jstr(name)) if len(tpl_name) > 3 else html
    popis = html_field(k, "popis", "popis.html")
    html, _ = replace_block(html, 'class="category-perex"', "\n" + popis + "\n")
    i = html.find('id="products"')
    start = html.rfind("<div", 0, i)
    open_tag = html[start:html.find(">", start) + 1]
    html = html[:start] + open_tag + "</div>" + html[block_end(html, start):]
    html = re.sub(r'(<div class="itemsTotal">\s*)<strong[^>]*>\d+</strong>', lambda x: x.group(1) + "<strong>0</strong>", html, count=1)
    m = re.search(r'<div[^>]*class="[^"]*\bpagination(?:-wrapper)?\b[^"]*"', html)
    if m:
        html = html[:m.start()] + html[block_end(html, m.start()):]
    return html.replace("</head>", '<meta name="klon-kategoria" content="1">\n</head>', 1)


def menu_items(categories):
    """Položky menu pre nové kategórie – vloží ich data-patch.js po vykreslení redizajnu."""
    items = []
    for k in categories:
        m = k.get("menu", {})
        if m.get("za") or m.get("pred"):
            items.append({"n": m.get("text", k["nazov"]), "u": k["path"],
                          "za": m.get("za"), "pred": m.get("pred")})
    return items


MENU_JS = r"""
  /* nové kategórie v menu: redizajn kreslí menu sám, preto ich klonujeme z existujúcej položky */
  var M = __MENU__;
  function addMenu() {
    M.forEach(function (it) {
      [['za', 'afterend'], ['pred', 'beforebegin']].forEach(function (pos) {
        if (!it[pos[0]]) return;
        document.querySelectorAll('header a[href="' + it[pos[0]] + '"], nav a[href="' + it[pos[0]] + '"], [class*="sw-"] a[href="' + it[pos[0]] + '"]').forEach(function (a) {
          if (a.closest('.p-detail, .products, .breadcrumbs, footer, #footer, .sw-tags')) return;
          /* kópiu robíme z celej položky menu (li, div.sw-nav__item…), nie len z odkazu */
          var host = a;
          while (host.parentElement && host.parentElement.children.length === 1 &&
                 !/^(NAV|HEADER|UL|BODY)$/.test(host.parentElement.tagName)) host = host.parentElement;
          var next = pos[1] === 'afterend' ? host.nextElementSibling : host.previousElementSibling;
          if (next && next.getAttribute('data-klon-menu') === it.u) return;
          var copy = host.cloneNode(true);
          copy.setAttribute('data-klon-menu', it.u);
          var link = copy.tagName === 'A' ? copy : copy.querySelector('a');
          link.setAttribute('href', it.u);
          var label = [].slice.call(link.querySelectorAll('*')).filter(function (e) { return !e.children.length && e.textContent.trim(); })[0] || link;
          label.textContent = it.n;
          [].slice.call(copy.querySelectorAll('ul, [class*="sub"], [class*="drop"]')).forEach(function (e) { if (e !== link) e.remove(); });
          copy.classList.remove('active', 'is-active', 'is-open');
          host.insertAdjacentElement(pos[1], copy);
        });
      });
    });
  }
  if (M.length) {
    var mo = new MutationObserver(function () { addMenu(); });
    document.addEventListener('DOMContentLoaded', function () {
      addMenu();
      mo.observe(document.body, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 8000);
    });
  }
"""


# ---------------------------------------------------------------- dáta pre silwer-redesign.js
def write_data_patch(public, products, categories=()):
    """Dáta, z ktorých redizajn skladá balenie, zľavy a štítky oblastí.

    Redizajn ich berie z https://silwer-data.vercel.app/api/data (ostrý web), so zálohou
    priamo v JS. Na klone podstrčíme snapshot z JS doplnený o nové produkty – bez úpravy
    silwer-redesign.js, aby sa omylom nedostal na ostrý web."""
    js = public / REDESIGN_JS
    if not js.exists():
        return
    s = js.read_text(encoding="utf-8")
    i = s.find("var DATA = ")
    if i < 0:
        return
    data = json.loads(s[i + len("var DATA = "):s.find("\n", i)].rstrip().rstrip(";"))
    for p in products:
        cats = [] if p.get("skryty") else list(dict.fromkeys(p["kategorie"] + ["/vsetky/"]))
        # balíčky a pod. nemajú formu, počet ani množstevné zľavy – kľúče vtedy vynecháme
        entry = {"n": p["nazov"], "i": p["_images"][0] if p["_images"] else "", "c": cats}
        if p.get("forma") and p.get("pocet"):
            entry.update(f=p["forma"], q=p["pocet"])
        elif p["mnozstevne_zlavy"]:
            print(f"  ! {p['path']}: chýba „forma“ alebo „pocet“ – dlaždice balení nebudú úplné")
        if p["mnozstevne_zlavy"]:
            entry["t"] = p["mnozstevne_zlavy"]
        data["products"][p["path"]] = entry
        for c in cats:
            lst = [u for u in data["cats"].get(c, []) if u != p["path"]]
            data["cats"][c] = [p["path"]] + lst
    for k in categories:
        data["cats"].setdefault(k["path"], [])
    data["at"] = max(data.get("at", ""), date.today().isoformat())
    out = public / "klon" / "data-patch.js"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(
        "/* Generuje scripts/produkty.py – NEUPRAVOVAŤ. Iba pre klon: dáta redizajnu zo snapshotu\n"
        "   + nové produkty z web-klon/produkty/. Ostrý web tento súbor nemá. */\n"
        "(function () {\n"
        "  var D = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
        "  try { D.ts = Date.now(); localStorage.setItem('swData', JSON.stringify(D)); } catch (e) {}\n"
        + MENU_JS.replace("__MENU__", json.dumps(menu_items(categories), ensure_ascii=False)) +
        "  var f = window.fetch;\n"
        "  if (!f) return;\n"
        "  window.fetch = function (u) {\n"
        "    var url = typeof u === 'string' ? u : (u && u.url) || '';\n"
        "    if (url.indexOf('silwer-data.vercel.app/api/data') >= 0) {\n"
        "      return Promise.resolve(new Response(JSON.stringify(D), { status: 200, headers: { 'Content-Type': 'application/json' } }));\n"
        "    }\n"
        "    return f.apply(this, arguments);\n"
        "  };\n"
        "})();\n", encoding="utf-8")


def inject_data_patch(html):
    if DATA_PATCH_TAG in html:
        return html
    return re.sub(r"(<head\b[^>]*>)", lambda m: m.group(1) + DATA_PATCH_TAG, html, count=1)


# ---------------------------------------------------------------- hlavný krok
def build_categories(public):
    categories = load_categories()
    mf = public / "klon" / "kategorie.json"
    previous = json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else []
    for slug in previous:
        if slug not in [k["slug"] for k in categories]:
            shutil.rmtree(public / slug, ignore_errors=True)
    for k in categories:
        target = page_file(public, k["slug"])
        if target.exists() and k["slug"] not in previous:
            raise SystemExit(f"kategória /{k['slug']}/ už na webe existuje – zvoľte iný slug")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(build_category(public, k), encoding="utf-8")
        print(f"  nová kategória: {k['path']}")
    mf.parent.mkdir(parents=True, exist_ok=True)
    mf.write_text(json.dumps([k["slug"] for k in categories]), encoding="utf-8")
    return categories


def build(public):
    categories = build_categories(public)
    products = load_products()
    manifest_f = public / "klon" / "produkty.json"
    previous = json.loads(manifest_f.read_text(encoding="utf-8")) if manifest_f.exists() else []
    current = [p["slug"] for p in products]

    # produkty odobraté z priečinka: zmazať ich stránku, resp. vrátiť pôvodnú
    for slug in previous:
        if slug in current:
            continue
        saved = public / "klon" / "originaly" / slug
        if saved.exists():
            shutil.copytree(saved, public / slug, dirs_exist_ok=True)
            shutil.rmtree(saved)
        else:
            shutil.rmtree(public / slug, ignore_errors=True)
        shutil.rmtree(public / "klon" / "produkty" / slug, ignore_errors=True)

    for n, p in enumerate(products):
        p["_id"] = 900001 + n          # ID, ktoré v Shoptete nie je
        target = page_file(public, p["slug"])
        saved = public / "klon" / "originaly" / p["slug"] / "index.html"
        # existujúci produkt (nová verzia stránky): pôvodnú si odložíme a karty vo výpisoch necháme
        if target.exists() and p["slug"] not in previous and not saved.exists():
            saved.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(target, saved)
        p["_existujuci"] = saved.exists()
        if p["_existujuci"]:
            p.setdefault("sablona", p["slug"])
        p["_images"] = [asset(public, p, ref) for ref in p.get("obrazky", [])]
        html = build_page(public, p, p["_images"])
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        p["_card"] = build_card(public, p, p["_images"])
        print(f"  nový produkt: {p['path']}" + (" (skrytý)" if p.get("skryty") else "")
              + (" – nová verzia existujúcej stránky" if p["_existujuci"] else ""))

    update_listings(public, products)
    write_data_patch(public, products, categories)
    manifest_f.parent.mkdir(parents=True, exist_ok=True)
    manifest_f.write_text(json.dumps(current, ensure_ascii=False), encoding="utf-8")
    return products


def reset(public):
    """Pred novým stiahnutím: vráti prepísané pôvodné stránky a zmaže vygenerované."""
    manifest_f = public / "klon" / "produkty.json"
    previous = json.loads(manifest_f.read_text(encoding="utf-8")) if manifest_f.exists() else []
    for slug in previous:
        saved = public / "klon" / "originaly" / slug
        if saved.exists():
            shutil.copytree(saved, public / slug, dirs_exist_ok=True)
        else:
            shutil.rmtree(public / slug, ignore_errors=True)
    mf = public / "klon" / "kategorie.json"
    for slug in (json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else []):
        shutil.rmtree(public / slug, ignore_errors=True)
    shutil.rmtree(public / "klon", ignore_errors=True)
