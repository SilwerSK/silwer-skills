#!/usr/bin/env python3
"""Generovanie produktových vizuálov priamo cez OpenAI API.

Náhrada za `codex exec`, ktorý sa pri tejto úlohe opakovane zasekol — 15.9.2026
visel 7 hodín s nulovým výstupom a bez založenej session. Agent na generovanie
obrázkov aj tak netreba: je to jedno volanie API na prompt.

Číta PROMPTY.md v priečinku, berie sekcie `## NN — Názov` a ich prvý odsek ako
prompt. Ukladá PNG aj zmenšený JPG pripravený na web.

Použitie:
    python3 obrazky.py ../dobry-spanok/obrazky
    python3 obrazky.py ../dobry-spanok/obrazky --len 02     # len jednu sekciu
"""
import json, os, re, ssl, sys, base64, time
import urllib.request
from pathlib import Path

import certifi

MODEL = "gpt-image-2"
SIZE = "1536x1024"      # najbližšie k 16:9, čo API ponúka
WEB_SIRKA = 1920
WEB_KVALITA = 82


def kluc():
    p = Path.home() / ".claude/secrets/openai_api.env"
    for l in p.read_text(encoding="utf-8").splitlines():
        if l.startswith("OPENAI_API_KEY="):
            return l.split("=", 1)[1].strip().strip('"')
    raise SystemExit("OPENAI_API_KEY som v ~/.claude/secrets/openai_api.env nenašiel.")


def negativ(txt):
    """Sekcia `## Negatívny prompt` → veta so zákazmi.

    gpt-image nemá samostatné pole pre negatívny prompt (na rozdiel od Higgsfieldu),
    takže sa musí pripojiť do hlavného promptu ako explicitný zákaz. Bez toho model
    zákazy nevidí — prvý beh 15.9.2026 vygeneroval poháre v zábere, hoci `glass of
    drink` bol v negatívnom zozname.
    """
    m = re.search(r"^##\s+Negat[íi]vny prompt.*?$(.*?)(?=^##\s|\Z)", txt, re.M | re.S)
    if not m:
        return ""
    riadky = [l.strip().lstrip("+ ").strip() for l in m.group(1).strip().splitlines()
              if l.strip() and not l.strip().startswith(("#", ">", "*"))]
    zakazy = ", ".join(riadky)
    return (" Absolutely do not include any of the following in the image: " + zakazy + ".") if zakazy else ""


def prompty(subor):
    """Zo sekcie `## 02 — Makro byliny` vytiahne číslo, slug a prvý odsek ako prompt."""
    txt = subor.read_text(encoding="utf-8")
    neg = negativ(txt)
    von = []
    for m in re.finditer(r"^##\s+(\d{2})\s+—\s+(.+?)$", txt, re.M):
        cislo, nazov = m.group(1), m.group(2).strip()
        nazov = re.sub(r"\s*\(.*?\)\s*$", "", nazov)   # zahoď "(kat. 2A, 16:9)" z nadpisu
        zvysok = txt[m.end():]
        koniec = re.search(r"^##\s", zvysok, re.M)
        telo = zvysok[:koniec.start()] if koniec else zvysok
        odseky = [o.strip() for o in telo.strip().split("\n\n") if o.strip()
                  and not o.strip().startswith(("**", ">", "⚠", "*Nastavenia"))]
        if not odseky:
            continue
        slug = re.sub(r"[^a-z0-9]+", "-", nazov.lower()
                      .translate(str.maketrans("áäčďéíĺľňóôŕšťúýž", "aacdeillnoorstuyz"))).strip("-")
        von.append((f"{cislo}-{slug}", odseky[0] + neg))
    return von


def generuj(key, prompt):
    telo = json.dumps({"model": MODEL, "prompt": prompt, "size": SIZE, "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=telo,
                                 headers={"Authorization": "Bearer " + key,
                                          "Content-Type": "application/json"})
    ctx = ssl.create_default_context(cafile=certifi.where())
    with urllib.request.urlopen(req, context=ctx, timeout=300) as r:
        d = json.load(r)
    return base64.b64decode(d["data"][0]["b64_json"])


def naWeb(png, jpg):
    try:
        from PIL import Image
        im = Image.open(png).convert("RGB")
        w, h = im.size
        if w > WEB_SIRKA:
            im = im.resize((WEB_SIRKA, round(h * WEB_SIRKA / w)), Image.LANCZOS)
        im.save(jpg, "JPEG", quality=WEB_KVALITA, optimize=True, progressive=True)
        return jpg.stat().st_size
    except ImportError:
        return None


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    folder = Path(sys.argv[1]).resolve()
    iba = None
    if "--len" in sys.argv:
        iba = sys.argv[sys.argv.index("--len") + 1]
    key = kluc()
    zoznam = prompty(folder / "PROMPTY.md")
    if not zoznam:
        raise SystemExit("V PROMPTY.md som nenašiel žiadnu sekciu `## NN — Názov`.")
    for slug, prompt in zoznam:
        if iba and not slug.startswith(iba):
            continue
        png = folder / f"{slug}.png"
        jpg = folder / f"{slug}.jpg"
        t0 = time.time()
        print(f"  {slug} … ", end="", flush=True)
        try:
            png.write_bytes(generuj(key, prompt))
        except Exception as e:
            print(f"CHYBA: {str(e)[:120]}")
            continue
        vel = naWeb(png, jpg)
        print(f"{time.time()-t0:.0f}s · PNG {png.stat().st_size//1024} kB"
              + (f" · JPG {vel//1024} kB" if vel else " · (JPG preskočený, chýba Pillow)"))


if __name__ == "__main__":
    main()
