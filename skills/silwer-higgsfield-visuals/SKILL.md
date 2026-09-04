---
name: "silwer-higgsfield-visuals"
description: "Dizajnový manuál + Higgsfield prompting systém pre Silwer.sk (v1.3). Použiť pri generovaní promptov pre Higgsfield (Soul / Nano Banana 2 / Seedance) pre 3 kategórie vizuálov: (1) obrázky pre META kampane – layouty A-hard/A-soft/B/C/C-typo/D/E/F z rozboru reálnych best-of kreatív, (2) ilustračné obrázky do detailu produktu na e-shope – makro suroviny, štúdiové packshoty s farebným kruhom, podklady pre edukatívne infografiky, (3) lifestyle galéria e-shopu – autentickí aktívni ľudia v stredoeurópskom prostredí. Prompty sa odovzdávajú ako súvislá anglická próza + zoznam nastavení (Higgsfield nemá pole na JSON). Obsahuje destilát Brand Booku v1.0 + Manuálu dizajnu pre sociálne siete v2.0, záväznú personu „Silwer žena\" (50–55, candid, teplé svetlo, plná farba), systém kruhu (5 rolí vrátane stampu SILWER NAJPREDÁ VANEJŠIE) a paletu podľa produktu. Triggerovať pri: Silwer vizuál, Higgsfield prompt, META kreatíva Silwer, e-shop fotky/galéria Silwer, packshot, makro suroviny, produktová infografika."
---

# Silwer — Dizajnový manuál & Higgsfield prompting systém (v1.3)

> Skill pre generovanie vysoko kvalitných Higgsfield promptov pre vizuály značky **Silwer.**
> Tri kategórie výstupov: **(1) META kampane · (2) Detail produktu na e-shope · (3) Lifestyle galéria e-shopu**

---

## 0. Zdroje a hierarchia autority

| Priorita | Zdroj | Čo určuje |
|---|---|---|
| 1 | **Manuál dizajnu pre sociálne siete v2.0** (05/2026) | 6 princípov, farby, foto pravidlá, layouty, tonalita |
| 2 | **Brand Book v1.0** (2024) | Logo, konštrukcia, badge, produktový dizajn, persony |
| 3 | **Reálna prax kampaní 01–07/2026** | Kampaňové layouty, akčný akcent, founder-led obsah, vykanie s malým písmenom |
| 4 | **Schválená persona „Silwer žena"** (2026) | Záväzný popis hlavnej ženskej postavy — §2.4a |
| 5 | **Best-of referenčné kreatívy** (15 najlepších online vizuálov) | Rozšírená typológia layoutov, systém kruhu, paleta podľa produktu — §7 |

Pri konflikte platí novší zdroj (DM v2.0 > BB v1.0); reálna prax dopĺňa, neprepisuje pravidlá manuálu — výnimky sú v §6.

---

## 1. Značka v skratke

- **Silwer.** — vždy s bodkou. Prémiová slovenská značka doplnkov výživy pre aktívnych ľudí 50+.
- **Misia obsahu:** EDUKOVAŤ · MOTIVOVAŤ · KONVERTOVAŤ (silwer.sk).
- **Pozicionovanie:** aktívna dlhovekosť — nie staroba. „Doplnky výživy pre váš dlhší život."
- **Cieľová skupina:** 50+, aktívna stredná trieda. Vo vizuáloch ľudia 40–55, žena podľa persony §2.4a (50–55).
- **Produkt:** čierny matný packshot, farebný badge „50+ OPTIMALIZOVANÉ PRE VEK" (koliesko vpravo dole na etikete).
- Portfólio 60+ produktov; **pri zadaní si vždy vyžiadaj produkt a jeho akcentovú farbu**, ak nie sú známe (pozorovaná paleta §7.4).

---

## 2. DIZAJNOVÝ MANUÁL — destilát pravidiel

### 2.1 Šesť základných princípov

