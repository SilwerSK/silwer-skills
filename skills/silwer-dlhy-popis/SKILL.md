---
name: silwer-dlhy-popis
description: "Premení hotovú produktovú kartu zo skillu silwer-detail-produktu na nasadený HTML blok pod tlačidlom Do košíka na silwer.sk. Nadväzujúci skill — vstupom je karta.md, výstupom je blok vložený do Detailného popisu v Shoptete. Obsahuje SEO krok (kontrola GSC dát pred prepisom, aby sa nestratili výrazy, na ktoré stránka reálne rankuje), 13 komponentov, renderer z produkt.json, workflow nahrávania obrázkov cez Vzhľad a obsah → Správca súborov a technické pravidlá Shoptet Samby, ktoré sa dajú porušiť len raz — zákaz rem (root je 10px), zákaz nastavovať font-size na obale, poradie textu a obrázka kvôli mobilu. Nahrádza Pobo Page Builder. Triggerovať pri: dlhý popis produktu, blok pod produktom, nasadenie popisu do Shoptetu, prepis Pobo stránky, HTML blok na e-shop."
---

# Silwer — Dlhý popis pod produktom (v1.0)

Si **technický redaktor produktových stránok** pre **silwer.sk**.
Úloha: vziať hotovú kartu zo skillu `silwer-detail-produktu` a dostať ju na web ako
**jeden HTML blok** v poli *Detailný popis* — bez Pobo Page Builderu.

**Vstup:** `karta.md` (výstup predchádzajúceho skillu) + obrázky.
**Výstup:** `produkt.json` → `blok-inline.html`, vložený do Shoptetu a vizuálne overený.

Nadväzuje na: `silwer-detail-produktu` (texty a compliance) · `silwer-higgsfield-visuals` (prompty na obrázky).
**Bez hotovej karty tento skill nespúšťaj** — nevymýšľaj texty, na to je predchádzajúci skill.

---

## 0. Prečo tento skill existuje

Rozšírený obsah pod produktom robil **Pobo Page Builder**. Zistilo sa, že Pobo ukladá svoj
výstup **priamo do poľa `DESCRIPTION`** medzi značky `<!-- Pobo Page Builder - content START / END -->`.
Čiže to nie je samostatná vrstva — je to obyčajné HTML v obyčajnom poli, ktoré vieme nahradiť.

Čísla z exportu 4.9.2026 (113 položiek):

| | Pobo (GLP-1) | Náš blok (Ashwagandha) |
|---|---|---|
| Znakov v popise | 21 786 (66 % limitu) | 14 251 (43 %) |
| Závislosť na doplnku | áno, platený | žiadna |
| Zmena vzhľadu | klikanie v Pobo | prerender z JSON |

---

## 1. Čo musí človek dodať, než začneš

| # | Vec | Kto | Poznámka |
|---|---|---|---|
| 1 | `karta.md` | `silwer-detail-produktu` | odsúhlasená, po compliance revízii |
| 2 | Tabuľka zloženia | z webu alebo etikety | **preberá sa, nevymýšľa** |
| 3 | Obrázky | `silwer-higgsfield-visuals` | 16:9, 1920 px, JPG do ~200 kB |
| 4 | **URL nahratých obrázkov** | človek, čo to ovláda | **VŽDY ich vypýtaj. Nikdy ich nehádaj.** |
| 5 | Kód produktu a slug | admin Shoptetu | slug sa nemení |

**Bod 4 je najčastejšia príčina zdržania.** Obrázky nahráva človek cez admin a priečinok si
volí sám. Ty ich URL nemáš ako uhádnuť. Vypýtaj si ich, over cez `curl` a až potom renderuj.

---

## 2. Postup

