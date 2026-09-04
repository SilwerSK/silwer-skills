# Content Generation Workflow (v2.0)

Od briefu k 3 hotovým JSON-om + copy. Vychádza z vizuálneho systému vo [visual-identity.md](visual-identity.md) a reálnych príkladov v [real-examples.md](real-examples.md).

---

## Vstupný Brief

| Pole | Možnosti | Default |
|---|---|---|
| **Formát** | obrázok / video / founder Reel scenár | obrázok |
| **Platforma** | IG feed / Stories / Reels / FB / Google Display / Newsletter | IG feed |
| **Produkt** | konkrétny názov | nutné |
| **Typ kampane** | produktový / akcia / sezónny / awareness day / brand / testimoniál / súťaž | produktový |
| **Layout** | A (panel) / B (kruhy) / C (koncept) | podľa typu kampane |
| **Subjekt** | žena / muž / pár / bez osoby | 3 varianty + 4 voliteľne |
| **Počet variantov** | 3 + 1 | 3 |

**Voľba layoutu:** produkt/cena/balíček → **A** · benefity jedného produktu → **B** · sezóna/awareness/vtip → **C**.

**Vizuálny nápad:** pri C vždy navrhni 2–3 metafory a vyber najsilnejšiu (vzory: plavky na šnúre = chudnutie; hodvábne srdce = tlak; lopta = MS).

---

## Platform Matrix

| Platforma | Ratio | Rozlíšenie |
|---|---|---|
| Instagram feed | 4:5 / 1:1 | 1080×1350 / 1080×1080 |
| Stories / Reels | 9:16 | 1080×1920 |
| Facebook post | 1:1 / 4:5 | 1200×1200 / 1200×1500 |
| Meta + Google banner | 1.91:1 | 1200×628 |
| Google Display square / vertikál | 1:1 / 3:4 | 1200×1200 / 900×1200 |
| Newsletter (Leadhub) | 3:1 | 1200×400 |
| Web hero | 21:9 / 16:9 | 1920×820 |

Video výstupy podľa reálneho archívu: 1080×1920 + 1080×1080 verzia každého spotu.

---

## 3-Variant Workflow

1. **Žena solo** (50–60, ideálne 53–58, aktívna stredná trieda)
2. **Muž solo** (50–60, aktívna stredná trieda)
3. **Produktová / konceptuálna** (bez osoby — metafora, surovina, hero packshot)
4. *(voliteľne)* **Pár** — brand/sezónne/xmas kampane

Všetky varianty kampane zdieľajú **rovnaký layout a rovnaký vizuálny nápad** — líšia sa subjektom a scénou.

---

## JSON Šablóny — Obrázok (Nano Banana 2 @ Higgsfield)

> Produkt uploaduješ ako **referenciu** — prompt neopisuje jeho vizuál, len umiestnenie. Text/logo/kruhy/cenovky = post-produkcia.

### Layout A — panel

```json
{
  "tool": "Nano Banana 2 (Higgsfield)",
  "style": "High-End Commercial Photography",
  "prompt": "[Shot type], [subject: woman/man 50-60y, active middle-class, healthy and vital / OR conceptual object], [activity/scene], [environment: attainable everyday European setting], [lighting], vivid natural colors, natural skin texture with visible pores and fine lines, salt-and-pepper hair (not fully white), 8k, premium editorial commercial look. Layout: SOLID BLACK VERTICAL PANEL on the [LEFT/RIGHT] side covering ~45% of frame width, dark graphic layer (#000000), sharp vertical edge, no transparency. Reference product [Name] in the LOWER portion of the panel — height ~50% of frame height, centered in panel, perfectly upright, use reference as-is. Remaining ~55% shows the scene. Technical specs: [Camera from rotation].",
  "negative_prompt": "[MASTER LIST + Layout A dodatok — viď visual-identity.md §7]",
  "aspect_ratio": "4:5"
}
```

### Layout B — monochromatická scéna

```json
{
  "tool": "Nano Banana 2 (Higgsfield)",
  "style": "High-End Commercial Photography",
  "prompt": "[Close-up/medium shot], [subject: woman/man 50-60y torso or hands, wearing vivid [COLOR] athletic/casual wear], holding the reference product [Name] at center chest height with both hands, product perfectly upright and sharp, use reference as-is. FULL-BLEED composition — [COLOR] dominates the entire frame tonally, clean negative space in corners for graphic overlays, soft studio light, vivid natural colors, natural skin texture, 8k, premium commercial photography. Technical specs: [Camera].",
  "negative_prompt": "[MASTER LIST + Layout B dodatok]",
  "aspect_ratio": "1:1"
}
```

### Layout C — konceptuálna metafora

