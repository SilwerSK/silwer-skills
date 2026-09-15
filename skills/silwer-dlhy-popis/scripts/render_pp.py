#!/usr/bin/env python3
"""Render karty písanej od nuly do tried `pp-*`.

Prečo pp- a nie sw-pdp-: `pobo-prepis.css` je už nasadené na Shoptete a linknuté
v Záhlaví. Používať druhý CSS súbor by znamenalo druhý upload a druhý <link>
v sekcii, kde je voľných len ~900 znakov. Jeden súbor pokrýva obe vetvy —
prepisy z Pobo aj karty od nuly.

Vstup:  produkt.json (rovnaký formát ako render.py)
Výstup: blok.html + nahlad.html

Použitie:
    python3 render_pp.py ../dobry-spanok [--lokalne-obrazky]
"""
import json, sys, html
from pathlib import Path

SYSTEM = Path(__file__).parent
LIMIT = 32767


def esc(s):
    return html.escape(s or "", quote=True)


def p_(texts, trieda="pp-p"):
    return "".join(f'<p class="{trieda}">{t}</p>' for t in texts)


def h2(t, extra=""):
    return f'<h2 class="pp-h2{extra}">{t}</h2>' if t else ""


def c_hero(b, _):
    return (f'<div class="pp-sek pp-hero">{h2(b["nadpis"])}'
            f'{p_([b.get("podnadpis","")])}</div>')


def c_split(b, base):
    """Text je v HTML vždy pred obrázkom — na mobile tak vyjde nadpis → text → obrázok."""
    vlavo = " pp-half-obrazok-vlavo" if b.get("strana") == "left" else ""
    media = (f'<div class="pp-col pp-col-pad"><img src="{base}{b["obrazok"]}" '
             f'alt="{esc(b.get("alt"))}" loading="lazy" class="pp-img"></div>')
    body = f'<div class="pp-col pp-col-pad">{h2(b.get("nadpis"))}{p_(b["text"])}</div>'
    return f'<div class="pp-sek pp-half{vlavo}">{body}{media}</div>'


def c_stats(b, _):
    items = "".join(
        f'<div class="pp-adv-item"><h3>{i["cislo"]} {i["popis"]}</h3>'
        f'<span>{i.get("disclaimer","")}</span></div>' for i in b["polozky"])
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-adv">{items}</div></div>'


def c_benefits(b, _):
    items = "".join('<div class="pp-profit-item"><span class="pp-profit-ico"></span>'
                    f'<span class="pp-profit-text">{x}</span></div>' for x in b["polozky"])
    return f'<div class="pp-sek">{h2(b.get("nadpis")," pp-benefit-h2")}{items}</div>'


def c_table(b, _):
    th = "".join(f"<td><strong>{x}</strong></td>" for x in b["hlavicka"])
    rows = "".join("<tr>" + "".join(f"<td>{x}</td>" for x in r["bunky"]) + "</tr>"
                   for r in b["riadky"])
    leg = "".join(f'<p class="pp-p">{x}</p>' for x in b.get("legenda", []))
    txt = p_(b["text"]) if b.get("text") else ""
    return (f'<div class="pp-sek">{h2(b.get("nadpis"))}{txt}'
            f'<div class="pp-tab"><table><tbody><tr>{th}</tr>{rows}</tbody></table></div>'
            f"{leg}</div>")


def c_dose(b, _):
    cells = "".join(f'<div class="pp-dose-cell"><span class="pp-dose-label">{c["label"]}</span>'
                    f'<span class="pp-dose-value">{c["value"]}</span></div>' for c in b["bunky"])
    txt = p_(b["text"]) if b.get("text") else ""
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-dose">{cells}</div>{txt}</div>'


def c_faq(b, _):
    items = "".join(f'<details{" open" if i == 0 else ""}><summary>{x["otazka"]}</summary>'
                    f'<div><p>{x["odpoved"]}</p></div></details>'
                    for i, x in enumerate(b["polozky"]))
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-faq">{items}</div></div>'


def c_gallery(b, base):
    if len(b["polozky"]) == 1:
        x = b["polozky"][0]
        return (f'<div class="pp-sek pp-hero"><img src="{base}{x["subor"]}" '
                f'alt="{esc(x.get("alt"))}" loading="lazy" class="pp-gal-jeden"></div>')
    imgs = "".join(f'<div class="pp-col"><img src="{base}{x["subor"]}" '
                   f'alt="{esc(x.get("alt"))}" loading="lazy" class="pp-img pp-img-cover"></div>'
                   for x in b["polozky"])
    return f'<div class="pp-sek pp-galeria">{imgs}</div>'


def c_text(b, _):
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}{p_(b["text"])}</div>'


def c_note(b, _):
    return ('<div class="pp-sek"><div class="pp-note">'
            + "".join(f"<p>{t}</p>" for t in b["text"]) + "</div></div>")