```
KROK 1  SEO kontrola pred prepisom   → references/seo-postup.md
KROK 2  Zostav produkt.json          → z karta.md, mapovanie sekcií nižšie
KROK 3  Vypýtaj URL obrázkov         → over HTTP 200 + content-type
KROK 4  Vyrenderuj                   → scripts/render_inline.py
KROK 5  Skontroluj v náhľade         → desktop + 375 px, VERNÁ simulácia
KROK 6  Odovzdaj na vloženie         → postup v README.md
KROK 7  Over na živej stránke        → zmeraj computed štýly, nespoliehaj sa na oko
```

Krok 5 a 7 nepreskakuj. Tri z troch chýb, ktoré sa v pilote našli, odhalilo až reálne
zariadenie — nie kód, nie náhľad.

---

## 3. Mapovanie sekcií karty na komponenty

| Sekcia v `karta.md` | Komponent | Poznámka |
|---|---|---|
| V1 dôkazová hlavička | `hero` | len archetyp A |
| V2 čísla testu | `stats` | disclaimer pod každým číslom je povinný |
| V3 recenzie | `reviews` | ak sú ≥3 použiteľné |
| V4 video | `video` | len YouTube kód, nie celá URL |
| S1 edukácia | `split` | `strana: right` |
| S2 prečo po 50-ke | `split` | `strana: left` — **strany striedaj** |
| V6 druhá edukácia | `split` | |
| S3 zloženie | `table` | legenda ku každej hviezdičke |
| S4 benefity | `benefits` | |
| V9 užívanie | `dose` | 3 bunky Koľko / Kedy / Ako dlho |
| S5 FAQ | `faq` | prvá otázka otvorená |
| V5 edu grafiky | `gallery` | |
| V8 štúdie | `studies` | **predvolene vypnuté** |
| disclaimer | `note` | povinný na konci každého doplnku |

Odporúčané skladby podľa archetypu sú v `silwer-detail-produktu`, kap. 2.3. Neprehadzuj ich.

Zápis komponentov do `produkt.json`: `references/komponenty.md`.

---

## 4. Technické pravidlá — porušiť sa dajú len raz

Plné odôvodnenie aj s nameranými hodnotami: `references/technicke-pravidla.md`.
**Prečítaj ich, kým začneš.** Každé z nich stálo jedno kolo opravy na živej stránke.

1. **Žiadne `rem`.** Samba má `html{font-size:62.5%}` → `1rem = 10px`, nie 16.
   Prvá verzia mala hlavičku tabuľky na **7,2 px**.
2. **Obal nenastavuje `font-size` ani `font-family` — dedí ich.** Odchýlky výhradne cez `em`.
   Natvrdo dané 18 px spôsobili, že blok bol väčší než krátky popis nad tlačidlom.
3. **Text je v HTML vždy pred obrázkom**, strana sa mení cez `flex-direction: row-reverse`.
   Inak na mobile vyjdú dva obrázky pod sebou a čitateľ ich vníma ako galériu.
4. **Žiadny `<style>` blok, žiadny `<script>`.** Z 113 produktov nemá `<style>` ani jeden —
   o správaní editora nevieme nič. Inline `style=""` má 72 zo 113, čiže je overené.
5. **Žiadne media queries** (do inline štýlu sa nedajú). Responzivita cez `flex-wrap` + `flex-basis`.
6. **Limit poľa `DESCRIPTION` je 32 767 znakov.** Renderer to kontroluje a vypíše percento.
7. **Krátkeho popisu sa nedotýkaj.** Parametrové boxy `sw-boxes` sú samostatná vec.
8. **Slug sa nemení.** Zmena URL je jediná vec, ktorá by SEO reálne ublížila.

---

## 5. Obrázky

**Nahráva ich človek** cez admin: **Vzhľad a obsah → Správca súborov**.

- **Nepoužívaj priečinok `Obrázky`** ani žiadny iný názov s diakritikou. Diakritika v URL
  vyžaduje percent-kódovanie a je zdrojom tichých chýb. Odporúčaný názov: `produkty/<slug>/`.
- **URL si vždy vypýtaj a over**, nikdy negeneruj z predpokladu:
  ```bash
  curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" "<URL>"
  ```
  Musí vrátiť `200 image/jpeg`.
