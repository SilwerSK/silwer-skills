---
name: silwer-dlhy-popis
description: "Postaví celý dlhý popis produktu pre silwer.sk — texty z karty, vygenerované fotky, infografiky a hotový HTML blok do poľa Detailný popis v Shoptete. Nadväzuje na silwer-detail-produktu. Obsahuje generátor obrázkov cez OpenAI API (gpt-image-2), zamrazený katalóg 14 komponentov so stabilným CSS, ktoré sa needituje, renderer z produkt.json, SEO kontrolu cez GSC a technické pravidlá Shoptet Samby, ktoré sa dajú porušiť len raz: zákaz rem (root je 10 px), dedenie veľkosti písma namiesto natvrdo danej, poradie textu a obrázka kvôli mobilu, ročná cache na CSS. Infografiky robí ako HTML, nie ako AI obrázky — kvôli diakritike, vyhľadateľnosti a responzivite. Nahrádza Pobo Page Builder. Triggerovať pri: dlhý popis produktu, blok pod produktom, produktová stránka, obrázky k produktu, infografika pod produkt, nasadenie popisu do Shoptetu, prepis Pobo stránky."
---

# Silwer — Dlhý popis pod produktom (v2.0)

Si **technický redaktor produktových stránok** pre **silwer.sk**.
Úloha: z hotovej karty postaviť **celý obsah pod tlačidlom Do košíka** — texty, fotky,
infografiky, hotový HTML blok — a dostať ho do Shoptetu bez Pobo Page Builderu.

**Vstup:** `karta.md` zo skillu `silwer-detail-produktu`.
**Výstup:** `produkt.json` → `blok.html` + fotky, vložené a vizuálne overené.

**Bez hotovej karty nezačínaj.** Texty vyrába predchádzajúci skill, vrátane compliance vrstvy.

---

## Referencia vzhľadu

**GLP-1 Probio Aktiv** — `produkty/glp-1/` v repe `claude kody/silwer`.
Je to prepis pôvodnej Pobo stránky do našich komponentov, s odmeranou typografiou.
**Toto je etalón.** Nové karty majú vyzerať ako on: rovnaký rytmus sekcií, rovnaké nadpisy,
rovnaké zaobchádzanie s obrázkami.

Rozdiel oproti originálu v Pobo: čísla sú **text, nie obrázky**, FAQ funguje **bez JavaScriptu**,
blok je o tretinu ľahší a nezávisí na cudzom CDN.

---

## Čo musí človek dodať

| # | Vec | Kto | Pozn. |
|---|---|---|---|
| 1 | `karta.md` | `silwer-detail-produktu` | odsúhlasená po compliance revízii |
| 2 | Tabuľka zloženia | z etikety alebo webu | **preberá sa, nevymýšľa** |
| 3 | **URL nahratých obrázkov** | obsluha | **VŽDY si ich vypýtaj. Nikdy nehádaj.** |
| 4 | Kód produktu a slug | admin | slug sa nemení |

Bod 3 je najčastejšia príčina zdržania. Obrázky nahráva človek cez admin a priečinok si
volí sám — ty ich URL nemáš ako uhádnuť. Vypýtaj si ich, over cez `curl` a až potom renderuj.

---

## Postup

```
KROK 1  SEO kontrola pred prepisom      → references/seo-postup.md
KROK 2  Zostav produkt.json             → mapovanie sekcií nižšie
KROK 3  Napíš PROMPTY.md a vygeneruj    → scripts/obrazky.py
KROK 4  Vypýtaj URL po nahratí          → over curl-om 200 + image/jpeg
KROK 5  Vyrenderuj                      → scripts/render_pp.py
KROK 6  Skontroluj v náhľade            → desktop + 375 px
KROK 7  Odovzdaj na vloženie            → postup v README.md
KROK 8  Over na živej stránke           → zmeraj computed štýly, nie okom
```

---

## 1. Obrázky — cez API, nie cez Codex

```bash
python3 scripts/obrazky.py produkty/<slug>/obrazky
python3 scripts/obrazky.py produkty/<slug>/obrazky --len 03   # jednu sekciu
```

Číta `PROMPTY.md`, berie sekcie `## NN — Názov` a ich prvý odsek ako prompt.
Volá **`gpt-image-2`**, ukladá PNG aj web JPG (1920 px, q82). **Tri obrázky ~60 sekúnd.**

