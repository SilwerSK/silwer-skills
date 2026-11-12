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
| Vianočný tubus | 517 | /vianocny-tubus/ | 6 € | 3, sklad 200 |
| Vianočný zlatý tubus | 520 | /vianocny-zlaty-tubus/ | 6 € | 4, sklad 100 |

Starý skrytý produkt „Čarovný Vianočný tubus“ (2024) má po novom adresu `/vianocny-tubus-2024/`,
nový tubus dostal `/vianocny-tubus/` (možnosť A).

Všetky produkty sú založené s **DPH 23 %** (predvolené v Shoptete) – v kroku 5 zmeniť na 19 %
a skontrolovať, že cena s DPH ostala (32 €, 39 €, …).

## Krok 2 a 3 – hotové (overené 12. 11.)
Súbory na CDN sú zhodné s `KODY/`, HTML kód načítava `?v=20261112a`. Popis kategórie Vianoce 2026
s bannerom je nasadený. Medzera v ceste `VIANOCE 2026` musí byť v popise zapísaná ako `%20`,
inak prehliadač mobilný obrázok v `srcset` ignoruje. Kontrola na webe: banner počítač 1200×498,
mobil 351×351, úvod, Gold, JOJ play a detaily produktov bez chýb JS.

## Krok 4 – hotový
Príznak Vianoce (kód `vianoce`) založený v Shoptete a priradený všetkým 11 produktom.

## Ďalej
- Krok 5 – ručne v admine: DPH, bežná cena, sada, množstevné zľavy