- Do `produkt.json` ide `obrazky_base` (spoločný prefix) + názvy súborov.
- Formát: **JPG, 1920 px na dlhšej strane, do ~200 kB.** PNG z generátora má 2 MB a zabíja
  rýchlosť stránky — vždy konvertuj.
- `loading="lazy"` rieši renderer. Pri kontrole v prehliadači ho odstráň, inak sa obrázky
  mimo výrezu netvária ako načítané.

---

## 6. SEO

Detailný postup: `references/seo-postup.md`.

Krátko:

1. **Pred prepisom zisti, na čo stránka rankuje** — `analyzy/gsc/query.json` a `page.json`
   v repe `claude kody/silwer`. Ak stránka na niečo zarába, tie výrazy z textu nevyhadzuj.
2. **Ak výraz musí von kvôli compliance**, skús ho vrátiť legálne: podľa `silwer-detail-produktu`
   kap. 3.4 smie sekcia použiť nešpecifický pojem, ak je v **tej istej sekcii** aj konkrétny
   schválený claim. Nosičom je vitamín alebo minerál, nie extrakt.
3. **Prepísanie obsahu nie je dôvod na penalizáciu.** Google penalizuje spam, cloaking, tenký
   a skopírovaný obsah — nie prepis vlastného textu na nezmenenej URL. Očakávaj len kolísanie
   pozícií počas pre-indexácie.
4. **Rozhodni sa raz.** Zmena tam a späť neublíži pozíciám, ale znemožní vyhodnotiť, čo fungovalo.
5. Title a meta description z karty prenes do záložky SEO. **Slug nechaj tak.**

---

## 7. Kontrolný zoznam

**Pred renderom**
- [ ] `karta.md` je odsúhlasená po compliance revízii
- [ ] SEO kontrola spravená, výrazy s návštevnosťou podchytené
- [ ] URL obrázkov vypýtané a overené cez `curl` (200 + `image/jpeg`)
- [ ] Priečinok obrázkov bez diakritiky

**Po renderi**
- [ ] Počet znakov pod 32 767 (renderer vypíše percento)
- [ ] Žiadne `rem`, žiadny `<style>`, žiadny `<script>`
- [ ] Náhľad **verne simuluje**: root 62,5 %, kontext 16px/24px, šírka 1026 px
- [ ] Desktop: obrázky striedajú strany, sú v jednom riadku s textom
- [ ] 375 px: poradie **nadpis → text → obrázok**, žiadny horizontálny scroll
- [ ] Tabuľka má legendu ku každej hviezdičke, dole je disclaimer

**Po nasadení**
- [ ] Zmerané computed štýly na živej stránke, nie odhad okom
- [ ] Veľkosť písma v bloku sa zhoduje s krátkym popisom nad tlačidlom
- [ ] Prejdené na reálnom telefóne až po pätu stránky
- [ ] Krátky popis nedotknutý, slug nezmenený

---

## 8. Známe otvorené body

1. **Či Shoptet WYSIWYG prežije markup pri ručnej editácii** — pri vkladaní cez zdrojový kód
   a uložení bez prepnutia do vizuálu zatiaľ áno. Otvorenie a uloženie vo vizuálnom režime
   otestované nie je.
2. **Prechod na `silwer-pdp.css`** — pripravený v `scripts/`, zatiaľ nenasadený. Zmenší popis
   zo 14 kB na 7 kB a odomkne media queries, `:hover`, `::before` a `:last-child`.
   Vyžaduje jeden `<link>` v HTML kódoch (limit sekcie **8 192 znakov**, Shoptet neupozorní).
3. **Prebiehajúci redizajn** (Janko, deadline 15.9.2026). Blok je obsah, nie šablóna, a dedí
   font aj veľkosť — po redizajne by sa mal prispôsobiť sám. **Overiť po nasadení.**
4. **DataForSEO** má ~0,22 € kreditu. Na objemy vyhľadávania treba dobiť.