def c_cisla(b, _):
    """Číselné karty ako TEXT, nie ako obrázok.

    Pobo na GLP-1 rieši čísla (80 %, 2,5 kg) obrázkami — nedajú sa vyhľadať,
    preložiť ani prečítať čítačkou a na mobile sa nezalomia. Tu je to text.
    """
    items = "".join(
        f'<div class="pp-cislo"><span class="pp-cislo-hodnota">{i["hodnota"]}</span>'
        f'<span class="pp-cislo-popis">{i["popis"]}</span>'
        + (f'<span class="pp-cislo-pozn">{i["pozn"]}</span>' if i.get("pozn") else "")
        + "</div>" for i in b["polozky"])
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-cisla">{items}</div></div>'


def c_zlozky(b, _):
    """Mriežka zložiek — názov vľavo, množstvo vpravo, voliteľná poznámka pod tým."""
    items = "".join(
        f'<div class="pp-zlozka"><span class="pp-zlozka-nazov">{i["nazov"]}'
        + (f'<span class="pp-zlozka-pozn">{i["pozn"]}</span>' if i.get("pozn") else "")
        + f'</span><span class="pp-zlozka-mnozstvo">{i["mnozstvo"]}</span></div>'
        for i in b["polozky"])
    txt = p_(b["text"]) if b.get("text") else ""
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}{txt}<div class="pp-zlozky">{items}</div></div>'


def c_kroky(b, _):
    """Číslované kroky — čísla kreslí CSS counter, nie sú v HTML."""
    items = "".join(
        f'<div class="pp-krok"><span class="pp-krok-nadpis">{i["nadpis"]}</span>'
        f'<span class="pp-krok-text">{i["text"]}</span></div>' for i in b["polozky"])
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-kroky">{items}</div></div>'


def c_porovnanie(b, _):
    """Dva stĺpce proti sebe. `slabsie: true` prehodí háčiky na krížiky."""
    stlpce = ""
    for s_ in b["stlpce"]:
        cls = "pp-por"
        if s_.get("zvyraznene"):
            cls += " pp-por-zvyraznene"
        if s_.get("slabsie"):
            cls += " pp-por-slabsie"
        li = "".join(f"<li>{x}</li>" for x in s_["polozky"])
        stlpce += (f'<div class="{cls}"><span class="pp-por-nadpis">{s_["nadpis"]}</span>'
                   f"<ul>{li}</ul></div>")
    return f'<div class="pp-sek">{h2(b.get("nadpis"))}<div class="pp-porovnanie">{stlpce}</div></div>'


KOMP = {"cisla": c_cisla, "zlozky": c_zlozky, "kroky": c_kroky, "porovnanie": c_porovnanie,
        "hero": c_hero, "split": c_split, "stats": c_stats, "benefits": c_benefits,
        "table": c_table, "dose": c_dose, "faq": c_faq, "gallery": c_gallery,
        "text": c_text, "note": c_note}


def skontroluj(htm, css):
    import re
    pouzite = {c for m in re.findall(r'class="([^"]+)"', htm) for c in m.split()}
    definovane = set(re.findall(r"\.([a-zA-Z][\w-]*)", css))
    chyba = sorted(pouzite - definovane)
    if chyba:
        print("\n🛑 CHÝBAJÚ DEFINÍCIE V CSS:")
        for c in chyba:
            print("     ." + c)
        raise SystemExit("Doplň ich do CSS_SABLONA v pobo_prepis.py a spusti ho znova.")
    print(f"kontrola tried:   {len(pouzite)} použitých, všetky definované ✓")


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    folder = Path(sys.argv[1]).resolve()
    lokalne = "--lokalne-obrazky" in sys.argv
    data = json.loads((folder / "produkt.json").read_text(encoding="utf-8"))
    css_path = SYSTEM / "silwer-bloky.css"   # jediný zdroj pravdy o štýloch
    css = css_path.read_text(encoding="utf-8")

    def render(base):
        return '<div class="pp">' + "".join(
            KOMP[b["typ"]](b, base) for b in data["blok"]) + "</div>"

    blok = render(data["obrazky_base"])
    (folder / "blok.html").write_text(blok, encoding="utf-8")
    skontroluj(blok, css)

    nahlad = f"""<!doctype html><html lang="sk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Náhľad — {data['nazov']}</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
html{{font-size:62.5%}}   /* Samba: root 10px */
body{{margin:0;background:#fff;font-family:Roboto,system-ui,sans-serif;color:#1a1a1c}}
.basic-description{{font-size:16px;line-height:24px}}
.wrap{{max-width:1026px;margin:0 auto;padding:20px}}
{css}
</style></head><body><div class="wrap"><div class="basic-description">
{render('obrazky/' if lokalne else data['obrazky_base'])}
</div></div></body></html>"""
    (folder / "nahlad.html").write_text(nahlad, encoding="utf-8")

    n = len(blok)
    print(f"blok.html         {n} znakov / limit {LIMIT} → "
          f"{'OK' if n <= LIMIT else 'PREKROČENÝ LIMIT'} ({n / LIMIT * 100:.0f} %)")
    print(f"komponenty:       {', '.join(b['typ'] for b in data['blok'])}")


if __name__ == "__main__":
    main()
