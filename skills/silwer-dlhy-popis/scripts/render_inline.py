#!/usr/bin/env python3
"""Silwer — blok pod produktom, verzia s INLINE štýlmi.

Na čo to je: pilot bez zásahu do administrácie. Žiadny CSS súbor, žiadny <link>
v HTML kódoch — všetko je v jednom kuse HTML, ktorý sa vloží do Detailného popisu.

Prečo to je bezpečné: v exporte silwer.sk má 72 zo 113 produktov inline style=""
v popise, takže je overené, že to Shoptet editor nezahodí. <style> blok nemá ani jeden
produkt, čiže o ňom nevieme nič — preto ho nepoužívame.

Responzivita bez media queries: flex-wrap + flex-basis. Stĺpce sa zlomia pod seba samy,
keď nie je miesto. Media query sa do inline štýlu napísať nedá.

⚠️ VEĽKOSTI PÍSMA — pravidlá, obe vydreté na živej stránke 4.9.2026:

1. ŽIADNE `rem`. Shoptet Samba má `html{font-size:62.5%}` → 1rem = 10px, nie 16px.
   Prvá verzia použila rem a hlavička tabuľky vyšla na 7,2 px, otázka FAQ na 10,8 px.

2. ŽIADNA absolútna veľkosť na obale — obal veľkosť NENASTAVUJE, dedí ju zo šablóny.
   Druhá verzia mala natvrdo 18px, kým krátky popis nad tlačidlom má 16px → pri
   scrollovaní to vyzeralo ako dve zlepené stránky. Dedením sedíme so zvyškom stránky
   dnes (16px) a po redizajne sa prispôsobíme sami.

3. Odchýlky výhradne cez `em` — je relatívne k rodičovi, takže škáluje spolu s dedenou
   veľkosťou. Pozor na vnorenie: `em` sa násobí, preto nikdy nedávaj em-prvok do
   em-prvku (overené — v tomto rendereri žiadny taký prípad nie je).

Použitie:
    python3 render_inline.py ../ashwagandha
"""
import json, sys, html
from pathlib import Path

LIMIT = 32767
INK, MUTED, LINE, FIELD, OK = "#1a1a1c", "#55555a", "#e5e3de", "#f5f4f1", "#2e8b57"
R = "12px"

WRAP = (f"color:{INK};max-width:1240px;margin:0 auto")  # veľkosť sa DEDÍ zo šablóny
TBL_MAX = "860px"   # užšia tabuľka — inak čísla utečú od názvov až k okraju
SEC = "margin:0 0 60px"
H2 = "font-size:1.75em;line-height:1.2;letter-spacing:-.02em;font-weight:800;margin:0 0 .6em"
P = "margin:0 0 1em;line-height:1.6"
FLEX = "display:flex;flex-wrap:wrap;gap:48px;align-items:center"
COL = "flex:1 1 340px;min-width:0"
IMG = f"width:100%;height:auto;display:block;border-radius:{R}"


def esc(s):
    return html.escape(s, quote=True)


def paras(texts, extra=""):
    return "".join(f'<p style="{P};{extra}">{t}</p>' for t in texts)


def h2(t):
    return f'<h2 style="{H2}">{t}</h2>' if t else ""


def c_split(b, base):
    """Text je v HTML VŽDY pred obrázkom; strana sa prehadzuje cez flex-direction.

    Prečo: pri zalomení do jedného stĺpca (mobil) sa poradie riadi DOM-om, nie
    smerom flexu — takže na mobile vyjde vždy nadpis → text → obrázok. Keby bol
    obrázok v HTML prvý, dva susedné splity by na mobile dali dva obrázky pod
    sebou a čitateľ ich vníma ako galériu. Overené na živej stránke 4.9.2026.
    Media query, ktorá by to riešila poradím, sa do inline štýlu napísať nedá.
    """
    media = (f'<div style="{COL}"><img src="{base}{b["obrazok"]}" '
             f'alt="{esc(b.get("alt",""))}" loading="lazy" style="{IMG}"></div>')
    body = f'<div style="{COL}">{h2(b.get("nadpis"))}{paras(b["text"])}</div>'
    smer = "row-reverse" if b.get("strana") == "left" else "row"
    return f'<div style="{SEC};{FLEX};flex-direction:{smer}">{body}{media}</div>'


def c_hero(b, _):
    return (f'<div style="{SEC};max-width:820px;margin-left:auto;margin-right:auto;text-align:center">'
            f'{h2(b["nadpis"])}{paras([b.get("podnadpis","")], f"color:{MUTED};font-size:1.1em")}</div>')


def c_stats(b, _):
    items = "".join(
        f'<div style="flex:1 1 180px;text-align:center">'
        f'<span style="font-size:2.8em;font-weight:800;line-height:1;letter-spacing:-.03em;'
        f'color:#e60f0f;display:block;margin-bottom:.3em">{i["cislo"]}</span>'
        f'<span style="font-weight:800;font-size:1.05em;line-height:1.3;display:block;'
        f'margin-bottom:.5em">{i["popis"]}</span>'
        f'<span style="font-size:.85em;line-height:1.45;color:{MUTED};display:block">'
        f'{i.get("disclaimer","")}</span></div>'
        for i in b["polozky"])
    return (f'<div style="{SEC}">{h2(b.get("nadpis"))}'
            f'<div style="display:flex;flex-wrap:wrap;gap:32px 24px">{items}</div></div>')


def c_benefits(b, _):
    li = "".join(
        f'<li style="display:flex;gap:14px;align-items:flex-start;margin:0 0 14px">'
        f'<span style="flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:{FIELD};'
        f'color:{OK};font-weight:800;font-size:.8em;line-height:22px;text-align:center;'
        f'margin-top:.3em">&#10003;</span><span>{x}</span></li>'
        for x in b["polozky"])
    return (f'<div style="{SEC}">{h2(b.get("nadpis"))}'
            f'<ul style="list-style:none;margin:0;padding:0;max-width:66ch">{li}</ul></div>')


