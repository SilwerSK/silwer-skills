#!/usr/bin/env python3
"""Silwer — render bloku pod produktom.

produkt.json  ->  blok.html   (markup do poľa DESCRIPTION v Shoptete)
              ->  nahlad.html (samostatný náhľad s CSS, na kontrolu v prehliadači)

Použitie:
    python3 render.py ../ashwagandha
    python3 render.py ../ashwagandha --lokalne-obrazky   # náhľad ťahá fotky z obrazky/
"""
import json, sys, html
from pathlib import Path

SYSTEM = Path(__file__).parent
LIMIT_DESCRIPTION = 32767


def p(texts):
    return "".join(f"<p>{t}</p>" for t in texts)


def esc(s):
    return html.escape(s, quote=True)


# --- komponenty -----------------------------------------------------------

def c_hero(b, _):
    out = f'<div class="sw-pdp-hero"><h2>{b["nadpis"]}</h2>'
    if b.get("podnadpis"):
        out += f'<p>{b["podnadpis"]}</p>'
    return out + "</div>"


def c_split(b, base):
    """Text v HTML vždy pred obrázkom — viď vysvetlenie v render_inline.py."""
    side = "right" if b.get("strana") == "right" else "left"
    img = f'<img src="{base}{b["obrazok"]}" alt="{esc(b.get("alt",""))}" loading="lazy">'
    body = f'<h2>{b["nadpis"]}</h2>{p(b["text"])}' if b.get("nadpis") else p(b["text"])
    return (f'<div class="sw-pdp-split sw-pdp-split--{side}">'
            f'<div class="sw-pdp-split__body">{body}</div>'
            f'<div class="sw-pdp-split__media">{img}</div></div>')


def c_stats(b, _):
    items = "".join(
        f'<div class="sw-pdp-stat"><span class="sw-pdp-stat__num">{i["cislo"]}</span>'
        f'<span class="sw-pdp-stat__label">{i["popis"]}</span>'
        f'<span class="sw-pdp-stat__note">{i.get("disclaimer","")}</span></div>'
        for i in b["polozky"])
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f'{head}<div class="sw-pdp-stats">{items}</div>'


def c_benefits(b, _):
    li = "".join(f"<li>{x}</li>" for x in b["polozky"])
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f'<div class="sw-pdp-benefits">{head}<ul>{li}</ul></div>'


def c_table(b, _):
    th = "".join(f"<th>{x}</th>" for x in b["hlavicka"])
    rows = ""
    for r in b["riadky"]:
        cls = ' class="sw-pdp-sub"' if r.get("sub") else ""
        tds = "".join(f"<td>{x}</td>" for x in r["bunky"])
        rows += f"<tr{cls}>{tds}</tr>"
    leg = "".join(f"<span>{x}</span>" for x in b.get("legenda", []))
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    txt = p(b["text"]) if b.get("text") else ""
    return (f'<div class="sw-pdp-table-wrap">{head}{txt}'
            f'<div class="sw-pdp-table"><table><thead><tr>{th}</tr></thead>'
            f'<tbody>{rows}</tbody></table></div>'
            f'<div class="sw-pdp-legend">{leg}</div></div>')


def c_dose(b, _):
    cells = "".join(
        f'<div class="sw-pdp-dose__cell"><span class="sw-pdp-dose__label">{c["label"]}</span>'
        f'<span class="sw-pdp-dose__value">{c["value"]}</span></div>'
        for c in b["bunky"])
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    txt = p(b["text"]) if b.get("text") else ""
    return f'<div>{head}<div class="sw-pdp-dose">{cells}</div>{txt}</div>'


def c_faq(b, _):
    items = "".join(
        f'<details{" open" if i == 0 else ""}><summary>{x["otazka"]}</summary>'
        f'<div><p>{x["odpoved"]}</p></div></details>'
        for i, x in enumerate(b["polozky"]))
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f'<div class="sw-pdp-faq">{head}{items}</div>'


def c_gallery(b, base):
    imgs = "".join(f'<img src="{base}{x["subor"]}" alt="{esc(x.get("alt",""))}" loading="lazy">'
                   for x in b["polozky"])
    n = 2 if len(b["polozky"]) > 1 else 1
    return f'<div class="sw-pdp-gallery sw-pdp-gallery--{n}">{imgs}</div>'


