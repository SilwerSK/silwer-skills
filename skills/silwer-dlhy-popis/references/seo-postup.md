---
title: "SEO postup pri prepise dlhého popisu"
date: "2026-09-04"
project: "Silwer / silwer.sk"
status: active
tags: [silwer, seo, gsc, klucove-slova]
---

# SEO postup

Cieľ nie je „napchať kľúčové slová". Cieľ je **nestratiť to, čo stránka už zarába**, keď
prepisujeme text kvôli compliance.

---

## Zdroje dát

| Zdroj | Kde | Čo dá | Cena |
|---|---|---|---|
| **Google Search Console** | `claude kody/silwer/analyzy/gsc/` | reálne dotazy, kliky, impresie, pozície za 12 mesiacov | zadarmo |
| DataForSEO | `~/.claude/secrets/dataforseo.env` | objemy vyhľadávania pre výrazy, na ktoré ešte nerankujeme | platené, **kredit ~0,22 € — treba dobiť** |

GSC dump je primárny zdroj. `query.json` = 200 dotazov, `page.json` = 100 stránok.

⚠️ Dump je **statický export**, nie live napojenie. Dátum obdobia je v `monthly.json`
(k 4.9.2026 pokrýva 24.8.2025 – 22.8.2026). Ak je starší než pol roka, obnov ho cez
`analyzy/ga4_fetch.py` alebo si vypýtaj nový export.

---

## KROK 1 — Čo stránka dnes zarába

```python
import json
pg = json.load(open('analyzy/gsc/page.json', encoding='utf-8'))
q  = json.load(open('analyzy/gsc/query.json', encoding='utf-8'))

# stránka
[r for r in pg if '<slug>' in r['keys'][0]]
# → {'clicks':…, 'impressions':…, 'ctr':…, 'position':…}

# dotazy k téme
kw = ['ashwagandh', 'stres', 'spánok', 'horčík', 'magnéz']
[r for r in q if any(w in r['keys'][0].lower() for w in kw)]
```

Vyhodnotenie:

| Situácia | Čo to znamená |
|---|---|
| Stránka má **stovky klikov** a jasné hlavné dotazy | opatrne — tie výrazy musia v texte ostať |
| Stránka má **desiatky klikov**, žiadny hlavný dotaz | voľná ruka, riziko je minimálne |
| Stránka v TOP 100 **nie je vôbec** | píš od nuly, nie je čo stratiť |

**Príklad z pilotu (Ashwagandha, 12 mesiacov):** 39 klikov, 2 927 impresií, CTR 1,3 %,
priemerná pozícia 10,4. Jediný dotaz s „ashwagandha" v TOP 200 bol „ashwagandha silver"
(8 klikov, značková navigácia). Záver: **nebolo čo stratiť**, a CTR 1,3 % na pozícii 10,4
znamená, že nový title má skôr potenciál pomôcť.

---

## KROK 2 — Ktoré výrazy prepis odoberie

Prejdi tabuľku *„Zmeny oproti zdroju"* v `karta.md` a vypíš slová, ktoré z textu miznú.
Pri doplnkoch to typicky sú práve tie, na ktoré ľudia hľadajú: *stres, spánok, únava,
kortizol, imunita*.

Porovnaj ich s GSC. Ak niektorý z nich stránke reálne nosí návštevnosť, **nenechaj ho
odísť bez pokusu o legálny návrat.**

---

## KROK 3 — Legálny návrat výrazu

`silwer-detail-produktu`, kap. 3.4: sekcia smie použiť **nešpecifický pojem**
(*metabolizmus, vitalita, imunita, energia, napätie*), ak je v **tej istej sekcii**
aj konkrétny schválený EFSA claim.

Podmienka: **nosičom claimu musí byť vitamín alebo minerál, nie rastlinný extrakt.**

| ❌ Nefunguje | ✅ Funguje |
|---|---|
| „Ashwagandha pomáha zvládať stres" | „Horčík prispieva k správnej psychickej činnosti" v sekcii, kde sa hovorí o napätí |
| „Podporuje spánok" | žiadny claim o spánku okrem melatonínu pri 1 mg — **výraz sa vrátiť nedá** |
| „Znižuje kortizol" | fyziologické tvrdenie bez claimu — **nedá sa** |

Ak sa výraz vrátiť nedá, je to **vedomá strata relevancie výmenou za právnu čistotu**.
Napíš to do karty, nech to nie je prekvapenie.

---

## KROK 4 — Title a meta description

Vzor je v `silwer-detail-produktu`, kap. 8.

- **Title:** `[Názov] od Silwer. [Typ] na podporu [1–2 oblasti]. [Cieľová skupina].`
- **Meta description:** do ~160 znakov, inak ju Google oreže
- **Claimy platia aj tu.** Meta description je reklamné tvrdenie ako každé iné.
- **Slug nemeň.** Zmena adresy je jediná vec, ktorá SEO reálne ublíži — a vyžadovala by
  redirect (pri XML importe cez tag `<ORIG_URL>`).

Nízke CTR pri slušnej pozícii (napr. 1,3 % na pozícii 10) je signál, že title a meta
sú slabé, nie že stránka nemá potenciál.

---

## KROK 5 — Vyhodnotenie

**Zmenu nechaj bežať 6–8 týždňov**, potom porovnaj kliky, pozíciu a konverziu.

Nemeň text tam a späť. Nie kvôli penalizácii — tá za to nehrozí — ale preto, že dve zmeny
v krátkom slede sa nedajú od seba oddeliť a nikdy nezistíš, čo fungovalo.

---

## Čo Google NEpenalizuje

Aby sa to už nemuselo riešiť:

- prepísanie vlastného produktového textu
- návrat k vlastnému staršiemu textu (nie je to duplicita)
- zmenu obsahu na nezmenenej URL

Manuálne akcie sú za spam, cloaking, podvodné presmerovania, tenký alebo skopírovaný obsah
a neprirodzené odkazy. Prepis popisu na tomto zozname nie je.

Čo sa reálne stane: pre-crawl a pre-indexácia, pozície pár dní až týždňov kolíšu. Šum, nie trest.

## Čo by SEO ublížilo

1. **Zmena slugu bez redirectu** → strata odkazovej sily a 404.
2. **Zmazanie tabuľky zloženia** → stránka stratí unikátny obsah, ktorý konkurencia nemá.
3. **Rovnaký text na viacerých produktoch** → interná duplicita medzi vlastnými stránkami.
4. **Vyhodenie témy bez náhrady** → strata relevancie (nie penalizácia, ale strata).
