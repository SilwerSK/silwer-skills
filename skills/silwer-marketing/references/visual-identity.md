# Silwer Visual Identity — Vizuálny Systém (v2.0)

Tento dokument je **zákon značky Silwer**, aktualizovaný podľa reálnej kreatívy kampaní 2026 (Hypertenzia, Berberín, GLP Plavky, MS Futbal). Každý vizuál musí použiť jeden z 3 layoutov a dodržať konštanty.

---

## 1. Tri Layouty

### Layout A — Čierny / tmavý vertikálny panel

Nástupca pôvodného „čierneho pásu". Tmavý panel na ľavej alebo pravej strane rámu.

| Atribút | Pravidlo |
|---|---|
| Orientácia | Vertikálna; horizontálna len pri 3:1 banneroch |
| Pozícia | Ľavá alebo pravá strana (nie stred, nie diagonála) |
| Šírka | 40–50 % šírky rámu |
| Farba | Čierna `#000000` alebo tmavý gradient (čierna → tmavosivá); navy `#0F1419` pri GLP1 |
| Okraj | Ostrý a rovný; jemný gradient prechod do scény je prípustný (Hypertenzia look) |
| Obsah panelu | Logo, headline (biela / červeno-čierna kombinácia), produkt(y) hero size (45–55 % výšky rámu), cenovka/badge v post-produkcii |
| Druhá strana | Scéna alebo konceptuálny objekt (napr. 3D hodvábne srdce) na svetlom/neutrálnom pozadí |

**Použitie:** produktové launche, balíčky, cenové akcie, awareness days s produktovým fokusom.

**Prompt blok (vlož do JSON promptu):**
```
Layout: SOLID BLACK VERTICAL PANEL on the [LEFT/RIGHT] side covering approximately 45% of the frame width, dark graphic layer (#000000 or subtle dark gradient), sharp vertical edge. Reference product [Name] placed in the LOWER portion of the panel — product height ~50% of total frame height, horizontally centered in the panel, perfectly upright, use reference as-is (do not modify packaging). The remaining ~55% of the frame shows [scene/conceptual object] in vivid natural colors.
```

### Layout B — Full-bleed monochromatická scéna + červené kruhy s benefitmi

| Atribút | Pravidlo |
|---|---|
| Pozadie | Celoplošná fotografia s JEDNOU dominantnou farbou (napr. červená/magenta athleisure na tele, modrá obloha) |
| Produkt | V strede, typicky **v rukách** (close-up torzo/ruky držiace fľašu), alebo hero na ploche |
| Kruhy | 3–4 polopriehľadné červené kruhy (`#D22030`, opacita ~75–85 %), rozmiestnené v rohoch/tretinách okolo produktu |
| Text v kruhoch | Krátky benefit 2–3 slová, biela, mix regular + bold („Regulácia **hmotnosti**", „Lepší **cholesterol**") — pridáva sa v post-produkcii |
| Logo | Na packshote stačí; samostatné logo len ak zostáva čistá plocha |

**Použitie:** benefitová komunikácia jedného produktu (Berberín look), IG feed / newsletter.

**Prompt blok:**
```
Layout: FULL-BLEED monochromatic scene — [color] dominates the entire frame ([subject description, e.g. woman's torso in vivid red athletic wear]), hands holding the reference product [Name] at center chest height, product perfectly upright and sharp, use reference as-is. Clean negative space in corners for graphic overlays. Vivid natural colors, premium commercial photography.
```
(Kruhy s benefitmi sa pridávajú v post-produkcii — NEgenerovať v AI.)

### Layout C — Konceptuálna metafora + červený kruh + packshot

