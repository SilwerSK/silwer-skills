# Vianočný slide v karuseli na úvodnej stránke (12. 11. 2026)

Nový prvý slide: obrázok `hero-vianoce.jpg` (od 13. 11. podľa `hero_vianoce_kategoria.png` z Disku, 1920×824), nadpis „Vianočné darčeky pre rodičov“,
text „Darček pre mamu, otca, babku aj dedka. 8 balíčkov od 29 do 69 €, už zabalené pod stromček.“,
tlačidlo „Vybrať darček“ → /vianoce-2026/.

Texty podľa Marketing Mineru (13. 11., hľadanosť SK, november / december 2025): darček pre mamu 7 700 / 17 000,
darček pre otca 4 100 / 9 200, vianočné darčeky 6 200 / 6 200, darček pre rodičov 2 600 / 4 900,
darček pre babku 2 200 / 5 000, darček pre dedka 1 200 / 2 700, vianočné balíčky (s diakritikou aj bez) 1 550 / 1 550. Vyskúšané na ostrom webe (počítač, tablet, mobil) bez chýb.

Slidy karuselu definuje skript `silwer-redesign.min.js` (zoznam heroSlides). HTML v úvodnom texte
je len rýchla kópia na prvé zobrazenie – keď sa od skriptu líši, skript ho zahodí a postaví karusel znova.

## Postup (v tomto poradí)
Stav 13. 11.: na webe ešte nie je nič z tohto (obrázok na CDN chýba, HTML kód načítava `?v=20261112a`).

1. **Správca súborov** → `upload/obrazky/` → nahrať `hero-vianoce.jpg`
2. **Správca súborov** → `upload/KODY/` → nahradiť `silwer-redesign.min.js` (z priečinka KODY)
3. **HTML kód** → v riadku so `silwer-redesign.min.js` zmeniť `?v=20261112a` na `?v=20261112b`
4. **Úvodný text úvodnej stránky** → zdrojový kód → nahradiť všetko od `<!-- sw-ssr:start -->`
   po `<!-- sw-ssr:end -->` (vrátane) obsahom súboru `uvodny-text-karusel.html`.
   Krok 4 je odporúčaný, nie nutný: bez neho sa karusel pri načítaní krátko ukáže v starej podobe
   a potom sa prestavia.

## Po Vianociach
Vrátiť súbory z `zaloha-pred-hero-vianoce/` (skript + úvodný text) a v HTML kóde zvýšiť `?v=`.
Pozor: kým je vianočný slide prvý, nadpis H1 úvodnej stránky je „Vianočné darčeky pre rodičov“.
