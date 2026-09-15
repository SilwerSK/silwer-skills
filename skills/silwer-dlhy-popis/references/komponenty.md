---
title: "Katalóg komponentov — zamrazená podoba"
date: "2026-09-15"
verzia: "1.0"
project: "Silwer / silwer.sk"
status: frozen
tags: [silwer, komponenty, css, kontrakt]
---

# Katalóg komponentov

**Toto je kontrakt medzi `produkt.json` a `silwer-bloky.css`.**
CSS je **zamrazené**. Nepíš vlastné triedy, nepridávaj inline štýly, needituj CSS
kvôli jednému produktu. Ak komponent chýba, je to zmena kontraktu — viď koniec dokumentu.

Renderer po každom behu overí, že každá trieda v HTML má definíciu v CSS. Ak nie, spadne.

---

## Obsahové komponenty

### `split` — text a obrázok vedľa seba
```jsonc
{ "typ":"split", "strana":"left|right", "obrazok":"03-lifestyle.jpg", "alt":"…",
  "nadpis":"…", "text":["odsek","odsek"] }
```
Základný stavebný prvok edukačných sekcií. **Strany striedaj** — prvý `right`, druhý `left`.
Text je v HTML vždy pred obrázkom, strana sa mení smerom flexu (na mobile tak vyjde
nadpis → text → obrázok a dva susedné splity nedajú dva obrázky pod sebou).

### `table` — tabuľka zloženia
```jsonc
{ "typ":"table", "nadpis":"Zloženie", "hlavicka":["…","…","…"],
  "riadky":[{"bunky":["…","…","…"]}], "legenda":["* …","** …"], "text":["…"] }
```
Tabuľka sa **preberá z etikety alebo z webu, nikdy nevymýšľa.** Legenda ku každej
použitej hviezdičke je povinná. Párne riadky majú sivý podklad.

### `benefits` — odrážky so zeleným háčikom
```jsonc
{ "typ":"benefits", "nadpis":"…", "polozky":["…"] }
```
Poradie podľa skillu `silwer-detail-produktu`: účinky → edukácia → zloženie → užívanie.

### `dose` — dávkovací box
```jsonc
{ "typ":"dose", "nadpis":"Ako a kedy užívať",
  "bunky":[{"label":"Koľko","value":"…"}], "text":["…"] }
```
Tri bunky: Koľko / Kedy / Ako dlho. Na mobile pod seba.

### `faq` — rozbaľovacie otázky
```jsonc
{ "typ":"faq", "nadpis":"Časté otázky", "polozky":[{"otazka":"…","odpoved":"…"}] }
```
Natívny `<details>` — **funguje aj keby JavaScript nedobehol**, na rozdiel od Pobo.
Prvá otázka otvorená. Šípka sa pri otvorení otočí.

### `note` — povinný disclaimer
```jsonc
{ "typ":"note", "text":["Výživový doplnok. Nenahrádza pestrú stravu…"] }
```
Na konci každého doplnku. Bez výnimky.

### `hero`, `text`, `gallery`, `stats`
```jsonc
{ "typ":"hero",    "nadpis":"…", "podnadpis":"…" }
{ "typ":"text",    "nadpis":"…", "text":["…"] }
{ "typ":"gallery", "polozky":[{"subor":"05-x.jpg","alt":"…"}] }   // 1 obrázok = 600 px na stred
{ "typ":"stats",   "nadpis":"…", "polozky":[{"cislo":"…","popis":"…","disclaimer":"…"}] }
```

---

## Infografické komponenty

**Sú to HTML, nie obrázky. Zámerne.** AI generátory komolia slovenskú diakritiku,
obrázok sa nedá vyhľadať ani preložiť, na mobile sa nezalomí a musí sa nahrávať zvlášť.
GLP-1 má čísla „80 %" a „2,5 kg" ako obrázky — presne preto ich Google nevidí.

### `cisla` — číselné karty
```jsonc
{ "typ":"cisla", "nadpis":"…",
  "polozky":[{"hodnota":"250 mg","popis":"celkové množstvo extraktov","pozn":"na tabletu"}] }
```
Náhrada Pobo widgetu `advantages-four`. **Používaj len čísla o produkte** — počet zložiek,
množstvá, veľkosť balenia. Čísla o výsledkoch smú byť len z vlastného testu a s disclaimerom
pod každým (a **nikdy nie kilogramy úbytku** — čl. 12 b nariadenia 1924/2006).

### `zlozky` — mriežka zložiek
```jsonc
{ "typ":"zlozky", "nadpis":"…", "text":["…"],
  "polozky":[{"nazov":"Valeriána lekárska","pozn":"Valeriana officinalis · koreň","mnozstvo":"40 mg"}] }
```
Názov vľavo, množstvo vpravo červeným, poznámka drobným pod názvom.
Do `pozn` patrí **botanický názov a časť rastliny** — je to fakt, nie tvrdenie, a je to
informácia, ktorú konkurencia väčšinou neuvádza.

### `kroky` — číslované kroky
```jsonc
{ "typ":"kroky", "nadpis":"…", "polozky":[{"nadpis":"…","text":"…"}] }
```
Čísla kreslí CSS counter, v HTML nie sú. Použi na postup užívania alebo zaradenie do režimu.
**Nie na „ako to funguje v tele"** — to je mechanizmus účinku a ten sa tvrdiť nesmie.

### `porovnanie` — dva stĺpce proti sebe
```jsonc
{ "typ":"porovnanie", "nadpis":"…", "stlpce":[
  {"nadpis":"Extrakt v tablete","zvyraznene":true,"polozky":["…"]},
  {"nadpis":"Sypaná zmes","slabsie":true,"polozky":["…"]}] }
```
`zvyraznene` dá hrubší čierny rám, `slabsie` prehodí zelené háčiky na sivé krížiky.
**Porovnávaj formu, nie konkurenčné značky a nikdy nie lieky.**

---

## Čo komponenty NEROBIA

| Chcem | Prečo to tu nie je |
|---|---|
| Lightbox v galérii | Potrebuje JavaScript. Do popisu `<script>` nedávame — z 113 produktov ho nemá ani jeden, správanie editora je neoverené |
| Karusel, slider | To isté |
| Hover animácie na obrázkoch | Dá sa doplniť, ale zatiaľ nebolo treba. Zmena kontraktu |
| Vlastné farby pre jeden produkt | Zámerne. Jednotný vzhľad naprieč katalógom je hodnota |

---

## Keď komponent naozaj chýba

1. **Over, či to nejde existujúcimi.** Väčšina nápadov je `cisla`, `zlozky` alebo `porovnanie` inak pomenovaná.
2. Ak naozaj chýba: doplň triedu do `scripts/silwer-bloky.css` **a** renderer do `scripts/render_pp.py`.
3. **Zvýš verziu v hlavičke CSS** a nahraj súbor znova.
4. **Uprav `<link>` v Záhlaví na novú verziu** — renderer ju vypíše sám.
   Bez toho sa zmena neprejaví: Shoptet servíruje `/user/documents/` s **ročnou cache**.
5. Zapíš zmenu sem aj do `CHANGELOG.md` projektu.

⚠️ **Nikdy nemeň existujúce triedy kvôli jednému produktu.** Rozídu sa s tým, čo je nasadené
na ostatných, a nikto si to nevšimne — CSS je jedno, produktov je 113.