```json
{
  "tool": "Nano Banana 2 (Higgsfield)",
  "style": "High-End Advertising Photography",
  "prompt": "FULL-BLEED conceptual advertising scene: [visual metaphor, e.g. red bikini and striped swim shorts hanging on a clothesline against vivid blue summer sky / surreal anatomical heart made of red silk with a gift bow on light grey background]. Clean minimal composition, generous empty space at the TOP for headline and at the [LEFT/RIGHT] BOTTOM for product placement, one clear visual idea, vivid saturated colors, witty premium advertising look, 8k. Technical specs: [Camera].",
  "negative_prompt": "[MASTER LIST + Layout C dodatok]",
  "aspect_ratio": "1.91:1"
}
```

## JSON Šablóna — Video (Kling 2.5 / Veo 3.1 @ Higgsfield)

```json
{
  "tool": "Kling 2.5 / Veo 3.1 (Higgsfield)",
  "prompt": "[Camera movement: slow tracking / gentle dolly / locked-off], [subject 50-60y, active middle-class, in motion / conceptual scene in motion, e.g. swimwear swaying on clothesline in breeze], [environment], cinematic lighting, vivid natural colors, commercial editorial quality, natural skin texture. [Pri Layoute A pridaj: Graphic frame: SOLID BLACK VERTICAL PANEL on the [LEFT/RIGHT] side covers 45% of frame as static overlay that does NOT move with camera; product locked inside panel; live action only in remaining 55%.]",
  "negative_prompt": "[VIDEO MASTER LIST — visual-identity.md §7]",
  "duration": "6s",
  "aspect_ratio": "9:16",
  "motion_intensity": "medium"
}
```

## Founder Reel — scenárová šablóna (reálne natáčanie, nie AI)

```
HOOK (0–3 s): [číslo/tvrdenie, 1 veta — CAPS na kľúčové slovo]
TELO (3–25 s): [2–3 vety edukácie / demo s produktom]
CTA (25–35 s): [otázka na komunitu alebo odkaz na web]
Titulky: biely bold blok, safe-zone stred. Lokácie: ulica / terasa / sklad / ihrisko.
```

---

## Sezónny Kalendár

| Obdobie | Produkty | Poznámka |
|---|---|---|
| Jan–feb | Kolagén, D3+K2, Magnézium | Nový rok / resolution → GLP1 |
| Jar (mar–máj) | Zdravá pečeň, Probio, Luteín, Berberín | **17. máj Svetový deň hypertenzie** (Balíček SRDCE), Deň bez tabaku (31. máj) |
| Leto (jún–aug) | GLP1 (plavková sezóna), Omega-3, Magnézium | Veľké športové eventy (MS futbal/hokej) → lopta/merch promo + súťaže |
| Jeseň (sep–nov) | Imunita (C, Zinok, D3), Ashwagandha, Melatonín (posun času) | Halloween 2+1 |
| Black Friday | všetko | Neón pink akcent |
| Vianoce (dec) | Gift sety, B2B balíčky | Silwester, Adventný kalendár |

**Awareness days:** vždy over aktuálny kalendár zdravotných dní pre daný mesiac — Silwer ich aktívne využíva (hypertenzia, tabak…). K veľkým športovým eventom navrhni merch/súťažný koncept.

---

## Príklad copy (produktový post, IG feed)

> Cítite, že vám srdce po päťdesiatke pripomína, že treba naň dbať?
>
> Omega-3 mastné kyseliny EPA a DHA prispievajú k normálnej funkcii srdca. V Silwer Omega-3 dostanete koncentráciu bez chuti rýb.
>
> Viac na www.silwer.sk → Omega-3
>
> #Silwer #Zdravie50plus #Omega3 #ZdravéSrdce

**+ Bonus content mix ku kampani** (vždy priložiť):
- Engagement post: „Koľko minút denne venujete svojmu srdcu?"
- Founder Reel hook: „Toto JEDNO číslo o vašom srdci by ste mali poznať naspamäť"

---

## Posting plán (vzor)

| Deň | Čas | Platforma | Formát |
|---|---|---|---|
| Pon | 18:00 | IG feed + FB | Varianta 1 (žena) |
| Ut | 10:00 | FB | Engagement otázka |
| Str | 12:00 | FB + IG | Varianta 3 (koncept) |
| Štv | 17:00 | Reels | Founder Reel |
| Pia | 17:00 | IG feed | Varianta 2 (muž) |
| Ned | 10:00 | Stories | Recyklácia 1/3 |

---

## Kontrolný Checklist

- [ ] Layout A/B/C zvolený a rovnaký vo všetkých variantoch
- [ ] 3 (+1) varianty s rôznou kamerou z rotácie
- [ ] Negatívny prompt = master list + layout dodatok
- [ ] Aspect ratio podľa platformy
- [ ] Copy: slovenčina, vykanie s malým písmenom (vy, vám, váš)
- [ ] Žiadne zakázané health claims (EFSA)
- [ ] Bonus content mix (engagement post + Reel hook) priložený
- [ ] Posting plán navrhnutý
