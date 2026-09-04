---
title: "Dlhý popis pod produktom — návod pre človeka"
date: "2026-09-04"
project: "Silwer / silwer.sk"
status: active
tags: [silwer, shoptet, navod, dlhy-popis]
---

# Návod — ako dostať dlhý popis na web

Tento dokument je pre **človeka**, nie pre Clauda. Claude si číta `SKILL.md`.

Celé to trvá **15–20 minút na produkt**, z toho tvoja práca je asi 5 minút.

---

## Čo to robí

Vezme hotový text produktovej karty a spraví z neho **jeden HTML blok**, ktorý sa vloží do
poľa *Detailný popis* v Shoptete. To je tá časť stránky **pod tlačidlom Do košíka**.
Nahrádza to Pobo Page Builder.

---

## Poradie krokov

### 1. Text — skill `silwer-detail-produktu`

Najprv musí existovať **odsúhlasená karta**. Bez nej sa nezačína.

Povedz Claudovi: *„sprav kartu pre [produkt] podľa skillu silwer-detail-produktu"*.

Dostaneš `karta.md`. **Prečítaj si v nej sekciu „Zmeny oproti zdroju"** — je tam, čo sa
oproti pôvodnému textu na webe zmenilo a prečo. Väčšinou ide o zdravotné tvrdenia, ktoré
zložka nesmie niesť. **Toto je moment na tvoje pripomienky.** Keď to raz ide na web, meniť
to znova je zbytočná práca.

### 2. Obrázky — skill `silwer-higgsfield-visuals`

Claude vygeneruje obrázky a **zmenší ich na web** (JPG, do ~200 kB).
Z generátora chodia 2 MB PNG, tie by zabili rýchlosť stránky.

Ty ich potom nahráš:

> **Admin → Vzhľad a obsah → Správca súborov**

⚠️ **Nepoužívaj priečinok `Obrázky`** ani iný názov s diakritikou — dlhé `á` v adrese robí
tiché chyby. Použi napríklad `produkty/ashwagandha/`.

Po nahratí **klikni na súbor, skopíruj jeho URL a pošli ju Claudovi.** Toto je povinný krok —
Claude nemá ako uhádnuť, do ktorého priečinka si to dal. Overí si, že adresa naozaj funguje.

### 3. Blok — tento skill

Claude vyrenderuje `blok-inline.html` a skontroluje ho v náhľade na desktope aj na mobile.
Pošle ti súbor.

### 4. Vloženie do Shoptetu — 3 minúty, robíš ty

1. **Produkty** → nájdi produkt
2. Záložka **Popis** → pole **Detailný popis**
   *(to dlhé pod tlačidlom Do košíka)*
   ⚠️ **Krátkeho popisu sa nedotýkaj** — parametrové boxy sú samostatná vec
3. V editore klikni na **zdrojový kód** — ikona `<>`
4. **Označ všetko, zmaž, vlož nový obsah**
5. **Ulož rovno v režime zdrojového kódu.** Neprepínaj späť do vizuálneho editora —
   ten vie HTML prepísať
6. Voliteľne: záložka **SEO** → nový title a meta description z karty.
   **Slug (adresu) nemeň**

### 5. Kontrola — robíš ty

Otvor stránku **v anonymnom okne** (bez neho ťa oklame cache) a prejdi ju **aj na telefóne
až po pätu**.

Čo sledovať:

- Obrázky sa načítali
- Písmo v bloku je **rovnako veľké** ako v krátkom popise hore pri cene
- Medzi sekciami sú medzery, text nie je zlepený
- Tabuľka zloženia je čitateľná, pod ňou legenda k hviezdičkám
- FAQ sa rozbaľuje
- Dole je veta „Výživový doplnok. Nenahrádza pestrú stravu…"
- **Na mobile:** obrázok je vždy až za textom svojej sekcie, nie dva obrázky pod sebou

Ak niečo nesedí, **sprav screenshot a pošli ho.** Je to najrýchlejšia cesta k oprave —
tri z troch chýb v pilote odhalil práve screenshot z telefónu.

---

## Keď sa niečo pokazí

| Príznak | Čo sa stalo | Čo spraviť |
|---|---|---|
| Text je zlepený, bez medzier a fontov | editor zahodil štýly | pošli screenshot, treba iný spôsob vloženia |
| Obrázky sú prázdne štvorce | adresa obrázkov nesedí | pošli skutočnú URL zo Správcu súborov |
| Písmo v bloku je iné než hore | blok si veľkosť určuje sám | pošli screenshot, opraví sa dedením |
| Chcem to vrátiť | — | pôvodný text je zálohovaný v `produkty/zdroje/<slug>/` |

---

## Čo sa nesmie

- **Meniť adresu (slug) produktu.** Zmena obsahu Googlu nevadí, zmena adresy áno.
- **Prepínať do vizuálneho editora pred uložením.**
- **Nahrávať obrázky do priečinka s diakritikou.**
- **Meniť krátky popis** — to je iná časť stránky, rieši sa inde.
- **Meniť text tam a späť.** Nechaj novú verziu bežať aspoň 6–8 týždňov, inak sa nedá
  vyhodnotiť, či pomohla.

---

## Otázky, ktoré už padli

**Bude ma Google penalizovať za prepísanie textu?**
Nie. Penalizácia je za spam, cloaking, tenký a skopírovaný obsah — nie za prepis vlastného
textu na nezmenenej adrese. Pozície môžu pár dní kolísať, kým sa stránka pre-indexuje.
To nie je trest.

**Môžem sa vrátiť k starému textu?**
Áno, je zálohovaný. Ale rozhodni sa radšej raz — každá zmena resetuje meranie.

**Prečo blok nepoužíva CSS súbor?**
Pri pilote naschvál nie, aby sa nemuselo siahať do nastavení webu. Pri väčšom počte
produktov naň prejdeme — popis sa zmenší zo 14 kB na 7 kB a odomkne to jemnejší dizajn.
To bude samostatné rozhodnutie.
