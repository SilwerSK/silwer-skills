# Post-Produkcia — Logo, Claim, Typografia

Tento dokument opisuje **čo AI NEvygeneruje** a musí sa dokončiť v post-produkcii pred publikáciou. Cieľom je mať vizuál, ktorý je 100 % na-brand a pixel-perfect bez ohľadu na to, ako dobre Nano Banana dodala scénu.

> **Dôvod, prečo nedávame logo do AI promptu:** Nano Banana 2 (aj Kling/Veo) stále generuje logo s chybnou sadzbou — nesprávne kerning, chýbajúca bodka, zlé proporcie, deformované písmená. Jediný spoľahlivý spôsob, ako mať logo presné, je vložiť ho vektorom v post-produkcii. Rovnako pri hlavných claim-och (text nad produktom v páse).

---

## 1. Čo AI dodá vs. Čo pridávame v post-produkcii

| Prvok | AI (Higgsfield) | Post-produkcia |
|---|---|---|
| Foto scéna (človek, prostredie, svetlo) | ✅ | — |
| Čierny/tmavý panel (Layout A) | ✅ | (jemný rektifikačný orez) |
| Červené kruhy s benefitmi (Layout B) | ❌ | ✅ vektorom (#D22030, opacita 75–85 %) |
| Plný červený kruh pod packshotom (Layout C) | ❌ | ✅ vektorom |
| Produkt (fľaša / tubus) z referencie | ✅ | (light touch-up — doostrenie, farebná korekcia) |
| Logo `Silwer.` | ❌ | ✅ vektorom |
| Hlavný claim / headline (napr. "Vek nie je problém") | ❌ | ✅ vektorom |
| Podtitul / CTA ("Objavte viac na silwer.sk") | ❌ | ✅ |
| Akciový badge ("-20 %", "Black Friday") | ❌ | ✅ |
| Cenovka (biela cena na červenej + prečiarknutá pôvodná + "-XX %" na čiernej) | ❌ | ✅ |
| Zelený stamp "ZNOVU NA SKLADE" / červený promo kruh | ❌ | ✅ |
| Rotovaný awareness-day text ("17. MÁJ …") | ❌ | ✅ |
| Legislatívny disclaimer ("Výživový doplnok") | ❌ | ✅ (pri IG ADS a Google Display povinne) |

---

## 2. Logo Placement — Presné Pravidlá

### 2.1 Biele logo na tmavom podklade (Layout A, tmavé scény)

| Atribút | Hodnota |
|---|---|
| **Farba** | `#FFFFFF` 100 % |
| **Font** | `Silwer.` custom wordmark (použij vektor z `assets/silwer-logo-white.svg`) |
| **Veľkosť** | Šírka loga = **60 % šírky čierneho pásu** (nie celá šírka — dýcha) |
| **Pozícia V** | Horný okraj loga = **8 % od horného okraja** rámu |
| **Pozícia H (pás vľavo)** | Logo zarovnané **vľavo** k ľavému okraju pásu, s paddingom **8 % šírky pásu** zľava |
| **Pozícia H (pás vpravo)** | Logo zarovnané **vpravo** k pravému okraju pásu, s paddingom **8 % šírky pásu** sprava |
| **Airspace** | Minimálne 0.5× výšky písmena okolo loga |

### 2.2 Čierne logo na svetlej scéne

Bežné pri Layoutoch B a C so svetlým pozadím (Hypertenzia — čierne logo na svetlosivej strane). Pravidlo: **biele na tmavom, čierne na svetlom** — podľa lokálneho kontrastu v mieste umiestnenia. Pri Layoute C je logo v hornom rohu oproti headline (Plavky: biele vpravo hore na modrom nebi).

### 2.3 Čo sa nerobí

- ❌ Logo cez fotografiu (človeka, produkt, okraj pásu → scéna)
- ❌ Logo v inej farbe ako čierna/biela (žiadne pink, gold, mint logo)
- ❌ Logo s efektom (shadow, glow, outline, gradient)
- ❌ Logo bez bodky (`Silwer` bez bodky = chyba)
- ❌ Logo rotované, v 3D perspektíve, prelepené
- ❌ Viaceré logá v jednom vizuále

---

## 3. Hlavný Claim / Headline

| Atribút | Hodnota |
|---|---|
| **Font** | Sans-serif geometric — **Gotham Bold** / **Montserrat Bold** / **Inter Bold** |
| **Farba** | Biela `#FFFFFF` (default); prípadne akcentná farba kampane (viď paleta v [visual-identity.md](visual-identity.md#2-farebná-paleta)) |
| **Veľkosť** | Pri IG feed 1080×1350: **48–72 px** (responsívne) |
| **Pozícia** | Layout A: stredná/horná tretina panelu nad produktom. Layout C: horný okraj vizuálu, zarovnaný vľavo alebo na stred |
| **Max riadky** | 2 riadky pre hero claim (napr. "Schudnúť / do plaviek!") |
| **Mix váh** | Headline mixuje bold + regular v jednej vete ("**Schudnúť** do plaviek!", "Balíček **pre** srdce") |
| **Farebný mix** | Na svetlom podklade možná červeno-čierna kombinácia slov |
| **Line-height** | 1.05–1.15 (tesné) |
| **Letter-spacing** | 0 až +10 (nie kondenzované) |

### Šablóny claim-ov (príklady)

| Kampaň | Claim | Akcent |
|---|---|---|
| Brand | Vek nie je problém. | Biela |
| Omega-3 | Srdce, ktoré stíha život. | Biela |
| Luteín | Ostrý pohľad aj po šesťdesiatke. | Biela |
| GLP1 | 21 dní. Nový tvar. | Fialová `#B893D9` |
| Black Friday | -30 % na celú kolekciu. | Pink `#FF3AA0` |
| Vianoce | Dajte zdravie. | Burgundy / zlatá |
| Tribulus 50+ | Sila, ktorá sa vracia. | Biela |

---

## 4. Šablóny (Photoshop / Figma / Canva)

### 4.1 Photoshop akcia — rýchly overlay

1. Otvor AI-generovaný vizuál v PS
2. Drag-and-drop `assets/silwer-logo-white.svg` na canvas → Smart Object
3. Transform → Scale na 60 % šírky pásu
4. Align → zarovnať podľa pravidiel z §2.1
5. New text layer → napís claim (Gotham Bold 60 px, white)
6. Centrovať claim horizontálne v páse
7. Export → PNG (IG), JPG (Google), PDF (print)

**Tip:** nahraj akciu ako `.atn` do PS actions → jedno tlačidlo = logo + claim na svojom mieste.

### 4.2 Figma master component

Vytvor component `silwer-overlay` s variantami:
- `size=1:1 / 4:5 / 9:16 / 1.91:1 / 3:1`
- `band=left / right`
- `accent=white / pink / mint / purple / burgundy`

Každá varianta má uzamknuté:
- Logo placement (auto-layout podľa orientácie pásu)
- Textový slot pre claim
- Padding a airspace
- Font

Workflow: Otvor rám, drag AI obrázok na pozadie, component overlay zostane nad ním. Hotovo za 30 sekúnd na vizuál.

### 4.3 Canva brand kit

Pre netechnických ľudí v tíme:
1. Setup → Brand Kit → pridaj `silwer-logo-white.png` + `silwer-logo-black.png`
2. Pridaj Silwer paletu (čierna, biela + akcenty z palety)
3. Pridaj fonty (Montserrat Bold default, ak nie je Gotham dostupný)
4. Vytvor Canva template pre každý aspect ratio s lock-ed logo placement

Canva nie je ideálna pre produkčnú kvalitu (limited color management) — odporúčam Photoshop alebo Affinity pre finálny export do ads.

---

## 5. Export — Technické Špecifikácie

| Kanál | Rozmer (px) | Formát | Max veľkosť | Farebný profil |
|---|---|---|---|---|
| Instagram feed (square) | 1080 × 1080 | JPG 90 % | 1 MB | sRGB |
| Instagram feed (portrait 4:5) | 1080 × 1350 | JPG 90 % | 1 MB | sRGB |
| Instagram Stories / Reels cover | 1080 × 1920 | JPG 90 % | 1 MB | sRGB |
| Facebook feed | 1200 × 1200 alebo 1200 × 630 | JPG 85 % | 1 MB | sRGB |
| Facebook Ads (multi-ratio) | 1080 × 1080 + 1080 × 1350 + 1080 × 1920 | JPG 85 % | 1 MB each | sRGB |
| Google Display banner | 1200 × 628 (ratio 1.91:1) | JPG 85 % | 200 KB | sRGB |
| Google Display square | 1200 × 1200 | JPG 85 % | 200 KB | sRGB |
| Google Display vertikál | 900 × 1200 | JPG 85 % | 200 KB | sRGB |
| Newsletter banner (Leadhub) | 1200 × 400 (ratio 3:1) | JPG 90 % | 300 KB | sRGB |
| Print (rare — PDF katalóg) | variable, 300 DPI | PDF/X-4 | — | CMYK |

### Safe zones (aby sa text neprekrýval s UI)

- **IG Stories/Reels:** safe zone = **top 14 % + bottom 20 %** (tam sú avatar, tlačidlá, caption) → všetok kritický text a logo musia byť **v strednom 66 %** rámu
- **IG feed (carousel):** safe zone = **bottom 15 %** (tam je swipe indikátor)
- **Google Display:** v hero oblasti nemôže byť viac ako 20 % textu (old policy, aktuálne voľnejšie, ale radšej držať)

---

## 6. Varianty — Ako Sa Líšia 3 Povinné Posty

Všetky 3 varianty zdieľajú **layout (A/B/C), logo + claim systém a vizuálny nápad kampane**. Líšia sa **iba obsahom scény** (žena / muž / produktová-konceptuálna).

Prakticky to znamená: v Photoshope / Figme máš jednu **master template** pre kampaň a meníš iba **vrstvu scény (AI output)**. Logo a claim zostávajú bit-to-bit identické naprieč 3 variantmi.

---

## 7. Checklist — Pred Publikáciou

- [ ] Logo je vektorové (SVG), nie raster (aby zostalo ostré pri všetkých rozmeroch)
- [ ] Logo má bodku (`Silwer.`)
- [ ] Logo je zarovnané podľa §2.1 (padding 8 % od okraja pásu)
- [ ] Claim nemá typo, žiadny dangling predložka na konci riadku
- [ ] Claim je v rámci EFSA compliance (nie "lieči", "vyliečia") — viď [visual-identity.md §6](visual-identity.md#6-efsa--sk-legislatíva--povolené-a-zakázané-tvrdenia)
- [ ] Farba akcentu zodpovedá kampani (jeden akcent na vizuál)
- [ ] Safe zones rešpektované (žiadny text v IG Stories UI oblasti)
- [ ] Export je v správnom formáte a rozmere pre cieľovú platformu
- [ ] Súbor je menší ako limit platformy (ads platformy majú vlastné limity)
- [ ] Filename kódovaný čitateľne: `silwer_{produkt}_{kampan}_{platforma}_{rozmer}.jpg`
  - príklad: `silwer_tribulus_sila-sa-vracia_meta_1080x1350.jpg`

---

## 8. Alternatíva — Logo priamo v Higgsfielde (Experimentálne)

Ak chceš experimentovať s Higgsfield Multi-Reference alebo Soul Projects:

### 8.1 Higgsfield Multi-Reference (obrázok)

1. V Higgsfield web UI pri vytváraní obrázka použi **Multi-Image Reference** (2–3 referencie súčasne)
2. Reference 1 = produkt (real product mockup z `assets/product-mockups/`)
3. Reference 2 = `assets/silwer-logo-white.png`
4. V prompte doplň: `Place the white "Silwer." logo from reference image 2 in the top-[left/right] of the black band, maintaining original proportions and exact typography; do not modify letterforms.`
5. **Úspešnosť: ~50–60 %.** Stále odporúčame finálne logo v post-produkcii.

### 8.2 Higgsfield Projects / Soul

1. Vytvor projekt "Silwer Brand" v Higgsfield web UI
2. Pinni do projektu: logo (white), logo (black), 3–5 produktových mockupov, 1 master styleboard s čiernym pásom
3. Každá nová generácia v rámci projektu automaticky zohľadní pinnuté assety
4. **Úspešnosť:** lepšia než ad-hoc Multi-Reference, ale stále **nedeterministická** — pri kritických vizuáloch vyžaduj post-produkciu

### 8.3 Odporúčanie

**Preferovaný workflow = AI dodá scénu → post-produkcia dodá logo + claim.**

Nespoliehať sa na to, že AI dá logo presne — je to rýchlejšie a lacnejšie opraviť v PS ako 20× regenerovať Higgsfield kredit-po-kredite.

---

## Referenčné súbory

- [visual-identity.md](visual-identity.md) — farby, typografia, pás anatómia
- [content-generation.md](content-generation.md) — 3-variant workflow, platform matrix
- [../assets/README.md](../assets/README.md) — ktoré súbory mať v `assets/`
