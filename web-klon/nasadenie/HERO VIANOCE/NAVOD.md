# Vianočný slide v karuseli na úvodnej stránke (12. 11. 2026)

Nový prvý slide: obrázok `hero-vianoce.jpg`, nadpis „Vianočné balíčky Silwer“,
text „8 balíčkov pre mamu, babku, otca aj dedka. Od 29 do 69 €, už zabalené pod stromček.“,
tlačidlo „Vybrať balíček“ → /vianoce-2026/. Vyskúšané na ostrom webe (počítač, tablet, mobil) bez chýb.

Slidy karuselu definuje skript `silwer-redesign.min.js` (zoznam heroSlides). HTML v úvodnom texte
je len rýchla kópia na prvé zobrazenie – keď sa od skriptu líši, skript ho zahodí a postaví karusel znova.

## Postup (v tomto poradí)
1. **Správca súborov** → `upload/obrazky/` → nahrať `hero-vianoce.jpg`
2. **Správca súborov** → `upload/KODY/` → nahradiť `silwer-redesign.min.js` (z priečinka KODY)
3. **HTML kód** → v riadku so `silwer-redesign.min.js` zmeniť `?v=20261112a` na `?v=20261112b`
4. **Úvodný text úvodnej stránky** → zdrojový kód → nahradiť všetko od `<!-- sw-ssr:start -->`
   po `<!-- sw-ssr:end -->` (vrátane) obsahom súboru `uvodny-text-karusel.html`.
   Krok 4 je odporúčaný, nie nutný: bez neho sa karusel pri načítaní krátko ukáže v starej podobe
   a potom sa prestavia.

## Po Vianociach
Vrátiť súbory z `zaloha-pred-hero-vianoce/` (skript + úvodný text) a v HTML kóde zvýšiť `?v=`.
Pozor: kým je vianočný slide prvý, nadpis H1 úvodnej stránky je „Vianočné balíčky Silwer“.
