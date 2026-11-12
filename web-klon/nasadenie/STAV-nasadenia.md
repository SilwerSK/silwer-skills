# Stav nasadenia Vianoce 2026 – 12. 11. 2026

## Krok 1 – hotový (Claude cez API)

Všetky produkty sú **skryté**. Texty, SEO, kategórie a fotky sú rovnaké ako na klone.

| Produkt | Kód | Adresa | Cena | Fotky |
|---|---|---|---|---|
| Žena 1. Krása a vitalita (testovací, prepísaný) | 511 | /zena-krasa-a-vitalita/ | 32 € | 9 nových + 4 staré na zmazanie |
| Žena 2. Pokoj a imunita | 523 | /zena-pokoj-a-imunita/ | 39 € | 9 |
| Muž 1. Energia a imunita | 526 | /muz-energia-a-imunita/ | 33 € | 9 |
| Muž 2. Pohyb a sila | 529 | /muz-pohyb-a-sila/ | 33 € | 9 |
| Silwer GOLD. Žena. | 532 | /gold-zena-plet-a-pokoj/ | 69 € | 7 |
| Silwer Gold. Muž. | 535 | /gold-muz-pecen-a-pokoj/ | 69 € | 6 |
| SILWER JOJ play. Muž. | 538 | /joj-play-muz-imunita/ | 29 € | 6 |
| SILWER JOJ play. Žena. | 541 | /joj-play-zena-imunita/ | 29 € | 6 |
| Vianočná krabička | 514 | /vianocna-krabicka/ | 6 € | 8, sklad 200 |
| Vianočný tubus | 517 | **/vianocny-tubus-2/** ⚠️ | 6 € | 3, sklad 200 |
| Vianočný zlatý tubus | 520 | /vianocny-zlaty-tubus/ | 6 € | 4, sklad 100 |

⚠️ Adresa `/vianocny-tubus/` patrí starému skrytému produktu „Čarovný Vianočný tubus“ (2024),
preto Shoptet dal novému tubusu `-2`. Skript `silwer-balicky.js` a odkazy v balíčkoch JOJ play
počítajú s `/vianocny-tubus/` – treba rozhodnúť (pozri nižšie) pred zverejnením.

Všetky produkty sú založené s **DPH 23 %** (predvolené v Shoptete) – v kroku 5 zmeniť na 19 %
a skontrolovať, že cena s DPH ostala (32 €, 39 €, …).

Popis kategórie Vianoce 2026 (banner) sa doplní **až po kroku 2**, keď budú obrázky
v `upload/VIANOCE 2026/`.

## Ďalej
- Krok 2 a 3 (súbory, HTML kód) – podľa `README.md`
- Krok 4 – príznak `vianoce`, potom ho Claude priradí balíčkom
- Krok 5 – ručne v admine: DPH, bežná cena, sada, množstevné zľavy