def c_table(b, _):
    thc = (f"padding:12px 16px;border-bottom:2px solid {LINE};font-size:.8em;font-weight:800;"
           f"letter-spacing:.09em;text-transform:uppercase;color:{MUTED}")
    th = "".join(f'<th style="{thc};text-align:{"left" if n == 0 else "right"}">{x}</th>'
                 for n, x in enumerate(b["hlavicka"]))
    rows = ""
    for ri, r in enumerate(b["riadky"]):
        posledny = ri == len(b["riadky"]) - 1
        tds = ""
        for n, x in enumerate(r["bunky"]):
            al = "left" if n == 0 else "right"
            pad = "14px 16px 14px 34px" if (n == 0 and r.get("sub")) else "14px 16px"
            col = f";color:{MUTED};font-size:.95em" if (n == 0 and r.get("sub")) else ""
            br = "0" if posledny else f"1px solid {LINE}"
            tds += (f'<td style="padding:{pad};border-bottom:{br};'
                    f'text-align:{al}{col}">{x}</td>')
        rows += f"<tr>{tds}</tr>"
    leg = "".join(f'<span style="display:block">{x}</span>' for x in b.get("legenda", []))
    txt = paras(b["text"], "max-width:66ch") if b.get("text") else ""
    return (f'<div style="{SEC}">{h2(b.get("nadpis"))}{txt}'
            f'<div style="overflow-x:auto;max-width:{TBL_MAX}"><table style="border-collapse:collapse;'
            f'width:100%;min-width:460px"><thead><tr>{th}</tr></thead><tbody>{rows}</tbody>'
            f'</table><div style="font-size:.85em;line-height:1.5;color:{MUTED};margin-top:12px">{leg}</div>'
            f'</div></div>')


def c_dose(b, _):
    n_cells = len(b["bunky"])
    cells = "".join(
        f'<div style="flex:1 1 200px;padding:22px 24px'
        f'{"" if i == n_cells - 1 else f";border-right:1px solid {LINE}"}">'
        f'<span style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;'
        f'color:{MUTED};display:block;margin-bottom:6px">{c["label"]}</span>'
        f'<span style="font-weight:700;line-height:1.4;display:block">'
        f'{c["value"]}</span></div>'
        for i, c in enumerate(b["bunky"]))
    txt = paras(b["text"], "max-width:66ch;margin-top:1em") if b.get("text") else ""
    return (f'<div style="{SEC}">{h2(b.get("nadpis"))}'
            f'<div style="display:flex;flex-wrap:wrap;border:1.5px solid {LINE};'
            f'border-radius:{R};overflow:hidden">{cells}</div>{txt}</div>')


def c_faq(b, _):
    items = "".join(
        f'<details{" open" if i == 0 else ""} style="border-bottom:1px solid {LINE};'
        f'{"border-top:1px solid " + LINE + ";" if i == 0 else ""}padding:4px 0">'
        f'<summary style="cursor:pointer;padding:18px 0;font-weight:700;font-size:1.15em;'
        f'line-height:1.4">{x["otazka"]}</summary>'
        f'<div style="padding:0 0 20px"><p style="margin:0;max-width:66ch;line-height:1.6">{x["odpoved"]}</p></div>'
        f'</details>'
        for i, x in enumerate(b["polozky"]))
    return f'<div style="{SEC}">{h2(b.get("nadpis"))}{items}</div>'


def c_gallery(b, base):
    imgs = "".join(f'<div style="flex:1 1 340px"><img src="{base}{x["subor"]}" '
                   f'alt="{esc(x.get("alt",""))}" loading="lazy" style="{IMG}"></div>'
                   for x in b["polozky"])
    return f'<div style="{SEC};display:flex;flex-wrap:wrap;gap:24px">{imgs}</div>'


def c_text(b, _):
    return f'<div style="{SEC}">{h2(b.get("nadpis"))}{paras(b["text"], "max-width:66ch")}</div>'


def c_note(b, _):
    return (f'<div style="{SEC};background:{FIELD};border-radius:{R};padding:20px 24px;'
            f'font-size:.9em;line-height:1.6;color:{MUTED}">'
            + "".join(f'<p style="margin:0">{t}</p>' for t in b["text"]) + "</div>")


KOMP = {"hero": c_hero, "split": c_split, "stats": c_stats, "benefits": c_benefits,
        "table": c_table, "dose": c_dose, "faq": c_faq, "gallery": c_gallery,
        "text": c_text, "note": c_note}


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    folder = Path(sys.argv[1]).resolve()
    data = json.loads((folder / "produkt.json").read_text(encoding="utf-8"))
    base = data["obrazky_base"]
    parts = []
    for b in data["blok"]:
        fn = KOMP.get(b["typ"])
        if not fn:
            raise SystemExit(f"Komponent '{b['typ']}' nie je v inline verzii. "
                             f"Známe: {', '.join(KOMP)}")
        parts.append(fn(b, base))
    blok = f'<div style="{WRAP}">' + "".join(parts) + "</div>"
    out = folder / "blok-inline.html"
    out.write_text(blok, encoding="utf-8")

    n = len(blok)
    print(f"blok-inline.html  {n} znakov / limit {LIMIT}  → "
          f"{'OK' if n <= LIMIT else 'PREKROČENÝ LIMIT'} ({n / LIMIT * 100:.0f} %)")
    print(f"                  bez CSS súboru, bez zásahu do HTML kódov")


if __name__ == "__main__":
    main()
