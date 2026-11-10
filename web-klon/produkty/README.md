# Nové produkty na klone – náhľad pred Shoptetom

Shoptet nevie ukázať náhľad produktu skôr, než je zverejnený. Na klone
(https://silwer-klon.vercel.app) sa nový produkt dá poskladať a pozrieť presne tak,
ako bude vyzerať na webe: s redizajnom, cenami za balenia, krátkym aj dlhým popisom,
v kategóriách aj vo vyhľadávaní.

## Najjednoduchšie: povedz Claudovi

> *„Pridaj na klon nový produkt Kurkuma Forte – cena 19,90 €, 60 kapsúl, kategórie
> Silwer Gold a Novinky. Fotky a texty prikladám."*

Claude založí priečinok, vyrobí stránku, nasadí klon a pošle odkaz. Texty môžu byť
`karta.md` zo skillu `silwer-detail-produktu` a dlhý popis `produkt.json` / `blok.html`
zo skillu `silwer-dlhy-popis`.

## Čo je v priečinku produktu

Každý produkt má priečinok `web-klon/produkty/<slug>/` (vzor: `_vzor/`):

| Súbor | Čo to je | Ide potom do Shoptetu |
|---|---|---|
| `produkt.json` | údaje produktu (tabuľka nižšie) | názov, cena, kód, SEO |
| `kratky-popis.html` | krátky popis vedľa fotky | pole **Krátky popis** |
| `blok.html` | dlhý popis pod tlačidlom Do košíka | pole **Detailný popis** |
| `fotky/` | fotky produktu do galérie (prvá je hlavná) | obrázky produktu |
| `obrazky/` | fotky do dlhého popisu, kým nie sú nahraté v Shoptete | Správca súborov |

Namiesto `blok.html` môže byť v `produkt.json` rovno `"blok": [...]` vo formáte skillu
`silwer-dlhy-popis` – klon ho vyrenderuje tým istým `render_pp.py`.

## produkt.json

| Pole | Povinné | Príklad | Význam |
|---|---|---|---|
| `nazov` | ✅ | `"Kurkuma Forte"` | názov produktu (H1) |
| `cena` | ✅ | `19.90` | cena s DPH v € |
| `slug` | | `"kurkuma-forte"` | adresa `/kurkuma-forte/`; inak názov priečinka |
| `forma`, `pocet` | odporúčané | `"kap."`, `60` | balenie – z neho redizajn píše „60 kapsúl“ a cenu za kus (`kap.`, `tab.`, `g`, `ml`) |
| `kod` | | `"601"` | kód produktu |
| `kategoria` | | `"/gold/"` | hlavná kategória (drobčeky, Parametre) |
| `kategorie` | | `["/gold/", "/novinky/"]` | kde sa produkt ukáže vo výpise (vždy aj Všetky produkty) |
| `stitky` | | `["Novinka"]` | štítky na fotke; predvolene Novinka, `[]` = žiadne |
| `obrazky` | | `["fotky/01.png"]` | galéria; súbory v priečinku alebo celé URL |
| `mnozstevne_zlavy` | | `[[3, 0.8], [6, 0.7]]` | balenia 3 ks −20 %, 6 ks −30 % (predvolené) |
| `jednotkova_cena` | | `"0,33 € / 1 kap."` | inak sa dopočíta z ceny a počtu |
| `parametre` | | `{"EAN": "858…"}` | riadky v záložke Parametre |
| `seo` | | `{"title": …, "meta_description": …}` | titulok a popis stránky |
| `sablona` | | `"rybi-kolagen"` | stránka, z ktorej sa preberá rozloženie (predvolene Rybí kolagén – nový produkt bez hodnotení) |
| `skryty` | | `true` | len na priamom odkaze – nie vo výpisoch ani vo vyhľadávaní |

**Existujúci produkt:** ak `slug` patrí produktu, ktorý na webe už je, klon ukáže jeho
novú verziu (napr. prepísaný popis). Pôvodná stránka sa odloží a po zmazaní priečinka sa vráti.

## Vyrobiť a nasadiť

```bash
python3 web-klon/scripts/mirror.py --postprocess   # poskladá produkty, výpisy, vyhľadávanie
cd web-klon && npx vercel deploy --prod            # nasadenie (Vercel tím silwer)
```

Produkt z klonu odstránite zmazaním jeho priečinka a novým spustením príkazov vyššie.
Priečinky začínajúce `_` (napr. `_vzor`) sa preskakujú.

## Čo klon nevie

- Pridať do košíka a objednať – košík presmeruje na ostrý web, kde produkt ešte nie je.
- Hodnotenia a diskusiu – nový produkt je „Neohodnotený“.
- „Súvisiaci tovar“ pod produktom je prevzatý zo šablóny.

## Nové kategórie

Kategória, ktorá na webe ešte nie je (napr. **Vianoce 2026**), má priečinok
`web-klon/kategorie/<slug>/` s `kategoria.json`:

```json
{
  "nazov": "VIANOCE 2026",
  "slug": "vianoce-2026",
  "menu": { "text": "Vianoce 2026", "za": "/novinky/", "pred": "/super-zlavy/" },
  "seo": { "title": "…", "meta_description": "…" }
}
```

- Stránka sa poskladá z kategórie Silwer Gold (`"sablona"` ju zmení) – bez produktov.
- Produkty sa do nej dostanú cez `"kategorie": ["/vianoce-2026/", …]` v ich `produkt.json`
  (`"kategoria"` = hlavná kategória v drobčekoch).
- `menu.za` / `menu.pred` = vedľa ktorej existujúcej položky menu sa odkaz ukáže
  (desktop aj mobil, aj v rozbaľovacom menu Produkty). Bez `menu` sa v menu neukáže.
- Popis pod nadpisom: súbor `popis.html` v priečinku kategórie (voliteľné).