1. **Čierna ≥ 20 % plochy** — čierne pozadie, alebo čierny pás 20–50 % šírky. NIE riedená tmavošedou (#1A1A1A, #222) v hlavnej ploche, NIE antracit namiesto čiernej.
2. **Logo Silwer. ako kotvový bod** — vždy v rohu (preferencia horné rohy), na čiernej/bielej ploche alebo neštrukturovanej časti fotky. Nikdy cez tvár/ruky/produkt, nikdy v strede, nikdy bez bodky.
3. **Farebný akcent** — **jedna** akcentová farba na vizuál, 15–25 % plochy, konzistentná naprieč variantami kampane. Farba badge je odporúčaný východiskový bod, ale voľba je kampaňová (§6, paleta §7.4).
4. **Človek vo vizuáloch 40–55** — hlavná zóna 40–55, výnimočne 56–60 (testimoniál, brand portrét). Nikdy 25–39, nikdy 60+. *(Žena → persona §2.4a: 50–55. Výnimka chudnutie/GLP-1: §7.5.)*
5. **Typografická signatúra 700 + 100** — headline kombinuje Museo Sans 700 (bold = kľúčové slová) + 100 (thin = kontext) v jednej vete. *(Post-produkcia, nie AI prompt.)*
6. **Minimalizmus a prémiovosť** — obsah/prázdno ≈ 30–40 % / 60–70 %. Max 4 hlavné prvky. Hierarchia čitateľná za 1,5 s. „Ak si nie ste istí, či prvok pridať, nepridajte ho."

### 2.2 Farebná paleta

| Farba | HEX | Pomer | Použitie |
|---|---|---|---|
| Black | `#000000` | ≥ 20 % | pozadie, pás, packshot |
| White | `#FFFFFF` | ≥ 20 % | logo, texty, claim |
| Mild Gray | z BB | ≤ 5 % | linky, oddeľovače |
| Anthracite | z BB | ≤ 5 % | sekundárne plochy, tieň |
| Accent Color | podľa kampane / badge (§7.4) | 15–25 % | kruh, farebné slovo, CTA linka |
| Striebro | gradient šedej / textúra | — | brand a hodnotové posty bez produktu |
| **Silwer červená** | `#D22030` (rozsah `#C41E2C`–`#E03040`) | akcent | akčný/promo akcent, cenovky, promo kruhy |

**Priorita aplikácie akcentu:** 1. farebný kruh pod produktom → 2. farebné slovo v headline → 3. podčiarknutá linka pri CTA.

**Striebro:** brand/hodnotové posty, generické vizuály bez produktu, náhrada akcentu. NIE na produktových a akciových postoch.

**Zakázané:** 3+ farby v jednom vizuáli · pastelové gradienty · trendové sezónne farby · dúha (výnimka: SOWA) · zlatá namiesto striebornej · neón (výnimka: Black Friday) · akcent `#FFD700`.

### 2.3 Logo

- Na social/digitál iba **Silwer.** s bodkou, BEZ taglinu SINCE MMXXII (ten je pre print).
- Biele na tmavom, čierne na svetlom. Nikdy iná farba, žiadne efekty.
- Veľkosť: IG feed 1080×1080 ≈ 12–14 % šírky frame-u.
- Ochranná zóna = násobok bodky logotypu; nič do nej nevstupuje.
- Zakázané: naklonenie, rotácia, zrkadlenie, deformácia pomeru, logo v strede, logo na rušnom pozadí.
- **Pravidlo opačného rohu:** logo ľavý horný → headline vpravo; pravý horný → headline vľavo; logo dole → headline v opačnom hornom rohu.
- Pri split layoute A-soft býva **druhé logo** na fotografickej strane (§7.6).

### 2.4 Fotografia

| Pravidlo | ÁNO | NIE |
|---|---|---|
| Farebnosť | plnofarebná, vivid natural colors | sépia, selektívna farba, desaturácia, B&W |
| Prostredie | stredoeurópske | tropické pláže, púšte, exotika |
| Štýl | momentka pohybu / pozitívnej emócie | neprirodzená póza, fotobankový úsmev |
| Tonalita | jemne ašpiratívna, zdravá, živá | dokumentárne temná, nezdravá |
| Tabu | — | choroba, slabosť, nemocnica, lieky, vozík |

**Persona-match (casting)** — *pre ženskú postavu platí prednostne §2.4a*
- Vek **40–55** (žena **50–55**) · vlasy prirodzené, **soľ-čierna alebo soľ-blond** (nie plne biele/sivé) · pleť s prirodzenou textúrou a jemnými vráskami okolo očí (nie airbrush) · postava zdravá, aktívna, vzpriamená · oblečenie kvalitné neformálne — linen, merino, decentný outdoor · make-up decentný.
- Stredná trieda: dostupné prostredia. Nie luxus, nie chudoba.

### 2.4a Schválená persona — „Silwer žena" (ZÁVÄZNÉ)

**Nepíš vlastný popis ženy — použi tento blok a meň iba scénu, aktivitu a oblečenie.**

| Atribút | Záväzná hodnota |
|---|---|
| Vek | **50–55** (nikdy 55–62, nikdy pod 45) |
| Výraz | **nenútený, prirodzený úsmev** — pokojne pohľad mimo kameru alebo tichý smiech; nie pózovaný úsmev do objektívu |
| Postoj | uvoľnené ramená, zachytená uprostred momentu (candid), nie pózovaná |
| Vlasy | prirodzené, **mierne neupravené**, soľ-blond alebo soľ-čierna; nie plne biele/sivé, nie salónny styling |
| Pleť | prirodzená textúra, jemné vrásky okolo očí; žiadny airbrush ani beauty filter |
| Oblečenie | **voľné bežné oblečenie** — pohodlné, kvalitné, neznačkové |
| Svetlo | **teplé prirodzené okenné / slnečné svetlo**; nikdy tlmená ani dokumentárna paleta |
| Farebnosť | **plná živá farba**; nikdy desaturácia „pre atmosféru" |
| Prostredie | útulná presvetlená kuchyňa / obývačka; vonku **stredoeurópska/slovenská** ulica alebo záhrada (omietnuté domy, pálená krytina, kostolná veža, nízke ploty) — **nikdy US predmestie** |
| Register | autentický UGC / real-life feel, nie leštená štúdiová reklama, nie klinický vzhľad |
| Produkt | drží ho **prirodzene v ruke**, akoby ho práve zdvihla; **nikdy naaranžovaný stojaci vedľa nej** |
| Zákazy scény | žiadne nápoje ako motív · žiadny čierny pás cez osobu · žiadne B&W |

**Prompt blok (kopíruj doslova do prózy):**
```
a relaxed, natural woman around fifty to fifty-five, caught mid-moment with a genuine unforced smile, glancing softly away or laughing quietly, shoulders relaxed, wearing a loose everyday outfit, her natural hair slightly imperfect, natural skin texture with fine lines around the eyes, warm natural window light, full vivid colour, authentic candid real-life feel, not a posed model, not polished studio advertising, not clinical
```

**Prečo:** pri odchýlke (vek 55–62, tlmená paleta, „documentary" register) vzniká dojem chorej a unavenej ženy — presný opak brand pravidla. Overené zlyhanie z reálnej produkcie.

**Konzistencia identity naprieč sériou:** `nano_banana` prenáša identitu voľne — tvár sa v každom zábere mierne líši. Pri sérii nad 2 zábery odporuč natrénovať **Higgsfield Soul** (5–20 fotiek zo schválenej referencie, ~10 min). Každý render vizuálne skontroluj — model občas vlepí do rohu odlepenú tvár z referencie.

**Mužská postava:** rovnaké princípy, vek 45–55, soľ-korenie vlasy, decentný casual. Schválená referencia zatiaľ neexistuje — pri prvom použití nechaj brand ownera potvrdiť výber.

**Svetelný kľúč (záväzný):**

| Kontext | Svetlo |
|---|---|
| Lifestyle vonku | zlatá hodina (1 h po východe / pred západom) |
| Lifestyle doma | prirodzené denné svetlo z okna |
| Brand portrét | štúdio, rim-light na čiernom pozadí |
| Produktová foto | studené štúdio, kontrolované softboxy |
| Zakázané | harsh poludňajšie slnko, ploché štúdio bez modelácie, neón |

**Knižnica scén:**
- OUTDOOR: park · mestská promenáda · les · hory (do 1 500 m) · pláž off-season · kaviareň/terasa · záhrada
- DOMOV: kuchyňa s denným svetlom · terasa bytu · obývačka · pracovňa · gym
- AKTIVITY: turistika, beh, joga, plávanie, cyklistika · práca v záhrade · varenie, raňajky · kniha, hudba, priatelia
- SOCIÁLNE: pár · skupina priateľov
- ZAKÁZANÉ: nemocnica, lekáreň, ordinácia · posteľ s liekmi, organizér tabletiek · vozík, chodítko, paličky · domov dôchodcov · medicínske kúpeľne

**Kvalita:** min. 3 000 px na dlhšej strane, reálne svetlo, prirodzená hĺbka, pravidlo tretín, žiadne JPEG artefakty, watermarky, beauty filtre, AI „glow-up".

### 2.5 Produktová fotografia + farebný kruh

- Kruh: farba **identická/príbuzná badge**, vždy **pod produktom**, **jemná priesvitnosť**, produkt **musí kruh presahovať**, symetria nepovinná.
- Produkt: vždy **vzpriamený s tieňom**, výška ≈ **50 % výšky frame-u**, spodná hrana ≈ **8 % nad spodným okrajom**.
- Kruh: priemer = **60–80 % výšky produktu**, posun voči produktu môže byť asymetrický.
- *Kampaňové rozšírenia kruhu: §7.2.*

### 2.6 Layout systémy

- **13×13 grid:** štvorec delený 13×13; ochranná zóna 1 riadok+stĺpec po obvode; pracovný priestor 12×12. Obdĺžniky: šírka vždy 13 modulov (9:16 → 13×23). Logo 1×1 modul, headline v opačnom rohu.
- **Čierny pás 20–50 %:** ľavá/pravá strana alebo spodný okraj; plná čierna `#000000` s **povinným radiálnym gradientom do 80 % čiernej v mieste produktu**; ostrá hrana; bez priesvitnosti, tieňa, naklonenia. Pás nesie logo (vrchná tretina) + produkt (stredná/dolná tretina) — **produkt vždy presahuje pás do scény**. *(Mäkký gradientový variant: A-soft, §7.1.)*
- **Safe zóny Stories/Reels (1080×1920):** top 0–250 px (UI) · pracovná zóna 250–1670 px · bottom 1670–1920 px (UI).
- **Karusel:** rovnaký akcent na všetkých slidoch, opakujúci sa motív, jednotná typografia; „rozbaľovanie" 1 fotky cez 3–5 slidov = high-impact formát.

### 2.7 Tonalita (pre sprievodné copy)

- Vykanie, nikdy tykanie. *(DM predpisuje veľké V; reálna prax 2026 používa malé „vy, vám" — §6.)*
- Odborný ale ľudský, priateľský nie familiárny, motivujúci. Krátke vety (max 18 slov). Konkrétne benefity.
- **EFSA-safe claims:** „prispieva k normálnej funkcii […]" · „podporuje […]" · „pomáha udržiavať […]" · „je súčasťou zdravého životného štýlu".
- **Zakázané:** „lieči/vylieči/zaručene/náhrada za lieky", menované choroby ako cieľ, false urgency, slang, zbytočné anglicizmy, klamlivé sľuby. Vyhýbaj sa aj slovu **„kúra"** (medicínsky register) — použi „režim".

---

## 3. HIGGSFIELD PROMPTING SYSTÉM

### 3.0 Ako vyzerá výstup

Higgsfield **nemá pole na JSON**. Má textové pole pre prompt a k nemu samostatné ovládače (model, pomer strán, referenčný obrázok, negatívny prompt). To isté platí pre jeho API — `prompt` je obyčajný reťazec. Preto sa prompt odovzdáva **ako súvislá anglická próza** a nastavenia ako zoznam pod ňou.

**Povinný formát každého výstupu:**

> **Varianta [číslo] — [subjekt / námet]**
>
> *(prompt na skopírovanie — jeden odsek anglickej prózy, žiadne zátvorky, žiadne kľúče, žiadne odrážky)*
>
> **Nastavenia v Higgsfielde**
> - Model: …
> - Pomer strán: …
> - Referenčný obrázok: …
> - Negatívny prompt: …
>
> **Post-produkcia:** čo pribudne a kam (logo, headline, kruhy, cenovka, CTA).

Prompt musí byť skopírovateľný jedným ťahom. Ak je v ňom hranatá zátvorka alebo `[ACCENT COLOR]`, nie je hotový — doplň konkrétnu hodnotu.

### 3.0a Poradie v prompte (poradie je zákon)

Modely vážia začiatok promptu silnejšie. Drž toto poradie:

1. **Typ záberu a subjekt** — čo vidíme a kto/čo je hrdina
2. **Produkt a jeho umiestnenie** — ak je v zábere, patrí dopredu, nie na koniec
3. **Akcia a prostredie**
4. **Svetlo** podľa svetelného kľúča (§2.4)
5. **Farebná tonalita** — jedna dominantná farba
6. **Kompozičné pokyny** — kde má zostať voľné miesto pre grafiku
7. **Technické parametre** — kamera, objektív, 8k — až na záver

Píš v celých vetách. Vyhýbaj sa reťaziam kľúčových slov oddelených čiarkami — pri Nano Banana a Seedance drží kompozíciu lepšie súvislý opis.

### 3.0b Všeobecné pravidlá

1. **Packshot = referenčný obrázok.** Produkt sa uploaduje ako referencia; prompt opisuje iba umiestnenie, veľkosť a svetlo. V prompte vždy veta: *use the reference product exactly as provided and do not modify its packaging.* Pred písaním over reálnu podobu produktu (napr. kapsuly GLP-1 sú béžové, blister je brandovaný).
2. **Žiadny text v AI generácii.** Logo, headline, kruhy s textom, cenovky = post-produkcia. AI necháva **čistý negatívny priestor** tam, kde grafika pribudne, a v prompte to musí byť explicitne povedané.
3. **Osoba = schválená persona.** Ak je vo vizuáli žena, vlož prompt blok z §2.4a doslova a meň iba scénu, aktivitu a oblečenie. Nikdy nepíš vlastný popis veku, výrazu ani palety.
4. **Jedna dominantná farba scény + jeden akcent.**
5. **Camera rotation** — striedaj medzi variantami:

| Kamera + objektív | Použitie |
|---|---|
| Hasselblad X2D 100C, 100 mm f/2.5 | produktové makro, prémiový portrét |
| Phase One XF IQ4, 80 mm f/2.8 | editorial, lifestyle indoor |
| Leica SL2, 90 mm f/1.5 | portréty, golden hour outdoor |
| Canon EOS R5, 85 mm f/1.2L | pohyb, šport |

6. **Varianty:** default 3 (žena solo / muž solo / produkt-koncept), voliteľne +pár. Rovnaký layout a nápad naprieč variantami.
7. **Statika pred pohybom.** Pri videu vždy najprv statický obrázok → schválenie → image-to-video. Seedance drží identitu najlepšie pri ľuďoch (~5 min/klip v 1080p), Kling je rýchlejší (~1 min) a vhodný na abstraktné a ilustračné zábery.
8. **Formáty:**

| Použitie | Ratio | Rozlíšenie |
|---|---|---|
| IG/FB feed | 4:5 / 1:1 | 1080×1350 / 1080×1080 |
| Stories / Reels | 9:16 | 1080×1920 |
| Meta + Google banner | 1.91:1 | 1200×628 |
| E-shop galéria produktu | 1:1 | min. 2048×2048 |
| E-shop popisové bloky (Pobo/Shoptet) | 16:9 / 4:3 | 1920×1080 / 1600×1200 |
| Newsletter hero (Leadhub) | 3:1 | 1200×400 |

---

### 3.1 KATEGÓRIA 1 — Obrázky pre META kampane

| Typ kampane | Layout |
|---|---|
| Produktový launch, balíček, cena/akcia | **A-hard / A-soft** — split panel |
| Benefitová komunikácia jedného produktu | **B** — full-bleed monochromatická scéna |
| Sezóna, awareness day, vtipný koncept | **C** — konceptuálna metafora |
| Edukácia s typografickým nápadom | **C-typo** — text je obrazom |
| Čistý produktový vizuál bez osoby | **D** — packshot na farebnom poli |
| Sociálny dôkaz, multi-persona | **E** — portrétna mriežka + kruh |
| Black Friday | **F** — neónové promo |

> **Dôležité:** v reálnych najvýkonnejších kreatívach nesie vizuál **packshot + grafické pole + krátky headline**, nie lifestyle fotografia (§7.5). Pri META zadaní ponúkni najprv produktovo-grafický layout.

#### Layout A — čierny vertikálny panel

> A [medium / wide] shot of [PERSONA BLOCK §2.4a — alebo: a man aged forty-five to fifty-five, active middle class, salt-and-pepper hair, natural skin texture with visible pores] [aktivita zo scénickej knižnice] in [stredoeurópske prostredie]. A solid black vertical panel covers roughly forty-five percent of the frame on the [left/right] side, pure black with a soft radial gradient lightening to about eighty percent black directly behind the product area; its inner edge is [a clean sharp vertical line / a soft gradient that melts into the photograph]. The reference product stands perfectly upright in the lower part of that panel, about half the height of the frame, overlapping the panel edge slightly so that it reaches into the scene, with a soft realistic shadow beneath it. Use the reference product exactly as provided and do not modify its packaging. The upper part of the panel stays completely empty so that a logo and headline can be placed there later. [Svetlo podľa kľúča.] The whole scene is graded towards [ACCENT] tones in full vivid colour. Shot on [kamera], 8k, premium editorial commercial photography.

**Nastavenia:** Nano Banana 2 · 4:5 · referencia: packshot · negatív: master list + dodatok A.

#### Layout B — full-bleed monochromatická scéna

> A close-up of [PERSONA BLOCK §2.4a — alebo mužská verzia], showing the torso and hands in loose everyday [ACCENT] clothing, holding the reference product naturally at chest height as if it had just been picked up. The product is perfectly upright and sharp; use the reference product exactly as provided and do not modify its packaging. [ACCENT] dominates the entire frame tonally, edge to edge, with no competing colours. All four corners of the composition stay clean and uncluttered so that graphic circles can be added later. Soft natural light, full vivid colour, natural skin texture with visible pores and fine lines. Shot on [kamera], 8k, premium commercial photography.

**Nastavenia:** Nano Banana 2 · 1:1 alebo 4:5 · referencia: packshot · negatív: master list + dodatok B.

#### Layout C — konceptuálna metafora

Vždy ponúkni 2–3 metafory a vyber najsilnejšiu.

> A full-bleed conceptual advertising scene showing [metafora — napr. a surreal anatomical heart sculpted from red silk, tied with a ribbon bow, resting on a pale grey studio background]. One single clear visual idea, nothing else in the frame. Generous empty space across the top for a headline and in the [left/right] bottom corner for product placement. [ACCENT] dominates the palette in rich saturated natural colour. Witty, premium, poster-like advertising photography. Shot on [kamera], 8k.

**Nastavenia:** Nano Banana 2 · 1.91:1 alebo 4:5 · bez referencie (packshot ide do post-produkcie) · negatív: master list + dodatok C.

#### Layout C-typo — typografický koncept *(Luteín look)*

Najsilnejší formát v best-of sade. Text sám je obrazom — očná tabuľka, teplomer, EKG krivka. AI generuje iba podklad a packshot; typografia ide celá do post-produkcie.

> A minimal graphic composition on a deep matte black background. The upper two thirds of the frame are completely empty black, reserved for typography. In the lower third a large flat [ACCENT] circular field bleeds off the bottom edge of the frame, and the reference product stands perfectly upright on it, about thirty percent of the frame height, with a soft realistic shadow. Use the reference product exactly as provided and do not modify its packaging. Flat, clean, poster-like, no texture and no visible gradient noise. Shot on Hasselblad X2D 100C with a 100mm lens, 8k.

**Nastavenia:** Nano Banana 2 · 9:16 · referencia: packshot · negatív: master list + dodatok C + `text rendered in image, letters, typography`.

#### Layout D — štúdiový packshot na farebnom poli *(Magnézium Glycinát look)*

> A studio product photograph of the reference product standing centred on a smooth [ACCENT] gradient background, where a luminous lighter glow sits directly behind the bottle and falls off to a deeper tone towards the edges, with a subtle darker circular halo behind it. The product is perfectly upright at about forty-five percent of the frame height, with a crisp specular highlight running down one side and a soft contact shadow at its base. Use the reference product exactly as provided and do not modify its packaging. The top third of the frame stays generously empty for a headline, and an unoccupied strip runs across the very bottom where a graphic band will be added. Cold controlled softbox lighting, premium minimal composition. Shot on Hasselblad X2D 100C with a 100mm lens, 8k.

**Nastavenia:** Nano Banana 2 · 4:5 · referencia: packshot · negatív: master list + dodatok D.

#### Layout E — portrétna mriežka + centrálny kruh *(Žena 50+ look)*

Portréty generuj **plnofarebné** — desaturácia z archívnych kreatív sa neopakuje (§6).

> Four separate tight editorial head-and-shoulders portraits of four different women aged fifty to fifty-five, arranged as a clean two-by-two grid separated by thin light lines. Each of them is [PERSONA BLOCK §2.4a], with varied hair — salt-and-blond, salt-and-dark, silver-brown — against a soft neutral studio backdrop, looking calmly and confidently towards the camera. Natural skin texture with visible pores and fine expression lines, full vivid natural colour, even soft studio lighting. The centre of the overall composition stays visually calm and uncluttered because a graphic circle will be placed there afterwards. Shot on Phase One XF IQ4 with an 80mm lens, 8k, premium editorial photography.

**Nastavenia:** Nano Banana 2 · 1:1 · bez referencie · negatív: master list + dodatok E.

#### Hotový príklad — Magnézium Glycinát, Layout B, IG feed

> A medium close-up of a relaxed, natural woman around fifty to fifty-five, caught mid-moment with a genuine unforced smile, glancing softly away from the camera, shoulders relaxed, wearing loose everyday deep-green yoga clothing, her salt-and-blond hair slightly imperfect, natural skin texture with fine lines around the eyes. She holds the reference product naturally in her hand at chest height, as if she had just picked it up after an evening yoga session at home; the product is perfectly upright and sharp. Use the reference product exactly as provided and do not modify its packaging. Deep green dominates the entire frame tonally, carried by her clothing and a soft blurred plant background, and all four corners stay clean and uncluttered for graphic overlays. Warm natural window light, full vivid colour, authentic candid real-life feel, not a posed model, not polished studio advertising, not clinical. Shot on Phase One XF IQ4 with an 80mm lens, 8k.

**Nastavenia:** Nano Banana 2 · 1:1 · referencia `packshot_magnezium_glycinat.png` · negatív: master list + dodatok B.
**Post-produkcia:** logo `Silwer.` vľavo hore · headline 700+100 · 4 polopriehľadné zelené kruhy s benefitmi v rohoch · CTA linka dole.

---

### 3.2 KATEGÓRIA 2 — Ilustračné obrázky do detailu produktu (e-shop)

#### 2A — Makro suroviny

> An extreme macro photograph of [surovina — napr. dried berberine bark pieces / translucent golden omega-3 softgel capsules / a raw magnesium crystal] arranged on a [matte black / light neutral] surface. Cold controlled studio lighting from softboxes, razor-sharp focus-stacked detail across the subject with the depth of field falling away softly at the edges. A subtle [ACCENT] tone runs through the styling. Clean minimal composition with generous negative space. Shot on Hasselblad X2D 100C with a 100mm macro lens, 8k, premium editorial supplement photography.

**Nastavenia:** Nano Banana 2 · 16:9 · bez referencie · negatív: master list + dodatok 2.

#### 2B — Štúdiová produktová estetika

Pravidlá farebného kruhu podľa §2.5.

> A studio product photograph of the reference product on a [matte black / soft white] background under cold controlled softbox lighting with a gentle rim light along its edge. The product stands perfectly upright at about half the height of the frame, its bottom edge sitting roughly eight percent above the lower edge, with a soft realistic drop shadow beneath it. A semi-transparent [ACCENT] circle sits behind and below the product, its diameter between sixty and eighty percent of the product height, the background faintly visible through it, and the product overlaps its edge. Use the reference product exactly as provided and do not modify its packaging. Clean minimal premium composition. Shot on Hasselblad X2D 100C with a 100mm lens, 8k.

**Nastavenia:** Nano Banana 2 · 1:1 · referencia: packshot · negatív: master list + dodatok 2.
*Variant bez produktu alebo farby: kruh so strieborným gradientom alebo textúrou striebra.*

#### 2C — Edukatívna infografika (podklad)

> A minimal editorial still-life prepared for an educational layout. [The reference product stands upright on the far left third of the frame / A macro cluster of the raw ingredient sits in the lower left corner.] The remaining two thirds of the frame are a clean, evenly lit [matte black / soft light grey] empty surface reserved for infographic overlays that will be added later. Cold studio softbox lighting with a subtle [ACCENT] accent, premium minimal composition. Shot on Hasselblad X2D 100C with a 100mm lens, 8k.

**Nastavenia:** Nano Banana 2 · 16:9 · referencia: packshot (voliteľné) · negatív: master list + dodatok 2 + `charts, diagrams, arrows, numbers, icons`.

**Anatomické a mechanizmové ilustrácie:** medicínska editorial ilustrácia na krémovom podklade, nie neónový obrys na čiernom. Drž jeden štýl naprieč sériou — každý ďalší záber generuj z predošlého ako referencie. Pri prechode z 1:1 na 9:16 použi outpaint, nie nový render. Obraz smie ukazovať fyziológiu, text nesmie tvrdiť účinok produktu bez EFSA claimu.

**Formáty kategórie 2:** galéria 1:1 (min. 2048 px) · popisové bloky 16:9 alebo 4:3 · konzistentné pozadie naprieč blokmi jedného produktu.

---

### 3.3 KATEGÓRIA 3 — Lifestyle galéria produktov (e-shop)

Autentické fotografie aktívnych ľudí (žena podľa §2.4a, muž 45–55) v prirodzenom stredoeurópskom prostredí. Žiadna grafika, žiadne panely, žiadne kruhy.

**Pravidlá:** momentka pohybu alebo pozitívnej emócie, nie póza · scéna z knižnice (§2.4) tematicky zladená s produktom · vonku zlatá hodina, doma okenné svetlo, nikdy harsh poludnie · ak je produkt v zábere, drží ho v ruke alebo prirodzene stojí na ploche — nikdy nie hero-size, nikdy nie naaranžovaný vedľa osoby · tonalita jemne ladí s akcentom, ale pôsobí prirodzene, žiadna monochromatická štylizácia ako v kat. 1B.

> A candid, real-life photograph of [PERSONA BLOCK §2.4a — alebo: a man aged forty-five to fifty-five with salt-and-pepper hair, healthy upright posture, wearing quality casual clothing in linen or merino], with a subtle [ACCENT] accent in the clothing, [aktivita zo scénickej knižnice] in [prostredie zo scénickej knižnice]. Captured mid-movement with genuine positive emotion, in [golden hour backlight / warm natural window daylight], with a shallow depth of field and soft bokeh, composed on the rule of thirds. Full vivid natural colour, a slightly aspirational healthy mood, no graphic elements anywhere in the frame. [Voliteľne: The reference product is held naturally in her hand as if just picked up / stands upright on [plocha] in the foreground, softly lit with a realistic shadow; use the reference product exactly as provided and do not modify its packaging.] Shot on [Leica SL2 with a 90mm lens / kamera z rotácie], 8k, premium editorial photography.

**Nastavenia:** Higgsfield Soul · 1:1 (galéria) alebo 4:5 · referencia: packshot len ak je produkt v scéne · negatív: master list + dodatok 3.

**Príklady scén:**
- *Omega-3:* muž ~50 pripravuje raňajky s lososom v kuchyni s denným svetlom; žena (persona) na prechádzke mestským parkom v zlatej hodine.
- *Kĺby Kosti Chrupavky:* pár 50+ na turistike v lese do 1 500 m, golden hour, batohy.
- *Melatonín / Ashwagandha:* žena (persona) s knihou vo večernej obývačke.
- *GLP-1 / metabolizmus:* žena (persona) v záhrade pri paradajkách v rannom protisvetle.

---

### 3.4 Negatívny prompt — MASTER LIST

Negatívny prompt je jediné miesto, kde je **zoznam kľúčových slov oddelených čiarkami správny formát** — ide do samostatného poľa a model ho spracúva inak než hlavný prompt.

```
black and white photo, grayscale, desaturated, sepia, selective color, monochrome, duotone,
sick person, wheelchair, walker, cane, caregiver, nurse, hospital, pharmacy, medical setting, medicine pills in foreground, pill organizer,
under 40, 20-year-old, 30-year-old, teenager, child, young adult, over 60, 70-year-old, elderly, very old person, retiree stereotype, frail, fully white hair, fully grey hair, deep grandparent wrinkles, sagging skin,
luxury yacht, private jet, mansion, designer fashion, sports car, high-society,
working-class poverty, run-down environment, dilapidated, unkempt,
tropical beach, desert, exotic location,
plastic skin, airbrushed face, waxy skin, no pores, doll face, beauty filter,
cartoon, anime, 3D render, illustration, painting, CGI,
text overlay, watermark, logo rendered in image, brand name spelled out, caption, price tag rendered,
oversaturated colors, HDR look, heavy vignette, film grain, heavy noise, harsh midday sun, flat lighting, neon lighting,
tilted product, tiny product, floating product, mirrored product, altered product label, modified packaging,
tired face, exhausted expression, sad expression, worried look, gloomy mood, muted palette, documentary social-drama look, posed model smile, stiff studio pose,
US suburban house, vinyl siding, wide american street, front porch,
coffee cup, mug, glass of drink, beverage as motif,
product staged standing on a surface next to the person,
detached face floating in corner, duplicated face, extra limbs, malformed hands
```

> Posledné štyri riadky sú **povinné pri každom vizuáli s osobou** — bez nich vznikajú opakované zlyhania z reálnej produkcie: dojem chorej a unavenej ženy, americké predmestie, naaranžovaný produkt vedľa osoby, odlepená tvár z referencie v rohu.

> **Výnimka:** ak je blister zámerným motívom kampane (GLP-1 „jedna kapsula"), nedávaj `blister pack` do negatívu — ide ako referenčný obrázok a musí sedieť so skutočným balením.

**Dodatky podľa layoutu:**
- **A:** `distorted black panel, transparent black panel, black panel with reflections, multiple panels, diagonal panel, curved black shape`
- **B:** `cluttered background, multiple colors competing, busy composition, circles rendered in image`
- **C:** `crowded scene, multiple visual ideas, circle rendered in image`
- **D:** `busy background, textured background, multiple gradients, props, hands, banding, clutter in top and bottom areas`
- **E:** `identical faces, same woman repeated, uneven grid, tilted portraits, cluttered center, heavy makeup, desaturated portraits, black and white portraits`
- **Kategória 2:** `hands, people, faces, cluttered props, kitchen clutter, reflections on label, colored background gradient competing with accent`
- **Kategória 3:** `studio background, graphic panel, colored circle, posed stock photo look, fake smile, looking directly at camera stiffly, black panel`

**Video (master):**
```
black and white, sepia, desaturated, shaky camera, hospital, pills, under 40, teenager, over 60, elderly, frail, fully white hair, luxury, poverty, blurry artifacts, flickering, plastic skin, cartoon, 3D render, text overlay during playback, warping, morphing face, identity drift
```

---

## 4. Workflow

1. **Brief:** kategória (1/2/3) · produkt + akcentová farba (§7.4, ak chýba vyžiadaj) · platforma/umiestnenie · typ kampane · subjekt(y) · počet variantov · termín.
2. **Over reálny produkt** v zložke/referenciách pred písaním promptu (farba kapsúl, branding blistra, tvar balenia).
3. **Voľba layoutu:** kat. 1 → A-hard / A-soft / B / C / C-typo / D / E (§3.1, anatómia §7.1) + 1 vizuálny nápad; kat. 2 → 2A/2B/2C; kat. 3 → scéna z knižnice.
4. **Zvoľ rolu kruhu** (§7.2) — jedna dominantná rola na vizuál. Zváž social-proof stamp „SILWER NAJPREDÁ VANEJŠIE", ak má produkt doloženú pozíciu v predaji.
5. **Napíš prompty ako súvislú anglickú prózu** vo formáte §3.0, v poradí podľa §3.0a — každý variant iná kamera z rotácie, rovnaký layout a nápad. Žiadny JSON, žiadne nevyplnené hranaté zátvorky.
6. **Doplň nastavenia** pod každý prompt (model, pomer strán, referenčný obrázok, negatívny prompt).
7. **Post-produkčné poznámky:** čo pribudne (logo roh, headline 700+100, kruhy, cenovka, CTA) a kde je preň rezervovaný priestor.
8. **Výber a schválenie:** ukladaj s čitateľnými názvami; brand owner nevhodné zmaže alebo presunie vybrané do `VYBRANE`. Lajky v Higgsfield UI nie sú cez API viditeľné.
9. **Self-check** podľa §5.

## 5. QA checklist pred odovzdaním

**Všetky kategórie:**
- [ ] Plnofarebný vizuál (žiadna desaturácia ani B&W); jedna akcentová farba, konzistentná naprieč variantami kampane
- [ ] **Žena = persona §2.4a** (50–55, nenútený úsmev, teplé svetlo, candid, produkt v ruke); muž 45–55
- [ ] Osoba pôsobí zdravo a uvoľnene — nie unavene, choro ani smutne; prostredie stredoeurópske, nie US predmestie
- [ ] Svetlo podľa svetelného kľúča; žiadne zakázané scény
- [ ] Produkt: referencia as-is, vzpriamený, s tieňom; žiadny text/logo/kruhy generované v AI
- [ ] Negatívny prompt = master list + správny dodatok; aspect ratio podľa umiestnenia
- [ ] **Prompt je súvislá anglická próza**, skopírovateľná jedným ťahom, bez JSON-u a bez nevyplnených `[zátvoriek]`; nastavenia sú uvedené zvlášť pod ním
- [ ] Každý render vizuálne skontrolovaný (artefakty, odlepená tvár, ruky)

**Kat. 1 navyše:** layout konzistentný naprieč variantami · čierna ≥ 20 % (A) · čisté rohy pre grafiku (B) · jeden vizuálny nápad (C) · voľná horná tretina + spodný pás (D) · pokojný stred a 4 rôzne tváre (E) · jedna rola kruhu (§7.2) · priestor pre logo + headline v opačnom rohu · safe zóny pri 9:16.
**Kat. 2 navyše:** kruh pod produktom, priesvitný, produkt presahuje, priemer 60–80 % výšky produktu · produkt ~50 % výšky frame-u, spodná hrana ~8 % · konzistentné pozadie · 2C: rezervovaná plocha, žiadne AI čísla/šípky.
**Kat. 3 navyše:** žiadna grafika ani panel · momentka, nie póza · produkt (ak je) prirodzene v scéne alebo v ruke, nie hero.

## 6. Známe konflikty zdrojov (needitovať bez brand ownera)

| Téma | DM/BB | Reálna prax 2026 | Default skillu |
|---|---|---|---|
| Vek vo vizuáloch | 40–55 (DM 2.4) | kampane 50–60; persona 50–55 | **žena 50–55** (§2.4a), muž 45–55, testimoniál do 60. **Výnimka: chudnutie / GLP-1** — povolená mladšia aspiračná postava (§7.5) |
| Vykanie | veľké V (DM 9.1) | malé v („vám", „vaše telo") | copy: malé v; formálne dokumenty: veľké V |
| Voľba akcentovej farby | Accent = farba badge | Berberín beží červený (žena) aj tyrkysový (muž) | **Akcent je voľný podľa kampane** — badge je odporúčaný východiskový bod, nie povinnosť. Stále platí: jedna farba na vizuál a konzistencia naprieč variantami |
| Farebnosť | plná farba (DM 6.1) | časť starších kreatív má B&W/desaturované fotky | **vždy plná farba.** B&W a desaturované fotografie v archíve (portréty Žena 50+, gym Kolagén+BCAA, pozadie Tribulus) sú historické — **neopakovať**, ani ako „štylizáciu" |

---

## 7. Knižnica reálnych kreatív (best-of, referenčný rozbor)

Rozbor 15 najlepších online kreatív. Vzorník layoutov a kompozičných riešení — **nie** vzorník farebnosti fotografie (viď zákaz B&W vyššie).

### 7.1 Rozšírená typológia layoutov

| Kód | Layout | Anatómia | Referencia |
|---|---|---|---|
| **A-hard** | Split panel, ostrá hrana | Čierny panel vľavo (~50 %), scéna/objekt vpravo na svetlom pozadí. Logo hore, headline pod ním, packshoty dole, cenovka na hrane. | Hypertenzia |
| **A-soft** | Split panel, gradientový prechod | Rovnaká štruktúra, ale prechod čiernej do fotografie je **mäkký gradient**, nie ostrá hrana. Packshot sedí presne na prechode. Druhé logo vpravo dole na fotke. | Kolagén, Žena 50+ Probio Aktiv |
| **B** | Full-bleed monochróm + benefitové kruhy | Torzo/ruky držiace produkt, scéna tonálne v jednej farbe, 4 polopriehľadné kruhy s 2–3-slovnými benefitmi. Logo hore vľavo. | Berberín (žena aj muž) |
| **C** | Konceptuálna metafora | Jeden vizuálny nápad nesie celý vizuál. | Hypertenzia (hodvábne srdce), Kĺby (Diskobolos), Doprava (hračkárske auto s packshotmi v korbe), Matka (3D srdce so zľavou) |
| **C-typo** | Typografický koncept | **Text sám je obrazom.** Najsilnejší formát v sade. | Luteín — headline vysádzaný ako očná tabuľka, zmenšujúce sa riadky, packshot dole na zelenom kruhovom výseku |
| **D** | Štúdiový packshot na farebnom poli | Produkt v strede na gradiente akcentovej farby (svetlejší stred → tmavšie okraje), headline hore, **čierny pás dole s cloudom kľúčových slov**. | Magnézium Glycinát |
| **E** | Portrétna mriežka + centrálny kruh | 4 portréty v mriežke 2×2, uprostred plný kruh v akcentovej farbe s packshotom, vedľa menší kruh so social-proof stampom. | Žena 50+ Komplex |
| **F** | Neónové promo | Čierne pozadie, neónové svietiace typo (magenta + cyan), packshot vpravo v priereze. Iba Black Friday. | BF 2025 |

### 7.2 Kruh — kompletný systém (doplnok k §2.5)

Kruh nie je jeden prvok, ale **päť rolí**. Vždy iba jedna dominantná rola na vizuál:

1. **Benefitový kruh** — polopriehľadný (~75–85 %), 3–4 ks okolo produktu, vnútri 2–3 slová (mix regular + bold), prekrývajú sa navzájom aj s produktom. *(Berberín)*
2. **Headline pole** — jeden veľký plný kruh v hornom rohu, **preteká cez okraj frame-u**, nesie headline v bielej. *(Matka, Doprava)*
3. **Rám / okno** — kruh orámuje produkt alebo ruku s produktom; ruka/packshot z neho vystupuje von. *(Tribulus, Kĺby, Žena 50+)*
4. **Kruhový výsek pod produktom** — plná akcentová farba v dolnej tretine, packshot naň sadá. *(Luteín)*
5. **Social-proof stamp** — malý plný kruh v akcentovej farbe s textom **„SILWER NAJPREDÁ VANEJŠIE"** (SILWER regular, zvyšok bold, na 3 riadky). Opakujúci sa brand prvok — použiť pri produktoch s doloženou pozíciou v predaji. *(Žena 50+, Kĺby, Tribulus, Magnézium)*

Kruhy **často pretekajú cez okraj frame-u** — to je žiaduce, nie chyba. Pravidlo z BB (kruh pod produktom, priesvitný) platí pre klasický produktový vizuál (kat. 2B); roly 2–5 sú kampaňové rozšírenie.

### 7.3 Typografia v praxi

- Headline **mieša bold + light v jednej vete** — potvrdené na všetkých kreatívach.
- Farba: biela na tmavom je default; **akcentová farba pre kľúčové slovo** je bežná (Tribulus oranžová, Kĺby tyrkysová, Hypertenzia červená, Kolagén+BCAA modrá).
- Cenovka: biele číslo na červenom poli + prečiarknutá pôvodná cena, vedľa `-20 %` biele na čiernom.
- Zľava v texte: „**22 % zľava** na Deň otcov" — bold číslo, light kontext.
- Keyword cloud (layout D): 5–6 jednoslovných benefitov v dvoch riadkoch, striedavé veľkosti, biela/krémová na čiernom.

### 7.4 Pozorovaná paleta podľa produktu

Východiskový bod pre voľbu akcentu (nie záväzný — §6):

| Produkt | Akcent |
|---|---|
| Berberín | červená (žena) / tyrkysová (muž) |
| Kolagén | teplá béžová/tan |
| Kolagén + BCAA | nevädzová modrá |
| Luteín Komplex Forte | zelená |
| Magnézium Glycinát | zelená (gradient) |
| Kĺby Kosti Chrupavky | tyrkysová / mint |
| Žena 50+ Komplex | magenta |
| Žena 50+ Probio Aktiv | červená (ruža) |
| Tribulus 50+ | oranžová / jantárová |
| GLP 1 Probio Aktiv | ružová na svetlošedom pozadí |
| Doprava / generické promo | ružovo-fialová |
| Black Friday | neón magenta + cyan |

### 7.5 Ľudia v best-of kreatívach

V 15 najlepších kreatívach **nie je ani jedna klasická lifestyle scéna**. Človek sa objavuje iba takto:

- **Orezané torzo a ruky držiace produkt** — tvár mimo záber *(Berberín)*
- **Portrétna mriežka** — tesné portréty, viditeľná textúra pleti a vrásky *(Žena 50+)*
- **Rozostrená postava v pozadí** za produktom v ruke *(Tribulus)*
- **Celá postava držiaca balenie pred tvárou** *(GLP-1)*

**Dôsledok pre kategóriu 1 (META):** víťazný vzorec je **packshot ako hrdina + grafické pole + krátky headline**, nie lifestyle fotografia. Lifestyle scény patria do kategórie 3. Pri META zadaní ponúkni najprv produktovo-grafický layout a lifestyle až ako doplnok.

**Výnimka pre chudnutie / GLP-1:** pri produktoch na reguláciu hmotnosti je povolená **mladšia aspiračná postava** (fit telo, športový set, tvár čiastočne zakrytá balením alebo mimo záber). Mimo tejto kategórie platí persona §2.4a bez výnimky.

### 7.6 Konštanty potvrdené naprieč celou sadou

- Packshot **vždy vzpriamený**, výška 40–60 % frame-u, s realistickým tieňom alebo odrazom na lesklom povrchu.
- Viacproduktové zostavy stoja **v rade vedľa seba**, nikdy nie roztrúsene ani naklonené.
- Logo `Silwer.` v rohu; pri layoute A-soft býva **druhé logo** na fotografickej strane.
- Čierna dominuje; svetlošedý štúdiový podklad je druhá povolená alternatíva.
- Badge 50+ na etikete zostáva vždy viditeľný a nedotknutý.
