# Nasadenie Vianoce 2026 na www.silwer.sk

Overené 12. 11. 2026 proti ostrému webu: súbory v `KODY/` vychádzajú z **aktuálnych** skriptov
na webe (`silwer-redesign.min.js`, `silwer-header-footer.min.js`, verzia `20261111c`).
Vyskúšané na ostrých stránkach (úvod, kategória, Gold, detail produktu, počítač aj mobil) bez chýb.

## Čo je zmenené oproti webu

| Súbor | Zmena |
|---|---|
| `KODY/silwer-redesign.min.js` | položka **Vianoce 2026** v hlavnom menu (pred Superzľavami) a v menu Produkty (za Novinkami); banner kategórie z obrázka s triedou `sw-cathero` (mobil: `sw-cathero-m`) |
| `KODY/silwer-header-footer.min.js` | tá istá položka menu (záloha, keď redizajn nenačíta) |
| `KODY/silwer-balicky.js` | **nový** – zoznam produktov a úspora v karte balíčka, panel úspory v detaile, zelený štítok Vianoce, hodnotenia produktov v balíčku, skrytie detailu pri obaloch |
| `VIANOCE 2026/*.jpg` | banner kategórie – počítač a mobil |

Ostatné súbory (`silwer-redesign.css`, `silwer-ux.js`, `silwer-reviews.min.js`…) sa nemenia.

⚠️ Ak by niekto medzitým na webe nahral novšie `silwer-redesign.min.js` alebo
`silwer-header-footer.min.js`, nenahrávajte tieto – dajte vedieť, zmeny sa prenesú do novej verzie.

---

## Postup

### Krok 1 – produkty a kategória (urobí Claude cez API)
Založí 10 produktov ako **skryté**, prepíše testovací produkt „Žena. Krása a vitalita“,
nastaví adresy, texty, kategórie, fotky, sklad obalov a popis kategórie Vianoce 2026.

### Krok 2 – súbory (5 min)
**Vzhľad a obsah → Správca súborov**
1. do priečinka `upload/KODY/` nahrať a prepísať: `silwer-redesign.min.js`, `silwer-header-footer.min.js`, a nahrať nový `silwer-balicky.js`
2. vytvoriť priečinok `upload/VIANOCE 2026/` a nahrať oba obrázky z `VIANOCE 2026/`

### Krok 3 – HTML kód (2 min)
**Vzhľad a obsah → Editor → HTML kód**
1. v dvoch riadkoch zmeniť `?v=20261111c` na `?v=20261112a`:
   - `…/KODY/silwer-redesign.min.js?v=20261112a`
   - `…/KODY/silwer-header-footer.min.js?v=20261112a`
2. do **pätičky** pridať riadok:
   ```html
   <script src="https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/KODY/silwer-balicky.js?v=20261112a" defer></script>
   ```

### Krok 4 – príznak Vianoce (1 min, ak ešte nie je)
**Nastavenia → Produkty → Príznaky** → nový príznak **Vianoce**, kód **`vianoce`**, farba hocijaká
(zelenú s jedličkou doplní skript). Potom napíšte Claudovi – priradí ho balíčkom.

### Krok 5 – v každom z 11 produktov (cca 3 min / produkt)
| Čo | 8 balíčkov | 3 obaly |
|---|---|---|
| DPH **19 %** | ✔ | ✔ |
| **Bežná (prečiarknutá) cena** – zoznam nižšie | ✔ | – |
| Typ **Sada** + položky sady (zoznam v `produkty/<balíček>/karta.md`) | ✔ | – |
| Vypnúť **množstevné zľavy** | ✔ | ✔ |
| Pri testovacom produkte zmazať 4 staré fotky (prvá má byť hero) | len Žena 1 | – |

Bežné ceny: Žena 1 – 42,59 € · Žena 2 – 48,89 € · Muž 1 – 44,89 € · Muž 2 – 45,34 € ·
Silwer Gold Muž / GOLD Žena – 91,83 € · JOJ play Muž / Žena – 42,40 €.

### Krok 6 – kontrola a zverejnenie
1. v anonymnom okne otvoriť `/vianoce-2026/` a jeden balíček (počítač aj mobil)
2. produkty zviditeľniť (alebo napíšte Claudovi)

## Návrat späť
V `zaloha-pred-nasadenim/` sú súbory, ktoré sú na webe teraz (stiahnuté 12. 11. 2026).
Ak by niečo nefungovalo: nahrať ich späť do `upload/KODY/`, v HTML kóde vrátiť `?v=20261111c`
a odstrániť riadok so `silwer-balicky.js`. Produkty ostávajú skryté, kým ich nezverejníte.
