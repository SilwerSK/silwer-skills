# Kreatíva – Vianoce 2026 (silwer.sk)

Odovzdávka pre kreatívnu session (13. 11. 2026). Technická session rieši Shoptet, skripty, klon
a nasadenie; táto rieši obrázky, galérie, bannery a texty.

## Stav
- Na webe je 8 vianočných balíčkov a 3 obaly v kategórii **VIANOCE 2026**
  (https://www.silwer.sk/vianoce-2026/), všetko zverejnené.
- Galérie produktov: `web-klon/produkty/<produkt>/fotky/` – `hero.jpg` (hlavná) a `galeria-NN.jpg`
  v poradí ako v Shoptete. Z akého zdroja je ktorá fotka: `web-klon/produkty/VIZUALY-vianoce-2026.md`.
- Náhľad každého produktu na klone: `https://silwer-klon.vercel.app/<slug>/`
  (fotky aj na `https://silwer-klon.vercel.app/klon/produkty/<slug>/<súbor>`).

| Produkt | slug |
|---|---|
| Žena 1. Krása a vitalita | zena-krasa-a-vitalita |
| Žena 2. Pokoj a imunita | zena-pokoj-a-imunita |
| Muž 1. Energia a imunita | muz-energia-a-imunita |
| Muž 2. Pohyb a sila | muz-pohyb-a-sila |
| Silwer GOLD. Žena. | gold-zena-plet-a-pokoj |
| Silwer Gold. Muž. | gold-muz-pecen-a-pokoj |
| SILWER JOJ play. Muž. / Žena. | joj-play-muz-imunita / joj-play-zena-imunita |
| Vianočná krabička / tubus / zlatý tubus | vianocna-krabicka / vianocny-tubus / vianocny-zlaty-tubus |

## Pravidlá, na ktorých sme sa dohodli
- Galéria je **štvorec 1:1** (Shoptet). Žiadne rozmazané pruhy hore/dole ako výplň.
- Keď ide o štvorec z obdĺžnika, najprv skús **výrez priamo z originálu**; AI dopĺňanie (outpaint)
  len keď výrez nestačí – raz pokazilo postavu (žena so zlatým tubusom).
- Ľudia na fotkách **po 50-ke** (cieľovka Silwer 50+), prirodzení, žiadne modelky.
- Obal (krabička s domčekmi, tubus, zlatý tubus) musí zostať presne taký, ako je – potlač, tvar, mašľa.
- Model: na jednoduché úpravy **Nano Banana 2.1** (2 kredity/obr. 2k); GPT Image 2.6 (2,75) len keď
  Nano Banana nestačí. Používateľ nechce sám triediť ani zmenšovať súbory.
- Texty: žiadne zdravotné tvrdenia mimo schválených (nariadenie 1924/2006), „Darujte zdravie“ len
  so schváleným tvrdením vedľa.

## Technické poznámky (Higgsfield, Disk)
- Zdroje na Disku: priečinok „Vianoce 2026“ (id `1hOumPtt1aoDpF4cSy5bniEXOwTSOk_ak`), imidžové vizuály
  (`1FI0YkQLUgDm1Hqrr1ZRe_MyRLyukFn3f`), dočasný TEMP (`1BJg8x2g08L8sbMcauXWXSADbcezbGNn0`).
- Súbory nad ~6 MB z Disku nestiahneš cez Drive MCP → `mcp__Higgsfield__media_import_url`
  s `https://drive.google.com/uc?export=download&id=<ID>`; fotky z galérie importuj z URL klonu.
- Úložisko Higgsfield uploadov (`d2ol7oe51mr4n9.cloudfront.net`) je z kontajnera **blokované**,
  výsledky generovania (`d8j0ntlcm91z4.cloudfront.net`) sa stiahnuť dajú.
- Nano Banana 2.1 znesie naraz asi **8 úloh**, viac vráti 429 (bez poplatku) → posielať po dávkach.

## Ako dostať novú fotku na web
Kreatíva pripraví finálny JPG 2000×2000 do `web-klon/produkty/<slug>/fotky/` (alebo do
`web-klon/kreativa/`), commitne a napíše do technickej session, ktorú fotku má nasadiť a na ktoré
miesto v galérii. Shoptet API fotky nevie mazať – staré maže používateľ v admine.
Pred pushom vždy `git pull --rebase` (obe session pracujú na vetve `claude/brave-wright-s10e18`).

## Rozpracované
**66 variantov fotiek s ľuďmi** (13. 11.): 11 fotiek × 3 varianty (iní ľudia po 50, iný uhol)
× 2 formáty (1:1, 3:4), Nano Banana 2.1. Zoznam s odkazmi na výsledky bude v
`web-klon/kreativa/varianty-2026-11-13.json` (doplní technická session hneď, ako generovanie dobehne).
Ďalší krok: ukázať používateľovi náhľady po pôvodných fotkách, nechať ho vybrať, vybrané zaradiť.