def c_video(b, _):
    return (f'<div class="sw-pdp-video"><iframe src="https://www.youtube-nocookie.com/embed/{b["kod"]}" '
            f'title="{esc(b.get("titulok","Video"))}" allowfullscreen loading="lazy"></iframe></div>')


def c_reviews(b, _):
    items = "".join(
        f'<div class="sw-pdp-review"><div class="sw-pdp-review__stars">★★★★★</div>'
        f'<p>{x["text"]}</p><div class="sw-pdp-review__name">{x["meno"]}</div></div>'
        for x in b["polozky"])
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f'{head}<div class="sw-pdp-reviews">{items}</div>'


def c_studies(b, _):
    li = "".join(f'<li><strong>{x["popis"]}</strong><br><a href="{x["url"]}" target="_blank" '
                 f'rel="nofollow noopener">{x["url"].split("//")[-1][:60]}</a></li>'
                 for x in b["polozky"])
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f'<div class="sw-pdp-studies">{head}<ul>{li}</ul></div>'


def c_text(b, _):
    head = f'<h2>{b["nadpis"]}</h2>' if b.get("nadpis") else ""
    return f"<div>{head}{p(b['text'])}</div>"


def c_note(b, _):
    return f'<div class="sw-pdp-note">{p(b["text"])}</div>'


KOMPONENTY = {
    "hero": c_hero, "split": c_split, "stats": c_stats, "benefits": c_benefits,
    "table": c_table, "dose": c_dose, "faq": c_faq, "gallery": c_gallery,
    "video": c_video, "reviews": c_reviews, "studies": c_studies,
    "text": c_text, "note": c_note,
}


def render(data, base):
    parts = []
    for b in data["blok"]:
        fn = KOMPONENTY.get(b["typ"])
        if not fn:
            raise SystemExit(f"Neznámy komponent: {b['typ']}. Známe: {', '.join(KOMPONENTY)}")
        parts.append(fn(b, base))
    return '<div class="sw-pdp">' + "".join(parts) + "</div>"


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    folder = Path(sys.argv[1]).resolve()
    lokalne = "--lokalne-obrazky" in sys.argv
    data = json.loads((folder / "produkt.json").read_text(encoding="utf-8"))

    blok = render(data, data["obrazky_base"])
    (folder / "blok.html").write_text(blok, encoding="utf-8")

    nahlad_base = "obrazky/" if lokalne else data["obrazky_base"]
    css = (SYSTEM / "silwer-pdp.css").read_text(encoding="utf-8")
    nahlad = f"""<!doctype html><html lang="sk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Náhľad — {data['nazov']}</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
<style>
/* Simulácia Shoptet Samby — root 10px. BEZ TOHTO NÁHĽAD KLAME. */
html{{font-size:62.5%}}
body{{margin:0;background:#fff;font-family:Roboto,system-ui,sans-serif;color:#1a1a1c;font-size:16px}}
.wrap{{padding:40px 24px 80px}}
.sim{{max-width:1240px;margin:0 auto 40px;padding:24px;border:2px dashed #e5e3de;border-radius:12px;
      color:#55555a;font-size:14px;text-align:center}}
{css}
</style></head><body><div class="wrap">
<div class="sim">↑ Tu končí Shoptet — galéria, cena a tlačidlo <strong>Do košíka</strong>.<br>
Všetko nižšie je obsah poľa <code>DESCRIPTION</code> — jeden HTML blok.</div>
{render(data, nahlad_base)}
</div></body></html>"""
    (folder / "nahlad.html").write_text(nahlad, encoding="utf-8")

    n = len(blok)
    stav = "OK" if n <= LIMIT_DESCRIPTION else "PREKROČENÝ LIMIT"
    print(f"blok.html    {n:>6} znakov / limit {LIMIT_DESCRIPTION}  → {stav} "
          f"({n / LIMIT_DESCRIPTION * 100:.0f} %)")
    print(f"nahlad.html  {len(nahlad):>6} znakov (len na kontrolu, nejde do Shoptetu)")
    print(f"komponenty:  {', '.join(b['typ'] for b in data['blok'])}")


if __name__ == "__main__":
    main()
