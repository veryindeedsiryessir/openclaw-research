# Backlog v1 – Funksjoner og prosesser (praktisk)

Basert på nåværende mål: full oversikt, oppdatert research, og konkrete workflows som kan driftes.

## Kandidater (scoret)

| # | Feature / prosess | Byggbarhet | Effekt | Driftbarhet | Risiko | Total |
|---|---|---:|---:|---:|---:|---:|
| 1 | Daglig OpenClaw nyhetsdigest (GitHub releases + utvalgte kilder) | 5 | 4 | 5 | 5 | **4.6** |
| 2 | Ukentlig “hva bør vi implementere”-rapport | 5 | 4 | 5 | 5 | **4.6** |
| 3 | Telegram monitoring-loop (passiv + alerts på keywords) | 4 | 5 | 4 | 4 | **4.4** |
| 4 | Activity Feed for egne OpenClaw-handlinger | 4 | 5 | 4 | 4 | **4.4** |
| 5 | Kartlegging-loop v2 (normalisering + scoring + diff) | 4 | 5 | 4 | 3 | **4.3** |
| 6 | Morning Brief (daglig oppsummering med topp 3 tiltak) | 5 | 4 | 4 | 4 | **4.3** |
| 7 | Skill radar (nye skills + anbefaling per use case) | 4 | 4 | 4 | 5 | **4.1** |
| 8 | Svanen: booking-oppsummering i Telegram (manuell/importert data) | 3 | 5 | 3 | 3 | **3.8** |
| 9 | Svanen: QR bestillingsflyt prototype (landingsside + tracking) | 3 | 5 | 3 | 2 | **3.7** |
|10| Cross-creator benchmark (Alex/steipete/Karpathy: hva virker i praksis) | 4 | 3 | 4 | 5 | **3.8** |

> Totalscore etter matrisen i `prioriteringsmatrise.md`.

---

## Top 3 neste sprint (anbefalt)

1. **Daglig OpenClaw nyhetsdigest**
2. **Ukentlig implementeringsrapport**
3. **Telegram monitoring-loop**

Disse tre gir høy verdi raskt, med lav risiko og lite vedlikehold.

---

## Sprintplan (7 dager)

### Dag 1–2
- Sett opp kildefeed (repo releases + valgte kilder)
- Definer format for digest (kort + action-punkter)

### Dag 3–4
- Koble digest til cron (daglig)
- Legg til ukentlig rapport-generator

### Dag 5–6
- Telegram monitoring med keyword alerts
- Test i én gruppe/kanal

### Dag 7
- Retro: hva fungerte / hva må justeres
- Oppdatér scoring og backlog
