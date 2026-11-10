# Klon www.silwer.sk (Vercel)

Statická kópia celého e-shopu **www.silwer.sk** – všetky stránky zo sitemap
(úvod, kategórie aj so stránkovaním, ~100 produktov, blog, informačné stránky).
Vyzerá a správa sa ako ostrý web, ale beží samostatne na Verceli.
Hodí sa na skúšanie redizajnu, nových blokov popisu a úprav bez zásahu do Shoptetu.

**Adresa:** https://silwer-klon.vercel.app (Vercel tím `silwer`, projekt `silwer-klon`)

Stav obsahu: pozri `pages.json` (dátum stiahnutia, zoznam stránok).

## Nové produkty – náhľad pred Shoptetom

Shoptet nevie ukázať produkt pred zverejnením. Na klone sa dá nový produkt poskladať
a pozrieť aj s redizajnom, cenami za balenia, krátkym a dlhým popisom, vo výpise
kategórií a vo vyhľadávaní. Návod: **[`produkty/README.md`](produkty/README.md)**,
vzor priečinka: `produkty/_vzor/`.

## Čo funguje a čo nie

| Časť | Na klone |
|---|---|
| Všetky stránky, menu, bannery, videá, recenzie, hodnotenie obchodu | ✅ ako na ostrom webe (stav k dátumu stiahnutia) |
| Vlastné CSS/JS redizajnu (`/user/documents/upload/KODY/`) | ✅ lokálne kópie – dajú sa tu upravovať |
| Obrázky produktov, šablóna Shoptetu, doplnky | načítavajú sa z CDN Shoptetu (cdn.myshoptet.com) |
| Vyhľadávanie (našepkávač + stránka `/vyhladavanie/`) | ✅ vlastné riešenie klonu – `klon/search.js` + index `public/klon/search.json` |
| Košík, objednávka, prihlásenie, registrácia, „Otázka k produktu“ | ↪ presmeruje na ostrý **www.silwer.sk** |
| Ceny a dostupnosť | stav k dátumu stiahnutia, neaktualizujú sa |
| Dáta redizajnu (balenia, zľavy, štítky oblastí) | zo snapshotu + nové produkty (`klon/data-patch.js` namiesto `silwer-data.vercel.app`) |

## Čo je oproti ostrému webu iné

- **Bez meracích kódov** – odstránené GTM, GA4, Meta pixel, Luigi's Box a Ellity/Leadhub,
  aby návštevy klonu nekazili štatistiky a publiká ostrého webu.
- **Vlastné vyhľadávanie** – ostrý web hľadá cez Luigi's Box. Na klone ho nahrádza
  `klon/search.js`: hľadá v názvoch, titulkoch a kategóriách produktov (napr. „gold“
  nájde celú líniu Silwer Gold) a odkazuje na stránky klonu. Výsledky ukazuje na
  `/vyhladavanie/`, čo je stránka Všetky produkty s odfiltrovanými kartami.
- **Klon sa neindexuje** – `noindex` v HTML, hlavička `X-Robots-Tag` a `robots.txt`
  so zákazom. `canonical` ostáva na www.silwer.sk, takže klon nevytvára duplicitný obsah.

## Nasadenie na Vercel

**Cez web (najjednoduchšie):** Vercel → *Add New → Project* → importovať repozitár
`silwersk/silwer-skills` → *Root Directory* = `web-klon` → *Framework Preset* = `Other`
→ *Deploy*. Pri vetve iné ako `main` ju zvoľte v nastaveniach projektu (Git → Production Branch).

**Cez príkazový riadok:**

```bash
cd web-klon
npx vercel deploy --prod
```

Nastavenia (presmerovania, noindex, lomky na konci URL) sú vo `vercel.json`.
Pozor: pri `trailingSlash: true` Vercel nezachytí vzor `/kosik/:path*` – presmerovania
sú preto zapísané ako `/kosik:rest(.*)`.

## Obnovenie obsahu z ostrého webu

```bash
pip install requests
python3 web-klon/scripts/mirror.py            # celý web (~5 min)
python3 web-klon/scripts/mirror.py --limit 5  # rýchly test
```

Skript prepíše priečinok `public/`, preto si **vlastné úpravy v `public/` najprv odložte**
(alebo ich robte v kópiách súborov). Súbory klonu (`klon/`) sa do `public/klon/` kopírujú
pri každom behu.

Shoptet pri rýchlom sťahovaní dočasne blokuje prístup („Access temporarily blocked“);
skript preto čaká medzi stránkami a pri chybe 403 to skúsi znova.

Ak meníte len `klon/search.js` alebo chcete pregenerovať index hľadania bez sťahovania:

```bash
python3 web-klon/scripts/mirror.py --postprocess
```

## Lokálny náhľad

```bash
cd web-klon/public && python3 -m http.server 8080
```

Pozor: `silwer-redesign.js` na adrese `localhost` / `127.0.0.1` prepína obrázky redizajnu
na vývojový priečinok `/__sw-assets/`, takže hlavný banner tam chýba. Na Verceli alebo
na inom názve hostiteľa (napr. `http://silwer.test:8080` cez záznam v `/etc/hosts`)
sa zobrazí správne.
