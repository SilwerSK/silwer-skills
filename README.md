# Silwer skills

Skilly pre Claude na marketing a obsah značky **Silwer.** (silwer.sk).

| Skill | Použitie |
|---|---|
| `silwer-detail-produktu` | **1. krok** – texty produktových kariet pre ~77 produktov: archetypy, EFSA claimy, compliance, SEO balík |
| `silwer-dlhy-popis` | **2. krok** – premení hotovú kartu na HTML blok pod tlačidlom Do košíka a dostane ho do Shoptetu. Nahrádza Pobo Page Builder |
| `silwer-marketing` | Brand tonalita, social media copy, newslettre, kampane, JSON prompty pre AI vizuály |
| `silwer-higgsfield-visuals` | Prompty pre Higgsfield – META kreatívy, packshoty, edu grafiky, lifestyle galéria |
| `silwer-meta-performance` | Akvizičné META kampane, kreatívne sprinty, ugly ads, advertorialy |

## Reťazec pri novom produkte

```
silwer-detail-produktu   → karta.md (texty, compliance, SEO)
        ↓
silwer-higgsfield-visuals → obrázky (16:9, JPG do 200 kB)
        ↓  človek nahrá cez Vzhľad a obsah → Správca súborov a pošle URL
silwer-dlhy-popis        → blok-inline.html → vloží sa do Detailného popisu
```

Návod pre človeka, ktorý to bude ovládať: `skills/silwer-dlhy-popis/README.md`.

## Štruktúra

Každý skill je priečinok `skills/<názov>/` so súborom `SKILL.md` (YAML hlavička `name` + `description`, potom inštrukcie). Voliteľný priečinok `references/` obsahuje podporné dokumenty.

## Inštalácia do Claude

Cowork / Claude.ai → Skills → Import → vybrať priečinok skillu (alebo ZIP).

## Verzie

- `silwer-detail-produktu` v3.1 – 2026-09-04
- `silwer-dlhy-popis` v1.0 – 2026-09-04
- `silwer-marketing` v2.0
- `silwer-higgsfield-visuals` v1.3
- `silwer-meta-performance` v1.0
