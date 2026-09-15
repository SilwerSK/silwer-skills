#!/usr/bin/env python3
"""Prepis Pobo Page Builder → čisté HTML.

Vezme živú stránku so značkami <!-- Pobo Page Builder - content START/END -->,
rozloží ju na widgety a vyrenderuje ich vlastným HTML, ktoré vyzerá rovnako,
ale nezávisí na Pobo doplnku ani na jeho 813 kB generic.css.

Hodnoty štýlov NIE SÚ odhad — sú odmerané cez getComputedStyle priamo na
www.silwer.sk/glp-1/ pri šírke obsahu 1200 px (4.9.2026).

Dva režimy:
  inline  — štýly v HTML, nič sa nenasadzuje, ale pri bohatej stránke ako GLP-1
            výstup presiahne limit poľa DESCRIPTION (32 767 znakov)
  triedy  — HTML s triedami + samostatný pobo-prepis.css; ~polovičná veľkosť

Použitie:
    python3 pobo_prepis.py <url-alebo-html-subor> <vystup.html> [--triedy]
"""
import re, sys, html as H
from pathlib import Path
from urllib.request import urlopen, Request

# ---- odmerané hodnoty ----------------------------------------------------
INK   = "rgb(12,12,12)"        # hlavný text
GREY1 = "rgb(56,56,56)"        # nadpis v advantages
GREY2 = "rgb(87,87,87)"        # popisok v advantages
SEK   = "padding:30px 0"       # .widget-container → 60px rytmus
H2    = f"font-size:25px;font-weight:600;line-height:31.25px;letter-spacing:1.6px;color:{INK};margin:0 0 20px"
P     = f"font-size:18px;font-weight:400;line-height:25px;letter-spacing:.4px;color:{INK};margin:0 0 20px"
FLEX  = "display:flex;flex-wrap:wrap"
COL   = "flex:1 1 340px;min-width:0"
IMG   = "width:100%;height:auto;display:block"