| Atribút | Pravidlo |
|---|---|
| Scéna | Full-bleed vtipný konceptuálny nápad — vizuálna metafora témy (plavky na šnúre = chudnutie do leta; hodvábne srdce = deň hypertenzie; zberateľská lopta = MS) |
| Headline | Veľký, horný okraj, mix bold + regular („**Schudnúť** do plaviek!"), biela alebo červeno-čierna |
| Logo | `Silwer.` v hornom rohu oproti headline |
| Packshot | Vpravo/vľavo dole, sedí na **plnom červenom kruhu** (`#D22030`) alebo pred ním |
| Claim pod headline | Produkt + 2–4 slová („GLP1 Probio Aktiv — výskumom overené výsledky") |

**Použitie:** sezónne kampane, awareness days, promo s vtipom. Meta + Google bannery.

**Prompt blok:**
```
Layout: FULL-BLEED conceptual scene — [visual metaphor, e.g. red swimwear hanging on a clothesline against vivid blue summer sky], clean composition with empty space at top for headline and at [left/right] bottom for product placement, vivid saturated colors, witty premium advertising photography, one clear visual idea.
```
(Packshot + červený kruh + headline = post-produkcia.)

---

## 2. Konštanty Značky (platia pre všetky layouty)

1. **Plnofarebnosť — vždy.** Zákaz B&W, sépie, selektívnej farby, duotone.
2. **Logo `Silwer.`** — vždy s bodkou. Biele na tmavom, čierne na svetlom pozadí (GLP Plavky: biele na modrej; Hypertenzia: čierne na svetlej strane). Nikdy v inej farbe, bez efektov.
3. **Čierny matný packshot** — z produktovej referencie, nikdy nemeniť etiketu/badge/proporcie.
4. **Červená `#D22030` ako akčný akcent** — kruhy (plné aj polopriehľadné), promo badge, cenovky (biele číslo na červenej + prečiarknutá pôvodná cena), stuha/mašľa, rotovaný awareness-day text. Zelený stamp „ZNOVU NA SKLADE" pre restock.
5. **Badge „50+ OPTIMALIZOVANÉ PRE VEK"** — ružový kruh, súčasť packagingu — neopisovať v prompte.
6. **Typografia** — geometrický sans (Gotham / Montserrat / Inter). Headline mixuje **bold + regular** v jednej vete. Cenovky: biela na červenej / biela na čiernej (-20 %).
7. **Jeden vizuálny nápad na kampaň** — jedna zrozumiteľná metafora, žiadny vizuálny chaos.
8. **Prémiový fotografický look** — prirodzená textúra pleti, žiadny airbrush.

---

## 3. Farebná Paleta

### Primárne
| Rola | HEX |
|---|---|
| Čierna (panel, packshot) | `#000000` |
| Biela (logo, text) | `#FFFFFF` |
| **Silwer červená (akcent, kruhy, promo)** | `#D22030` (rozsah `#C41E2C`–`#E03040`) |

### Sekundárne akcenty (podľa kampane)
| Akcent | HEX | Kampaň |
|---|---|---|
| Vivid modrá (nebo) | `#1E6FD9` | Letné koncepty (Plavky) |
| Magenta / červený athleisure | `#C4265E` | Benefitové vizuály (Berberín) |
| Neón Pink | `#FF3AA0` | Black Friday |
| Ružová soft | `#F7D4DE` | Žena 50+, Probio Žena |
| Fialová | `#B893D9` | GLP1 pastel |
| Mint / Teal | `#5EC9B8` | Brand, Kĺby |
| SOWA dúhová | multi | výlučne SOWA partnerské posty |

> **Pravidlo:** jedna dominantná farba scény + červená ako akcent. Nemiešať viac akcentov.

### Zákazy
B&W / grayscale / sépia / selektívna farba / duotone; oversaturated neon mimo BF; blue cast na koži.

---

## 4. Camera Rotation

| Kamera + objektív | Hodí sa na |
|---|---|
| Hasselblad X2D 100C, 100mm f/2.5 | Produktové makro, prémiový portrét |
| Phase One XF IQ4, 80mm f/2.8 | Editorial, lifestyle indoor |
| Leica SL2, 90mm f/1.5 | Portréty, golden hour outdoor |
| Canon EOS R5, 85mm f/1.2L | Pohyb, šport |

Svetlá: soft window / golden hour backlight / studio rim / overcast daylight / warm tungsten.

---

## 5. Ľudia — Casting

- **Vek 50–60** (ideálne 53–58). Zakázané: pod 50, nad 65.
- Soľ-a-čierna / soľ-a-blond vlasy (nie úplne biele), pevná pleť s viditeľnými pórmi a výrazovými vráskami, aktívna postava.
- **Stredná trieda:** bežné autá (Škoda/VW/Toyota), kvalitné no neznačkové oblečenie, dostupné prostredia (park, byt, bežná kuchyňa, terasa, lesný chodník, verejné ihrisko). Nie luxus, nie chudoba.
- Aktivity ÁNO: joga, turistika, bicykel, plávanie, futbal s vnúčatami, varenie, káva, záhrada.
- Aktivity NIE: vozík, barly, nemocnica, opatrovateľ, lieky v popredí, slabé pózy.
- **Founder Martin** (biele okuliare, Silwer polo) sa NEgeneruje v AI — reálne natáčanie.

---

## 6. EFSA / SK Legislatíva

Výživové doplnky — nariadenie EÚ č. 1924/2006.

**Povolené (výber):** Vitamín D → normálne kosti/imunita; C → imunita/oxidačný stres; B6 → nervový systém/únava; Magnézium → svaly/únava; Zinok → imunita/vlasy/nechty; Omega-3 EPA+DHA → normálna funkcia srdca; Silymarín → normálna funkcia pečene. Berberín: len opisné „metabolizmus cukrov a tukov" formulácie z reálnej kampane, žiadne liečebné sľuby.

**Zakázané:** „lieči / vylieči / terapia", „zbaví choroby", „náhrada za lieky", „zaručene", menované choroby ako cieľ (cukrovka, rakovina…), „posilní imunitu" (správne: „prispieva k normálnej funkcii imunitného systému").

**Guardrail:** pred odovzdaním copy skontroluj každé zdravotné tvrdenie proti formuláciám „prispieva / podporuje / pomáha udržiavať".

---

## 7. Negatívny Prompt — Master List

**Obrázky (všetky layouty):**
```
black and white photo, grayscale, desaturated, sepia, selective color, monochrome, duotone,
sick person, wheelchair, walker, cane, caregiver, nurse, hospital, medical setting, medicine pills in foreground, blister pack,
under 50, 20-year-old, 30-year-old, 40-year-old, teenager, child, young adult, over 65, 70-year-old, 80-year-old, elderly, very old person, retiree-stereotype, frail, fully white hair, deep grandparent wrinkles, sagging skin,
luxury yacht, private jet, mansion, ballgown, designer fashion, sports car, Rolex, high-society,
working-class poverty, run-down environment, dilapidated, slum, unkempt,
plastic skin, airbrushed face, waxy skin, no pores, doll face,
cartoon, anime, 3D render, illustration, painting, CGI,
text overlay, watermark, logo rendered in image, brand name spelled out, caption, price tag rendered,
oversaturated colors, HDR look, heavy vignette, film grain, heavy noise,
tilted product, tiny product, floating product, mirrored product, altered product label
```
**+ pri Layoute A pridaj:** `distorted black panel, transparent black panel, black panel with reflections, multiple panels, diagonal panel, curved black shape`
**+ pri Layoute B pridaj:** `cluttered background, multiple colors competing, busy composition, red circles rendered in image`
**+ pri Layoute C pridaj:** `crowded scene, multiple visual ideas, red circle rendered in image`

**Video:**
```
black and white, sepia, desaturated, shaky camera, hospital, pills, under 50, 30-year-old, 40-year-old, teenager, over 65, elderly, frail, fully white hair, luxury yacht, mansion, designer fashion, sports car, working-class poverty, blurry artifacts, flickering, plastic skin, cartoon, 3D render, text overlay during playback, warping
```
**+ pri Layoute A (video):** `distorted panel, moving panel, panel with parallax, panel with motion blur`

---

## 8. Rýchly Brand-Check

✅ Layout A/B/C zvolený a konzistentný naprieč variantami kampane
✅ Plnofarebný obraz, jedna dominantná farba + červený akcent
✅ Logo `Silwer.` s bodkou má miesto (post-produkcia)
✅ Packshot z referencie, upright, nemenený
✅ Subjekt 50–60, stredná trieda, natural skin
✅ Jeden vizuálny nápad
✅ Negatívny prompt = master list + layout dodatok
✅ Copy: vykanie s malým písmenom, EFSA-safe
