---
title: "Dlhý popis pod produktom — návod pre človeka"
date: "2026-09-15"
verzia: "2.0"
project: "Silwer / silwer.sk"
status: active
tags: [silwer, shoptet, navod, dlhy-popis]
---

# Návod — ako spraviť dlhý popis produktu

Tento dokument je pre **človeka**, nie pre Clauda. Claude si číta `SKILL.md`.

**Tvoja práca je asi 10 minút na produkt.** Zvyšok spraví Claude.

---

## Čo z toho vznikne

Obsah stránky **pod tlačidlom Do košíka** — edukačné sekcie s fotkami, infografiky,
tabuľka zloženia, benefity, dávkovanie a rozbaľovacie otázky.

Vzor, ako to má vyzerať: **`silwer.sk/glp-1/`**. Nové produkty robíme v tom štýle.

---

## Postup

### 1. Text — povedz Claudovi

> *„Sprav kartu pre [produkt] podľa skillu silwer-detail-produktu."*

Dostaneš `karta.md`. **Prečítaj si v nej sekciu „Zmeny oproti zdroju".**

Je tam, čo sa oproti pôvodnému textu zmenilo a prečo. **Väčšinou ide o zdravotné tvrdenia,
ktoré zložka nesmie niesť** — a to nie je Claudova prehnaná opatrnosť, je to nariadenie
1924/2006 a pokuty sú reálne.

**Toto je moment na tvoje pripomienky.** Keď to raz ide na web, meniť to znova je zbytočná práca.

### 2. Fotky — Claude ich vygeneruje

Povieš:

> *„Vygeneruj fotky k [produkt]."*

Claude napíše prompty podľa brand pravidiel a vygeneruje tri obrázky (~minúta).
Pošle ti ich zmenšené na web (~150 kB).

**Pozri sa na ne.** Čo má sedieť: žena vyzerá na 50–55 (nie staršie), tvári sa prirodzene,
žiadne nápoje v zábere, žiadne nemocničné prostredie, ruky majú správny počet prstov.
Ak niečo nesedí, povedz — pregeneruje sa to za minútu.

### 3. Nahraj fotky — toto robíš ty

> **Admin → Vzhľad a obsah → Správca súborov**

⚠️ **Priečinok bez diakritiky.** Nie `Obrázky` — dlhé `á` v adrese robí tiché chyby.
Použi napríklad `produkty/dobry-spanok/`.

**Po nahratí klikni na súbor, skopíruj URL a pošli ju Claudovi.** Povinný krok —
Claude nemá ako uhádnuť, kam si to dal.

### 4. Blok — Claude ho vyrenderuje

Dostaneš `blok.html`. Predtým ho skontroluje na počítači aj v mobilnej šírke.

### 5. Vlož do Shoptetu — 3 minúty, robíš ty

1. **Produkty** → nájdi produkt
2. Záložka **Popis** → pole **Detailný popis**
   ⚠️ **Krátkeho popisu sa nedotýkaj** — je to iné pole
3. V editore klikni na **zdrojový kód** — ikona `<>`
4. **Označ všetko, zmaž, vlož nový obsah**
5. **Ulož rovno v režime zdrojového kódu.** Neprepínaj späť do vizuálneho editora
6. Voliteľne: záložka **SEO** → nový title a meta z karty. **Slug (adresu) nemeň**

### 6. Skontroluj

Otvor stránku **v anonymnom okne** (inak ťa oklame cache) a prejdi ju **aj na telefóne**.

- Obrázky sa načítali
- Písmo v bloku je **rovnako veľké** ako v krátkom popise hore pri cene
- Medzi sekciami sú medzery
- Tabuľka má sivé pruhy, pod ňou legenda k hviezdičkám
- Benefity majú zelené kolieska
- Otázky sa rozbaľujú a majú šípku
- **Na mobile:** obrázok je vždy až za textom svojej sekcie, infografiky sa zalomili

Ak niečo nesedí, **sprav screenshot a pošli ho.** Je to najrýchlejšia cesta — väčšinu chýb
v tomto systéme odhalil práve screenshot z telefónu.

---

## Keď sa niečo pokazí

| Príznak | Čo sa stalo | Čo spraviť |
|---|---|---|
| Blok je holý text bez štýlov | Nenačítalo sa CSS | Skontroluj `<link>` v Záhlaví — hlavne **presný názov súboru a verziu** |
| Zmenili sme CSS a nič sa nestalo | **Ročná cache** | V `<link>` musí byť nová verzia `?v=…`. Claude ju vypíše |
| Obrázky sú prázdne štvorce | Adresa nesedí | Pošli skutočnú URL zo Správcu súborov |
| Text je zlepený | Editor zahodil štýly | Pošli screenshot |
| Chcem to vrátiť | — | Pôvodný text je zálohovaný v `produkty/zdroje/<slug>/` |

---

## Čo sa nesmie

- **Meniť adresu (slug) produktu.** Zmena obsahu Googlu nevadí, zmena adresy áno
- **Prepínať do vizuálneho editora pred uložením**
- **Nahrávať obrázky do priečinka s diakritikou**
- **Meniť krátky popis** — iné pole, rieši sa zvlášť
- **Meniť text tam a späť.** Nechaj verziu bežať 6–8 týždňov, inak sa nedá vyhodnotiť
- **Upravovať CSS kvôli jednému produktu.** Je jedno pre všetkých 113 — rozíde sa to a nikto si nevšimne

---

## Otázky, ktoré už padli

**Bude ma Google penalizovať za prepísanie textu?**
Nie. Penalizácia je za spam, cloaking, tenký a skopírovaný obsah — nie za prepis vlastného
textu na nezmenenej adrese. Pozície môžu pár dní kolísať, kým sa stránka pre-indexuje.

**Prečo sú čísla a infografiky text a nie pekné obrázky?**
Lebo AI generátory komolia slovenskú diakritiku, obrázok sa nedá vyhľadať ani preložiť,
na mobile sa nezalomí a musí sa nahrávať zvlášť. GLP-1 má „80 %" ako obrázok — a Google
ho preto nevidí. Fotky robíme AI, čísla a zoznamy HTML.

**Môžem si pre svoj produkt zmeniť farby alebo rozloženie?**
Nie, a je to zámer. Jednotný vzhľad naprieč katalógom je hodnota. Ak naozaj chýba komponent,
je postup na konci `references/komponenty.md` — ale je to zmena pre všetky produkty naraz.