def cistiHtml(s):
    """Zachová <p>, <strong>, <a>, <br>, <table>… zahodí Pobo atribúty."""
    if not s:
        return ""
    s = re.sub(r'\sdata-[a-z-]+="[^"]*"', "", s)
    s = re.sub(r"""\\sclass=['"][^'"]*['"]""", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def vnutro(w, klas):
    """Vráti vnútro elementu s danou triedou — správne aj pre h2/h3/span, nielen div.

    Pôvodná verzia počítala len <div>, takže pri <h2 class="…"> nikdy nenašla
    uzatvárací tag a vrátila zvyšok dokumentu. Prejavilo sa to duplicitným textom
    (nadpis + podnadpis v jednom, disclaimer dvakrát). Preto sa tag zisťuje
    z otváracej značky a páruje sa ten istý tag.
    """
    m = re.search(r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*class=['\"][^'\"]*" + klas + r"[^'\"]*['\"][^>]*>", w)
    if not m:
        return None
    tag = m.group(1)
    i = m.end()
    otvor = re.compile(r"<" + tag + r"\b", re.I)
    zavri = re.compile(r"</" + tag + r"\s*>", re.I)
    d = 1
    poz = i
    while d:
        o = otvor.search(w, poz)
        z = zavri.search(w, poz)
        if not z:
            return w[i:]
        if o and o.start() < z.start():
            d += 1
            poz = o.end()
        else:
            d -= 1
            if not d:
                return w[i:z.start()]
            poz = z.end()
    return w[i:]


def holyText(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


# ---- renderery jednotlivých widgetov ------------------------------------

def w_header(w):
    nad = holyText(vnutro(w, "rc-header-text__header"))
    pod = holyText(vnutro(w, "rc-header-text__text"))
    return (f'<div style="{SEK};text-align:center">'
            f'<h2 style="font-size:25px;font-weight:600;line-height:31.25px;'
            f'letter-spacing:.8px;color:#000;margin:0">{nad}</h2>'
            f'<p style="font-size:14px;font-weight:500;line-height:24px;letter-spacing:.4px;'
            f'color:#000;margin:20px 0 0">{pod}</p></div>')


def w_advantages(w):
    kusy = re.split(r"""(?=<div class=['"]rc-advantages-four__item)""", w)[1:]
    items = ""
    for k in kusy:
        src = (re.search(r'<img[^>]+src="([^"]+)"', k) or [None, ""])[1]
        nad = holyText(vnutro(k, "rc-advantages-four__info-header"))
        txt = holyText(vnutro(k, "rc-advantages-four__info-text"))
        items += (f'<div style="flex:1 1 240px;padding:0 10px;text-align:center">'
                  f'<img src="{src}" alt="" loading="lazy" '
                  f'style="max-width:280px;width:100%;height:auto;display:block;margin:0 auto 10px">'
                  f'<h3 style="font-size:16px;font-weight:600;line-height:20px;letter-spacing:.8px;'
                  f'color:{GREY1};margin:0 0 10px">{nad}</h3>'
                  f'<span style="font-size:13px;font-weight:400;line-height:17px;letter-spacing:.4px;'
                  f'color:{GREY2};display:block">{txt}</span></div>')
    return f'<div style="{SEK}"><div style="{FLEX};padding:20px 0;gap:0">{items}</div></div>'


def w_reviews(w):
    # POZOR: vzor musí končiť úvodzovkou, inak trafí aj __single-image a rozseká položku
    kusy = re.split(r"""(?=<div class=['"]rc-reviews-threerow__single['"])""", w)[1:]
    items = ""
    for k in kusy:
        foto = (re.search(r'<img[^>]+src="([^"]+)"', k) or [None, ""])[1]
        txt = holyText(vnutro(k, "rc-reviews-threerow__reviews"))
        meno = holyText(vnutro(k, "rc-reviews-threerow__name"))
        dat = holyText(vnutro(k, "rc-reviews-threerow__date"))
        items += (f'<div style="flex:1 1 300px;padding:0 10px;text-align:center">'
                  f'<img src="{foto}" alt="" loading="lazy" style="width:80px;height:80px;'
                  f'border-radius:50%;object-fit:cover;display:block;margin:0 auto 12px">'
                  f'<div style="color:#f2b03d;letter-spacing:2px;margin-bottom:10px">★★★★★</div>'
                  f'<span style="font-size:16px;font-weight:400;line-height:24px;letter-spacing:.4px;'
                  f'color:{INK};display:block">{txt}</span>'
                  f'<h3 style="font-size:16px;font-weight:600;line-height:20px;letter-spacing:1.6px;'
                  f'color:{INK};margin:12px 0 4px">{meno}</h3>'
                  f'<span style="font-size:13px;color:{GREY2}">{dat}</span></div>')
    return f'<div style="{SEK}"><div style="{FLEX};gap:0">{items}</div></div>'


def w_video(w):
    src = (re.search(r'<iframe[^>]+src="([^"]+)"', w) or [None, ""])[1].replace("&amp;", "&")
    return (f'<div style="{SEK}"><div style="position:relative;padding-top:56.25%">'
            f'<iframe src="{src}" loading="lazy" allowfullscreen '
            f'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"></iframe>'
            f'</div></div>')


def w_half(w, strana):
    src = (re.search(r'<img[^>]+src="([^"]+)"', w) or [None, ""])[1]
    text = cistiHtml(vnutro(w, "rc-image-half-" + strana + "__text"))
    text = re.sub(r"<h2[^>]*>", f'<h2 style="{H2};letter-spacing:1.6px">', text)
    text = re.sub(r"<p[^>]*>", f'<p style="{P}">', text)
    smer = "row-reverse" if strana == "left" else "row"
    media = (f'<div style="{COL};padding:0 15px"><img src="{src}" alt="" loading="lazy" '
             f'style="{IMG}"></div>')
    body = f'<div style="{COL};padding:0 15px">{text}</div>'
    return f'<div style="{SEK};{FLEX};flex-direction:{smer};align-items:center">{body}{media}</div>'


def w_gallery(w):
    """Jeden obrázok Pobo drží na 600 px (polovica stĺpca), dva roztiahne na polovice."""
    srcs = re.findall(r'<img[^>]+src="([^"]+)"', w)
    if len(srcs) == 1:
        return (f'<div style="{SEK};text-align:center">'
                f'<img src="{srcs[0]}" alt="" loading="lazy" '
                f'style="max-width:600px;width:100%;height:auto;display:inline-block"></div>')
    items = "".join(f'<div style="flex:1 1 340px"><img src="{s}" alt="" loading="lazy" '
                    f'style="{IMG};object-fit:cover"></div>' for s in srcs)
    return f'<div style="{SEK};{FLEX};gap:20px">{items}</div>'


def w_text(w):
    obsah = cistiHtml(vnutro(w, "empty"))
    obsah = re.sub(r"<h2[^>]*>", f'<h2 style="{H2}">', obsah)
    obsah = re.sub(r"<p[^>]*>", f'<p style="{P}">', obsah)
    obsah = re.sub(r"<table[^>]*>",
                   '<table style="border-collapse:collapse;width:100%;max-width:860px">', obsah)
    obsah = re.sub(r"<td[^>]*>",
                   f'<td style="font-size:14px;font-weight:600;line-height:17.5px;'
                   f'letter-spacing:1.6px;color:{INK};padding:6px 8px;'
                   f'border-bottom:1px solid #e5e3de">', obsah)
    obsah = re.sub(r"<colgroup>.*?</colgroup>", "", obsah, flags=re.S)
    return f'<div style="{SEK}"><div style="overflow-x:auto">{obsah}</div></div>'


def w_profit(w):
    nad = holyText(vnutro(w, "rc-profit__header"))
    hlavicky = re.findall(r"""class=['"]rc-profit__list-header['"][^>]*>(.*?)</h2>""", w, re.S)
    items = ""
    for x in hlavicky:
        items += ('<div style="display:flex;gap:20px;align-items:flex-start;padding:10px 0">'
                  '<span style="flex:0 0 30px;width:30px;height:30px"></span>'
                  f'<span style="font-size:18px;font-weight:500;line-height:20px;'
                  f'letter-spacing:1.6px;color:{INK};padding-top:5px">{holyText(x)}</span></div>')
    return f'<div style="{SEK}"><h2 style="{H2};margin:0 0 10px">{nad}</h2>{items}</div>'


def w_faq(w):
    ot = holyText(vnutro(w, "pb-faq__header"))
    od = cistiHtml(vnutro(w, "pb-faq__content"))
    od = re.sub(r"<p[^>]*>", '<p style="font-size:16px;font-weight:500;line-height:24px;'
                             'letter-spacing:.4px;margin:0 0 24px">', od)
    return ('<details style="border-bottom:1px solid #e5e3de">'
            f'<summary style="cursor:pointer;font-size:18px;font-weight:600;line-height:24px;'
            f'letter-spacing:1.6px;color:{INK};padding:16px 12px 16px 0">{ot}</summary>'
            f'<div style="padding:0 0 4px">{od}</div></details>')


def prepis(zdroj_html):
    m = re.search(r"<!-- Pobo Page Builder - content START -->(.*?)"
                  r"<!-- Pobo Page Builder - content END -->", zdroj_html, re.S)
    if not m:
        raise SystemExit("Pobo blok som na tejto stránke nenašiel.")
    casti = re.split(r"(?=<div\s+data-pobo-widget-id=)", m.group(1))
    von, faq_buffer = [], []
    for w in casti:
        if "widget-container" not in w:
            continue
        k = re.search(r"""class=['"]widget-container ([^'"]+)['"]""", w)
        typ = k.group(1).strip() if k else ""
        if typ != "widget-faq" and faq_buffer:
            von.append(f'<div style="{SEK}" data-pp="faq">' + "".join(faq_buffer) + "</div>")
            faq_buffer = []
        if typ == "widget-header-text":       von.append(w_header(w))
        elif typ == "widget-advantages-four": von.append(w_advantages(w))
        elif typ == "widget-reviews-threerow":von.append(w_reviews(w))
        elif typ == "widget-video-full-col":  von.append(w_video(w))
        elif typ == "widget-image-half-right":von.append(w_half(w, "right"))
        elif typ == "widget-image-half-left": von.append(w_half(w, "left"))
        elif "gallery" in typ:                von.append(w_gallery(w))
        elif typ == "widget-text":            von.append(w_text(w))
        elif typ == "profit-list-dynamic":    von.append(w_profit(w))
        elif typ == "widget-faq":             faq_buffer.append(w_faq(w))
    if faq_buffer:
        von.append(f'<div style="{SEK}" data-pp="faq">' + "".join(faq_buffer) + "</div>")
    return '<div style="max-width:1240px;margin:0 auto">' + "".join(von) + "</div>"


# ---- režim s triedami ----------------------------------------------------
# Kľúč = presný inline reťazec, hodnota = trieda. CSS sa generuje z toho istého
# slovníka, takže sa nemôžu rozísť.
MAPA = [
    (SEK,                                                          "pp-sek"),
    (f"{SEK};text-align:center",                                   "pp-sek pp-hero"),
    (f"{SEK};{FLEX};gap:20px",                                     "pp-sek pp-galeria"),
    (H2,                                                           "pp-h2"),
    (f"{H2};letter-spacing:1.6px",                                 "pp-h2"),
    (f"{H2};margin:0 0 10px",                                      "pp-h2 pp-h2-tesny"),
    (P,                                                            "pp-p"),
    (COL,                                                          "pp-col"),
    (f"{COL};padding:0 15px",                                      "pp-col pp-col-pad"),
    (IMG,                                                          "pp-img"),
    (f"{IMG};object-fit:contain",                                  "pp-img pp-img-contain"),
    (f"{IMG};object-fit:cover",                                    "pp-img pp-img-cover"),
]

CSS_SABLONA = """/* Prepis Pobo widgetov — hodnoty odmerané na www.silwer.sk/glp-1/ 4.9.2026.
   Nasadiť raz na Shoptet CDN a linknúť z Vzhľad → HTML kódy → Záhlavie. */
.pp{max-width:1240px;margin:0 auto}
.pp-sek{padding:30px 0}
.pp-hero{text-align:center}
.pp-h2{font-size:25px;font-weight:600;line-height:31.25px;letter-spacing:1.6px;color:rgb(12,12,12);margin:0 0 20px}
.pp-h2-tesny{margin:0 0 10px}
.pp-p{font-size:18px;font-weight:400;line-height:25px;letter-spacing:.4px;color:rgb(12,12,12);margin:0 0 20px}
.pp-flex{display:flex;flex-wrap:wrap}
.pp-col{flex:1 1 340px;min-width:0}
.pp-col-pad{padding:0 15px}
.pp-img{width:100%;height:auto;display:block}
.pp-img-contain{object-fit:contain}
.pp-img-cover{object-fit:cover}
.pp-galeria{display:flex;flex-wrap:wrap;gap:20px}
.pp-gal-jeden{max-width:600px;width:100%;height:auto;display:inline-block}
.pp-hero h2{font-size:25px;font-weight:600;line-height:31.25px;letter-spacing:.8px;color:#000;margin:0}
.pp-hero p{font-size:14px;font-weight:500;line-height:24px;letter-spacing:.4px;color:#000;margin:20px 0 0}
.pp-adv{display:flex;flex-wrap:wrap;padding:20px 0}
.pp-adv-item{flex:1 1 240px;padding:0 10px;text-align:center}
.pp-adv-item img{max-width:280px;width:100%;height:auto;display:block;margin:0 auto 10px}
.pp-adv-item h3{font-size:16px;font-weight:600;line-height:20px;letter-spacing:.8px;color:rgb(56,56,56);margin:0 0 10px}
.pp-adv-item span{font-size:13px;font-weight:400;line-height:17px;letter-spacing:.4px;color:rgb(87,87,87);display:block}
.pp-rev{display:flex;flex-wrap:wrap}
.pp-rev-item{flex:1 1 300px;padding:0 10px;text-align:center}
.pp-rev-item img{width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 12px}
.pp-rev-hviezdy{color:#f2b03d;letter-spacing:2px;margin-bottom:10px}
.pp-rev-text{font-size:16px;line-height:24px;letter-spacing:.4px;color:rgb(12,12,12);display:block}
.pp-rev-meno{font-size:16px;font-weight:600;line-height:20px;letter-spacing:1.6px;margin:12px 0 4px}
.pp-rev-datum{font-size:13px;color:rgb(87,87,87)}
.pp-video{position:relative;padding-top:56.25%}
/* Shoptet obaľuje iframe v popise do .video-player → vznikne druhý 16:9 wrapper
   a pod videom prázdna medzera. Existujúci fix v Záhlaví je scopnutý na
   #pobo-all-content, náš blok ho nemá — preto tá istá oprava pre .pp-video. */
.pp-video .video-player{position:static!important;padding:0!important;height:auto!important;border:0!important;overflow:visible!important}
.pp-video iframe{position:absolute!important;top:0;left:0;width:100%!important;height:100%!important;border:0}
.pp-profit-item{display:flex;gap:20px;align-items:flex-start;padding:10px 0}
.pp-profit-ico{flex:0 0 30px;width:30px;height:30px;background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23649B0D'/%3E%3Cpath d='M54.3 97.2 24.8 67.7l9.9-9.9L55 78.1l38.2-38.2 9.9 9.9z' fill='%23fff'/%3E%3C/svg%3E") no-repeat center/contain}
.pp-profit-text{font-size:18px;font-weight:500;line-height:20px;letter-spacing:1.6px;color:rgb(12,12,12);padding-top:5px}
.pp-faq details{margin-bottom:10px}
.pp-faq summary{position:relative;list-style:none;cursor:pointer;padding:12px 12px 12px 40px;border:1px solid #eaeaea;border-radius:4px;box-shadow:#64646f33 0 2px 7px 0;background:#fff;font-size:15px;font-weight:600;line-height:38px;letter-spacing:1.6px;color:rgb(12,12,12)}
.pp-faq summary::-webkit-details-marker{display:none}
.pp-faq summary::before{content:"";position:absolute;left:5px;top:50%;margin-top:-15px;width:30px;height:30px;background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23134563' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat center/16px;transition:transform .3s ease-in-out}
.pp-faq details[open] summary{border-radius:4px 4px 0 0}
.pp-faq details[open] summary::before{transform:rotate(180deg)}
.pp-faq details > div{background:#fff;border:1px solid #eaeaea;border-top:0;border-radius:0 0 5px 5px;box-shadow:#64646f33 0 2px 7px 0;padding:5px 20px}
.pp-faq p{font-size:16px;font-weight:500;line-height:24px;letter-spacing:.4px;margin:0 0 24px}
.pp-half{display:flex;flex-wrap:wrap;align-items:center}
.pp-half-obrazok-vlavo{flex-direction:row-reverse}
/* dávkovací box a disclaimer — používa ich render_pp.py pri kartách písaných od nuly */
.pp-dose{display:flex;flex-wrap:wrap;border:1.5px solid #e5e3de;border-radius:12px;overflow:hidden}
.pp-dose-cell{flex:1 1 200px;padding:22px 24px;border-right:1px solid #e5e3de}
.pp-dose-cell:last-child{border-right:0}
.pp-dose-label{font-size:12px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#55555a;display:block;margin-bottom:6px}
.pp-dose-value{font-size:18px;font-weight:700;line-height:1.4;display:block}
.pp-note{background:#f5f4f1;border-radius:12px;padding:20px 24px;font-size:16px;line-height:1.6;color:#55555a}
.pp-note p{margin:0}
.pp-benefit-h2{margin:0 0 10px}
.pp-tab{overflow-x:auto}
.pp-tab table{border-collapse:collapse;border-spacing:0;width:100%}
.pp-tab tr{border-bottom:1px solid #dcdcdc}
.pp-tab tr:nth-child(2n){background:#f6f6f6}
.pp-tab td{font-size:14px;font-weight:600;line-height:17.5px;letter-spacing:1.6px;color:rgb(12,12,12);padding:6px 8px}
@media(max-width:768px){.pp-sek{padding:20px 0}.pp-h2{font-size:22px;line-height:28px}}
"""


def naTriedy(h):
    """Nahradí inline štýly triedami. Dlhšie reťazce najprv, nech sa neprekryjú."""
    for inline, trieda in sorted(MAPA, key=lambda x: -len(x[0])):
        h = h.replace(f'style="{inline}"', f'class="{trieda}"')
    # zvyšné opakované štýly → triedy podľa vzoru
    h = h.replace('style="display:flex;flex-wrap:wrap;padding:20px 0;gap:0"', 'class="pp-adv"')
    h = h.replace('style="flex:1 1 240px;padding:0 10px;text-align:center"', 'class="pp-adv-item"')
    h = h.replace('style="flex:1 1 300px;padding:0 10px;text-align:center"', 'class="pp-rev-item"')
    h = h.replace('style="display:flex;flex-wrap:wrap;gap:0"', 'class="pp-rev"')
    h = h.replace('style="position:relative;padding-top:56.25%"', 'class="pp-video"')
    h = h.replace('style="display:flex;gap:20px;align-items:flex-start;padding:10px 0"', 'class="pp-profit-item"')
    h = h.replace('style="overflow-x:auto"', 'class="pp-tab"')
    h = re.sub(r'style="max-width:280px;width:100%;height:auto;display:block;margin:0 auto 10px"', '', h)
    h = re.sub(r'style="font-size:16px;font-weight:600;line-height:20px;letter-spacing:\.8px;color:rgb\(56,56,56\);margin:0 0 10px"', '', h)
    h = re.sub(r'style="font-size:13px;font-weight:400;line-height:17px;letter-spacing:\.4px;color:rgb\(87,87,87\);display:block"', '', h)
    h = re.sub(r'style="width:80px;height:80px;[^"]*"', '', h)
    h = h.replace('style="color:#f2b03d;letter-spacing:2px;margin-bottom:10px"', 'class="pp-rev-hviezdy"')
    h = re.sub(r'style="font-size:16px;font-weight:400;line-height:24px;letter-spacing:\.4px;color:rgb\(12,12,12\);display:block"', 'class="pp-rev-text"', h)
    h = re.sub(r'style="font-size:16px;font-weight:600;line-height:20px;letter-spacing:1\.6px;color:rgb\(12,12,12\);margin:12px 0 4px"', 'class="pp-rev-meno"', h)
    h = re.sub(r'style="font-size:13px;color:rgb\(87,87,87\)"', 'class="pp-rev-datum"', h)
    h = re.sub(r'style="flex:0 0 30px;[^"]*"', 'class="pp-profit-ico"', h)
    h = re.sub(r'style="font-size:18px;font-weight:500;line-height:20px;letter-spacing:1\.6px;color:rgb\(12,12,12\);padding-top:5px"', 'class="pp-profit-text"', h)
    h = re.sub(r'<details style="[^"]*">', '<details>', h)
    h = re.sub(r'<summary style="[^"]*">', '<summary>', h)
    h = re.sub(r'style="padding:0 0 4px"', '', h)
    h = re.sub(r'<td style="[^"]*">', '<td>', h)
    h = re.sub(r'<table style="[^"]*">', '<table>', h)
    h = re.sub(r'<p style="font-size:16px;font-weight:500;line-height:24px;letter-spacing:\.4px;margin:0 0 24px">', '<p>', h)
    h = h.replace('class="pp-sek" data-pp="faq"', 'class="pp-sek pp-faq"')
    h = h.replace(f'style="{SEK}" data-pp="faq"', 'class="pp-sek pp-faq"')
    h = h.replace('style="padding:30px 0;display:flex;flex-wrap:wrap;flex-direction:row-reverse;align-items:center"',
                  'class="pp-sek pp-half pp-half-obrazok-vlavo"')
    h = h.replace('style="padding:30px 0;display:flex;flex-wrap:wrap;flex-direction:row;align-items:center"',
                  'class="pp-sek pp-half"')
    h = h.replace('style="flex:1 1 340px"', 'class="pp-col"')
    h = h.replace('style="max-width:600px;width:100%;height:auto;display:inline-block"', 'class="pp-gal-jeden"')
    h = h.replace('class="pp-sek" style="text-align:center"', 'class="pp-sek pp-hero"')
    h = h.replace('style="font-size:25px;font-weight:600;line-height:31.25px;letter-spacing:.8px;color:#000;margin:0"', '')
    h = h.replace('style="font-size:14px;font-weight:500;line-height:24px;letter-spacing:.4px;color:#000;margin:20px 0 0"', '')
    h = h.replace('style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"', '')
    h = h.replace('style="max-width:1240px;margin:0 auto"', 'class="pp"')
    h = re.sub(r'\s+(class|style)=""', '', h)
    h = re.sub(r'\s{2,}', ' ', h)
    return h


def skontrolujTriedy(html, css):
    """Každá trieda použitá v HTML musí byť definovaná v CSS.

    Vzniklo z reálnej chyby: trieda nahradila zlúčený inline štýl
    (padding + display:flex + gap), ale v CSS mala len gap — galéria sa
    rozsypala pod seba a nikde to nezakričalo. Rovnaká trieda chyby ako
    str.replace() bez kontroly, či vzor existoval.
    """
    pouzite = {c for m in re.findall(r'class="([^"]+)"', html) for c in m.split()}
    definovane = set(re.findall(r"\.([a-zA-Z][\w-]*)", css))
    chybaju = sorted(pouzite - definovane)
    if chybaju:
        print("\n🛑 CHYBAJÚCE DEFINÍCIE V CSS — blok by sa rozsypal:")
        for c in chybaju:
            print(f"     .{c}")
        raise SystemExit("Oprav CSS_SABLONA a spusti znova.")
    print(f"kontrola tried:   {len(pouzite)} použitých, všetky definované ✓")


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    z, v = sys.argv[1], sys.argv[2]
    if z.startswith("http"):
        src = urlopen(Request(z, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read().decode("utf-8", "replace")
    else:
        src = Path(z).read_text(encoding="utf-8")
    out = prepis(src)
    rezim = "inline"
    if "--triedy" in sys.argv:
        rezim = "triedy"
        out = naTriedy(out)
        # CSS sa už negeneruje — jediný zdroj je _system/silwer-bloky.css (zamrazené).
        kanon = Path(__file__).parent / "silwer-bloky.css"
        CSS = kanon.read_text(encoding="utf-8")
        css = Path(v).with_name("silwer-bloky.css")
        css.write_text(CSS, encoding="utf-8")
        skontrolujTriedy(out, CSS)
        # Shoptet servíruje statické súbory s cache-control max-age=31536000 (ROK).
        # Bez verzie v URL si prehliadač novú verziu nestiahne a zmena sa neprejaví.
        # Preto majú aj ostatné linky v Záhlaví ?v=... na konci.
        import hashlib
        verzia = hashlib.md5(CSS.encode()).hexdigest()[:6]
        print(f"\n  ⚠️  CSS má na Shoptete ROČNÚ cache — link MUSÍ mať verziu.")
        print(f"  Riadok do Vzhľad a obsah → Editor → HTML kód → Záhlavie:\n")
        print(f'  <link rel="stylesheet" href="https://www.silwer.sk/user/documents/upload/KODY/silwer-bloky.css?v={verzia}">\n')
        print(f"{css.name}  {len(CSS)} znakov  → nasadiť na Shoptet CDN + <link>")
    LIMIT = 32767
    stav = "OK" if len(out) <= LIMIT else "PREKROČENÝ LIMIT"
    Path(v).write_text(out, encoding="utf-8")
    print(f"{v}  {len(out)} znakov  ({rezim}) / limit {LIMIT} → {stav} "
          f"({len(out)/LIMIT*100:.0f} %)   Pobo mal 21 704")
    print("⚠️  Obrázky stále ukazujú na image.pobo.space — pred nasadením ich treba")
    print("    prehodiť do Shoptet Správcu súborov, inak ostáva závislosť na Pobo CDN.")


if __name__ == "__main__":
    main()