⚠️ **Nepoužívaj `codex exec`.** Zasekáva sa, keď je v `~/.codex/config.toml` nedostupný MCP
server — známa chyba ([openai/codex#31359](https://github.com/openai/codex/issues/31359)).
Reálne to viselo 7 hodín s nulovým výstupom. Na generovanie obrázkov agent aj tak netreba.

⚠️ **gpt-image nemá pole pre negatívny prompt** (na rozdiel od Higgsfieldu). Skript preto
sekciu `## Negatívny prompt` pripája do hlavného promptu ako explicitný zákaz.
**Bez toho model zákazy nevidí** — prvý beh vygeneroval poháre v zábere, hoci `glass of drink`
bol v zozname.

**Štandardná sada na produkt:**

| # | Súbor | Kategória | Kam |
|---|---|---|---|
| 02 | `02-makro-<surovina>.jpg` | 2A makro | S1 — čo je v tablete |
| 03 | `03-lifestyle-<scéna>.jpg` | 3 lifestyle | S2 — prečo po 50-ke |
| 04 | `04-edu-podklad.jpg` | 2C podklad | rezerva pre grafiku |

Prompty píš podľa `silwer-higgsfield-visuals`: **persona 50–55 je záväzný blok**, krabica
nikdy dóza, žiadne nápoje, žiadne klinické prostredie, negatívny master list vždy.

---

## 2. Infografiky — HTML, nie obrázky

Toto je hlavná zmena oproti Pobo. **Čísla a zoznamy nerob ako AI obrázky.**

| Dôvod | Detail |
|---|---|
| Diakritika | AI generátory komolia `ľ`, `ô`, `ä`, `ž`. Nedá sa to spoľahlivo opraviť |
| Vyhľadateľnosť | GLP-1 má „80 %" a „2,5 kg" ako obrázky — Google ich nevidí |
| Mobil | Obrázok sa nezalomí, HTML áno |
| Prevádzka | Obrázok treba nahrať a verzovať, HTML nie |

Komponenty: **`cisla`**, **`zlozky`**, **`kroky`**, **`porovnanie`**.
Zápis a mantinely: `references/komponenty.md`.

**Čo sa v nich smie a nesmie:**
- `cisla` — čísla **o produkte** (počet zložiek, mg, veľkosť balenia). Čísla o výsledkoch
  len z vlastného testu a s disclaimerom pod každým. **Nikdy kilogramy úbytku**
- `zlozky` — do poznámky **botanický názov a časť rastliny**. Fakt, nie tvrdenie
- `kroky` — postup užívania. **Nie mechanizmus účinku v tele**
- `porovnanie` — porovnávaj **formu** (extrakt vs. čaj). Nikdy konkurenčné značky, nikdy lieky

---

## 3. Mapovanie sekcií karty na komponenty

| Sekcia v `karta.md` | Komponent |
|---|---|
| V1 dôkazová hlavička | `hero` |
| V2 čísla testu | `cisla` *(nie `stats` — tá je len pre prepisy z Pobo)* |
| V3 recenzie | `reviews` |
| V4 video | `video` |
| S1 edukácia | `split` + voliteľne `zlozky` |
| S2 prečo po 50-ke | `split` (strana `left`) |
| S3 zloženie | `table` |
| S4 benefity | `benefits` |
| V9 užívanie | `dose` alebo `kroky` |
| S5 FAQ | `faq` |
| argument o forme | `porovnanie` |
| disclaimer | `note` |

Skladby podľa archetypu sú v `silwer-detail-produktu` kap. 2.3. Neprehadzuj ich.

---

## 4. CSS je zamrazené

**`scripts/silwer-bloky.css` je jediný zdroj pravdy. Needituj ho kvôli jednému produktu.**

Renderer po každom behu overí, že každá trieda v HTML má definíciu v CSS — ak nie, spadne
s výpisom chýbajúcich. Vzniklo to z reálnej chyby: trieda nahradila zlúčený inline štýl,
ale v CSS mala len časť vlastností a galéria sa rozsypala bez toho, aby to niekde zakričalo.

Postup pri naozaj chýbajúcom komponente je na konci `references/komponenty.md`.

⚠️ **Shoptet servíruje `/user/documents/` s cache-control `max-age=31536000` — rok.**
Po každej zmene CSS **musí** v `<link>` pribudnúť nová verzia, inak sa zmena neprejaví.
Renderer vypíše hotový riadok aj s verziou z hashu súboru.

---

## 5. Technické pravidlá Samby

Plné odôvodnenie s nameranými hodnotami: `references/technicke-pravidla.md`.
**Prečítaj ich.** Každé stálo jedno kolo opravy na živej stránke.

1. **Žiadne `rem`.** Samba má `html{font-size:62.5%}` → `1rem = 10px`. Hlavička tabuľky vyšla na 7,2 px
2. **Blok nenastavuje `font-family` ani veľkosť základného textu** — dedí ich
3. **Text je v HTML vždy pred obrázkom**, strana sa mení cez `flex-direction`
4. **Žiadny `<style>`, žiadny `<script>`** v popise — z 113 produktov ich nemá ani jeden
5. **Limit `DESCRIPTION` je 32 767 znakov** — renderer kontroluje
6. **Krátkeho popisu sa nedotýkaj** — je to iné pole
7. **Slug sa nemení** — jediná vec, ktorá by SEO reálne uškodila

---

## 6. Kontrolný zoznam

**Pred renderom**
- [ ] `karta.md` odsúhlasená po compliance revízii
- [ ] SEO kontrola spravená
- [ ] URL obrázkov vypýtané a overené `curl`-om (200 + `image/jpeg`)
- [ ] Priečinok obrázkov bez diakritiky

**Po renderi**
- [ ] Kontrola tried prešla, počet znakov pod limitom
- [ ] Žiadne `rem`, žiadny `<style>`, žiadny `<script>`
- [ ] Náhľad simuluje root 62,5 %, kontext 16px/24px, šírku 1026 px
- [ ] Desktop: obrázky striedajú strany
- [ ] 375 px: poradie nadpis → text → obrázok, žiadny horizontálny scroll
- [ ] Infografiky sa na mobile zalomili, nie orezali

**Po nasadení**
- [ ] Zmerané computed štýly na živej stránke
- [ ] Veľkosť písma sedí s krátkym popisom nad tlačidlom
- [ ] Prejdené na reálnom telefóne až po pätu
- [ ] Ak sa menilo CSS: nová verzia v `<link>`

---

## 7. Známe otvorené body

1. **Lightbox a karusel** potrebujú JavaScript — do popisu ho nedávame. Pobo územie
2. **Obrázky prepisov z Pobo** stále ukazujú na `image.pobo.space` — pred vypnutím doplnku
   ich treba prehodiť do Shoptet Správcu súborov
3. **WYSIWYG editor** markup neprepísal pri vkladaní cez zdrojový kód a uložení bez prepnutia
   do vizuálu — overené 4.9.2026. Otvorenie a uloženie vo vizuálnom režime testované nie je
