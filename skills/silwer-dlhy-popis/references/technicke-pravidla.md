---
title: "Shoptet Samba — technické pravidlá pre blok pod produktom"
date: "2026-09-04"
project: "Silwer / silwer.sk · Shoptet, šablóna Samba (template-14), projectId 572661"
status: active
tags: [silwer, shoptet, samba, css, technicke]
---

# Technické pravidlá

Každé pravidlo tu je **namerané na živej stránke**, nie prevzaté z dokumentácie.
Všetky vznikli počas pilotu na Ashwagandhe 4.9.2026.

## Namerané hodnoty silwer.sk

| Vec | Hodnota | Ako zmerané |
|---|---|---|
| `html` root font-size | **10 px** (`font-size:62.5%`) | computed style |
| `.basic-description` (kontext bloku) | 16 px / line-height 24 px / Roboto | computed style |
| Krátky popis nad tlačidlom | 16 px / 24 px / weight 500 | computed style |
| Šírka stĺpca popisu | 1026 px | `getBoundingClientRect()` |
| Limit poľa `DESCRIPTION` | 32 767 znakov | Shoptet dokumentácia |
| Limit sekcie HTML kódov | 8 192 znakov na sekciu | OpenAPI `maxLength` |

---

## 1. Žiadne `rem`

Samba používa `html{font-size:62.5%}` — starý trik, aby `1rem = 10px` a počítalo sa v desiatkach.
**Znamená to, že `1rem` NIE JE 16 px.**

Prvá verzia bloku použila `rem` a na živej stránke vyšlo:

| Prvok | Zapísané | Reálne |
|---|---|---|
| hlavička tabuľky | `.72rem` | **7,2 px** |
| bunky tabuľky | `1rem` | **10 px** |
| otázka vo FAQ | `1.08rem` | **10,8 px** |
| nadpis sekcie | `2rem` | **20 px** |

Odseky boli v poriadku len preto, že mali `18px` natvrdo — a práve ten nepomer to prezradil.

## 2. Obal nenastavuje `font-size` ani `font-family`

Druhá verzia mala na obale `font-size:18px`. Krátky popis nad tlačidlom má 16 px, takže blok
bol o 12,5 % väčší a vzdušnejší (line-height 29,7 vs 24 px) a stránka pri scrollovaní pôsobila
ako **dva zlepené kusy**.

**Riešenie: obal veľkosť nenastavuje — dedí ju.** Overené, že zdedí `16px / 24px / Roboto`
z `.basic-description`.

Bonus: keď redizajn presunie stránku na 18 px (pravidlo z `DESIGN.md`), blok sa preškáluje
sám o 1,125 bez zásahu do 113 popisov.

**Odchýlky výhradne cez `em`** — je relatívne k rodičovi, takže škáluje spolu s dedenou veľkosťou.

| Prvok | Hodnota | Pri zdedených 16 px |
|---|---|---|
| nadpis sekcie | `1.75em` | 28 px |
| otázka vo FAQ | `1.15em` | 18,4 px |
| odsek, bunky tabuľky, benefity | dedí | 16 px |
| podriadený riadok tabuľky | `.95em` | 15,2 px |
| hlavička tabuľky | `.8em` | 12,8 px |
| legenda | `.85em` | 13,6 px |
| disclaimer | `.9em` | 14,4 px |
| popisky dávkovania | `.72em` | 11,5 px |
| číslo v `stats` | `2.8em` | 44,8 px |

⚠️ **`em` sa pri vnorení násobí.** Nikdy nedávaj em-prvok do em-prvku. V súčasnom rendereri
taký prípad nie je — každý em-prvok má rodiča bez nastavenej veľkosti.

## 3. Text v HTML vždy pred obrázkom

Pri zalomení do jedného stĺpca sa poradie riadi **DOM-om**, nie smerom flexu. Keď mal druhý
split obrázok v HTML prvý (aby na desktope vyšiel vľavo), na mobile skončili **dva obrázky
hneď pod sebou** a čitateľ ich vnímal ako galériu, nie ako dve sekcie.

**Riešenie:** text je v HTML vždy prvý, strana sa mení cez `flex-direction: row-reverse`.

| | Desktop | Mobil (375 px) |
|---|---|---|
| `strana: right` | `flex-direction: row` → obrázok vpravo | nadpis → text → obrázok |
| `strana: left` | `flex-direction: row-reverse` → obrázok vľavo | nadpis → text → obrázok |

## 4. Inline `style=""` áno, `<style>` nie

Zmerané na exporte 113 produktov silwer.sk:

| Čo | Koľko produktov | Záver |
|---|---|---|
| `<style>` blok v popise | **0 zo 113** | správanie editora neoverené — nepoužívať |
| inline `style=""` | **72 zo 113** | preukázateľne funguje |
| `<script>` | 0 zo 113 | nepoužívať |

## 5. Žiadne media queries

Do inline štýlu sa nedajú napísať. Responzivita stojí na `flex-wrap` + `flex-basis:340px` —
stĺpce sa zlomia samy, keď nie je miesto. Overené na 375 px: žiadny horizontálny scroll.

Toto je hlavný dôvod, prečo pri väčšom počte produktov prejsť na `silwer-pdp.css`.

## 6. Náhľad musí verne simulovať stránku

Lokálny náhľad na štandardnom prehliadači **nemôže odhaliť chybu s `rem` ani nepomer veľkostí**,
lebo beží na roote 16 px a v prázdnom kontexte. Náhľad preto musí obsahovať:

```css
html{font-size:62.5%}                            /* root 10px ako Samba */
.basic-description{font-size:16px;line-height:24px}  /* kontext, do ktorého blok padne */
.wrap{max-width:1026px}                          /* reálna šírka stĺpca */
```

## 7. Overovanie po nasadení

**Nespoliehaj sa na oko ani na screenshot.** Zmeraj computed štýly priamo na stránke:

```js
var blok = document.querySelector('div[style*="1240"]');
getComputedStyle(blok.querySelector('p')).fontSize          // musí sedieť s krátkym popisom
getComputedStyle(document.querySelector('.p-short-description p')).fontSize
```

Pri kontrole obrázkov odstráň `loading="lazy"`, inak sa tie mimo výrezu tvária ako nenačítané.

---

## Čo ešte nie je overené

1. **Či WYSIWYG editor prežije markup**, keď niekto popis otvorí a uloží vo vizuálnom režime.
   Vkladanie cez zdrojový kód a uloženie bez prepnutia funguje.
2. **Koľko miesta je voľného v HTML kódoch.** Nameraných 5 455 znakov je jeden inline `<style>`
   blok v renderovanom HTML — nie nutne celý obsah sekcie. Pred zápisom pozrieť v admine.
3. **Správanie po redizajne.** Blok dedí font aj veľkosť, takže by sa mal prispôsobiť — overiť.
