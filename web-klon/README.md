# Klon www.silwer.sk (Vercel)

Statická kópia celého e-shopu **www.silwer.sk** – všetky stránky zo sitemap
(úvod, kategórie aj so stránkovaním, ~100 produktov, blog, informačné stránky).
Vyzerá a správa sa ako ostrý web, ale beží samostatne na Verceli.
Hodí sa na skúšanie redizajnu, nových blokov popisu a úprav bez zásahu do Shoptetu.

Stav obsahu: pozri `pages.json` (dátum stiahnutia, zoznam stránok).

## Čo funguje a čo nie

| Časť | Na klone |
|---|---|
| Všetky stránky, menu, bannery, videá, recenzie, hodnotenie obchodu | ✅ ako na ostrom webe (stav k dátumu stiahnutia) |
| Vlastné CSS/JS redizajnu (`/user/documents/upload/KODY/`) | ✅ lokálne kópie – dajú sa tu upravovať |
| Obrázky produktov, šablóna Shoptetu, doplnky | načítavajú sa z CDN Shoptetu (cdn.myshoptet.com) |
| Košík, objednávka, prihlásenie, registrácia, vyhľadávanie, „Otázka k produktu“ | ↪ presmeruje na ostrý **www.silwer.sk** |
| Ceny a dostupnosť | stav k dátumu stiahnutia, neaktualizujú sa |

## Čo je oproti ostrému webu iné

- **Bez meracích kódov** – odstránené GTM, GA4, Meta pixel, Luigi's Box a Ellity/Leadhub,
  aby návštevy klonu nekazili štatistiky a publiká ostrého webu.
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

## Obnovenie obsahu z ostrého webu

```bash
pip install requests
python3 web-klon/scripts/mirror.py            # celý web (~5 min)
python3 web-klon/scripts/mirror.py --limit 5  # rýchly test
```

Skript prepíše priečinok `public/`, preto si **vlastné úpravy v `public/` najprv odložte**
(alebo ich robte v kópiách súborov).

## Lokálny náhľad

```bash
cd web-klon/public && python3 -m http.server 8080
```

Pozor: `silwer-redesign.js` na adrese `localhost` / `127.0.0.1` prepína obrázky redizajnu
na vývojový priečinok `/__sw-assets/`, takže hlavný banner tam chýba. Na Verceli alebo
na inom názve hostiteľa (napr. `http://silwer.test:8080` cez záznam v `/etc/hosts`)
sa zobrazí správne.
