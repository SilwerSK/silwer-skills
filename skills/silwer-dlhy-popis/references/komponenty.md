---
title: "Blok pod produktom — komponenty"
date: "2026-09-04"
project: "Silwer / silwer.sk"
status: active
tags: [silwer, shoptet, komponenty, design-system, pdp]
---

# Komponenty bloku pod produktom

Blok pod tlačidlom *Do košíka* je **jeden HTML blok v poli `DESCRIPTION`**. Nahrádza Pobo Page Builder.
Markup generuje `render.py` z `produkt.json`. **Nikdy nepíš HTML ručne** — inak sa rozíde s CSS.

- CSS: `silwer-pdp.css` → nasadené raz na Shoptet CDN, linkované z Vzhľad → HTML kódy → Záhlavie
- Renderer: `render.py <priecinok-produktu>`
- Limit poľa: **32 767 znakov** (`render.py` to kontroluje a vypíše percento)

```bash
python3 render.py ../ashwagandha                    # produkčné URL obrázkov
python3 render.py ../ashwagandha --lokalne-obrazky  # náhľad ťahá z obrazky/
```

## Vertikálny rytmus

60 px medzi sekciami (1024 px → 48, 640 px → 40). Rieši to CSS, do markupu sa medzery nepíšu.

## Mapovanie na sekcie skillu `silwer-detail-produktu`

| Sekcia skillu | Komponent | Pozn. |
|---|---|---|
| V1 dôkazová hlavička | `hero` | len archetyp A |
| V2 čísla testu | `stats` | len A; disclaimer povinný pod každým číslom |
| V3 recenzie | `reviews` | ak sú ≥3 použiteľné |
| V4 video | `video` | YouTube kód, nie celá URL |
| S1 edukácia | `split` | obrázok vpravo |
| S2 po 50-ke | `split` | obrázok vľavo — striedaj strany |
| V6 druhá edukácia | `split` | |
| S3 zloženie | `table` | tabuľka sa **preberá**, nevymýšľa |
| S4 benefity | `benefits` | |
| V9 užívanie | `dose` | 3 bunky Koľko / Kedy / Ako dlho |
| S5 FAQ | `faq` | `<details>`, prvá otvorená |
| V5 edu grafiky | `gallery` | 1 alebo 2 stĺpce |
| V8 štúdie | `studies` | **predvolene vypnuté** |
| disclaimer | `note` | povinný na konci každého doplnku |

## Zápis v `produkt.json`

```jsonc
{ "typ": "hero",     "nadpis": "…", "podnadpis": "…" }
{ "typ": "split",    "strana": "left|right", "obrazok": "03-x.png", "alt": "…",
                     "nadpis": "…", "text": ["odsek", "odsek"] }
{ "typ": "stats",    "nadpis": "…", "polozky": [{"cislo":"80 %","popis":"…","disclaimer":"…"}] }
{ "typ": "benefits", "nadpis": "…", "polozky": ["…"] }
{ "typ": "table",    "nadpis": "Zloženie", "hlavicka": ["…","…","…"],
                     "riadky": [{"bunky":["…","…","…"], "sub": true}],
                     "legenda": ["* …","** …"], "text": ["…"] }
{ "typ": "dose",     "nadpis": "…", "bunky": [{"label":"Koľko","value":"…"}], "text": ["…"] }
{ "typ": "faq",      "nadpis": "…", "polozky": [{"otazka":"…","odpoved":"…"}] }
{ "typ": "gallery",  "polozky": [{"subor":"05-x.png","alt":"…"}] }
{ "typ": "video",    "kod": "dQw4w9WgXcQ", "titulok": "…" }
{ "typ": "reviews",  "nadpis": "…", "polozky": [{"text":"…","meno":"Jana K., 54"}] }
{ "typ": "studies",  "nadpis": "…", "polozky": [{"popis":"…","url":"https://…"}] }
{ "typ": "text",     "nadpis": "…", "text": ["…"] }
{ "typ": "note",     "text": ["Výživový doplnok. Nenahrádza pestrú stravu…"] }
```

V `text` a v benefitoch je povolené inline HTML — `<strong>`, `<em>`, `<a>`. Nič iné nepridávaj.

## Prečo je CSS mimo bloku

1. **Limit 32 767 znakov na popis.** CSS má 7,5 kB — v 113 popisoch by to bolo 850 kB navyše.
2. **Redizajn.** Blok dedí font zo šablóny (`font-family: inherit`) a akcent berie z `--color-secondary`
   s fallbackom `#e60f0f`. Po nasadení Museo Sans a `#D40000` sa prispôsobí sám.
3. **Jedna zmena, 113 produktov.** Úprava vzhľadu = úprava `silwer-pdp.css`, nie 113 importov.

⚠️ **Riziko:** `<link>` na `silwer-pdp.css` žije v admin sekcii HTML kódy. Ak ju niekto prepíše
(napr. pri redizajne), bloky ostanú neoštýlované. Pri zásahu do HTML kódov to vždy skontroluj.

## Split — prečo je text v HTML vždy pred obrázkom

`strana: left|right` sa **neprepína poradím v HTML, ale cez `flex-direction: row-reverse`.**
Text je v DOM vždy prvý.

Dôvod: pri zalomení do jedného stĺpca sa poradie riadi DOM-om, nie smerom flexu. Keby bol
obrázok v HTML prvý, dva susedné splity by na mobile dali **dva obrázky hneď pod sebou** a
čitateľ ich vníma ako galériu, nie ako dve sekcie. Takto vyjde na mobile vždy
**nadpis → text → obrázok** a každý obrázok uzatvára svoju sekciu.

Overené 4.9.2026 na živej stránke (Jarov screenshot z mobilu) a v náhľade na 375 px.

## Veľkosti písma — dve pravidlá, ktoré sa nesmú porušiť

1. **Žiadne `rem`.** Samba má `html{font-size:62.5%}` → `1rem = 10px`, nie 16. Prvá verzia
   bloku mala hlavičku tabuľky na 7,2 px a otázku vo FAQ na 10,8 px.
2. **Obal nenastavuje `font-size` — dedí ju zo šablóny.** Odchýlky výhradne cez `em`.
   Druhá verzia mala natvrdo 18 px, kým krátky popis nad tlačidlom má 16 px, a stránka
   pri scrollovaní pôsobila ako dva zlepené kusy.

Namerané na živej stránke 4.9.2026: krátky popis `16px / 24px`, kontext `.basic-description`
`16px / 24px`, root `10px`, šírka stĺpca `1026px`. Po redizajne sa blok prispôsobí sám.

⚠️ `em` sa pri vnorení násobí — nikdy nedávaj em-prvok do em-prvku.

## Mantinely

- Bez inline `style=""`. Bez `<style>` a `<script>` v popise — WYSIWYG editor ich môže zhltnúť.
- Obrázky vždy s `alt` a `loading="lazy"`.
- Obrázky do popisových blokov: **16:9, 1920×1080**; galéria 1:1 min. 2048 px.
- Nadpis sekcie je `<h2>`. `<h1>` patrí názvu produktu, ten rieši šablóna.
- Claim v obrázku podlieha rovnakým pravidlám ako text (`silwer-detail-produktu`, kap. 3).
