# Nasadenie na ostrý web – Vianoce 2026 v menu

Horné menu (aj rozbaľovacie „Produkty“ a mobilné menu) nekreslí Shoptet, ale skript
redizajnu – položky sú natvrdo v `silwer-redesign.js` (zoznamy `PRODUKTY` a `MENU`)
a záložne v `silwer-header-footer.js`. Zapnutie kategórie v administrácii ich nepridá.

V `KODY/` sú aktuálne súbory z ostrého webu (stiahnuté 10. 11. 2026) s jedinou zmenou:
pribudlo `['Vianoce 2026','/vianoce-2026/']` – v hlavnom menu pred Superzľavami,
v menu Produkty za Novinkami 2026.

## Postup

1. **Vzhľad a obsah → Správca súborov → upload/KODY/** – nahrať a prepísať oba súbory.
2. **Vzhľad a obsah → Editor → HTML kód** (kde sú `<script src=…KODY/…>`): zvýšiť verziu,
   inak ostane rok v cache:
   - `silwer-redesign.js?v=20261107b` → `silwer-redesign.js?v=20261110a`
   - `silwer-header-footer.js?v=20261023g` → `silwer-header-footer.js?v=20261110a`
3. Skontrolovať v anonymnom okne, desktop aj mobil.

⚠️ Ak medzitým niekto upravil tieto súbory na webe, treba zmenu urobiť do jeho verzie
(sú to 2 riadky v `silwer-redesign.js` a 2 v `silwer-header-footer.js`).

# Obsah balíčka vo výpise kategórie + doprava zadarmo

`KODY/silwer-balicky.js`:
- **výpis kategórie** – do karty balíčka dopíše zoznam produktov (bez cien), „Spolu jednotlivo“
  a zelený štítok **Ušetríte xx,xx €**; pri balíčku od 40 € riadok „✓ Doprava zadarmo“,
- **detail balíčka** – pod cenu zelený panel: jednotlivo → cena balíčka → **Ušetríte xx,xx €**,
- **štítok Vianoce** – zelený s ikonou jedličky (príznak s kódom `vianoce` alebo textom „Vianoce“). Dáta (zloženie a ceny) sú priamo
v súbore – generuje ho `web-klon/scripts/produkty.py` z `produkt.json` (pole `balicek`).
Pri zmene ceny alebo zloženia balíčka treba súbor vygenerovať a nahrať znova.

⚠️ Adresy v ňom sú adresy z klonu (`/zena-krasa-a-vitalita/` …). Ak sa produkt v Shoptete
založí s inou adresou, treba ju v súbore zmeniť.

1. Nahrať `silwer-balicky.js` do **Správca súborov → upload/KODY/**.
2. Do **Editor → HTML kód → pätička** pridať:
   `<script src="https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/KODY/silwer-balicky.js?v=20261111k" defer></script>`

# Príznaky nad názvom (Imunita, Stres, …)

Kreslí ich redizajn z kategórií „Hľadám niečo na“, v ktorých je produkt zaradený
(dáta z silwer-data.vercel.app, obnova do hodiny). V Shoptete stačí zaradiť balíček
do príslušných podkategórií „Hľadám niečo na“ – zoznam je v `produkt.json` → `kategorie`.

# Štítok Vianoce

V Shoptete: **Nastavenia → Produkty → Príznaky** – nový príznak „Vianoce“ (kód `vianoce`),
pridať ho balíčkom. Farbu a ikonu jedličky doplní `silwer-balicky.js`, farba v administrácii
nehrá rolu (redizajn by ho inak vykreslil sivo).
