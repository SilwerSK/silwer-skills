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
