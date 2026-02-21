# Kartlegging Loop v1

Mål: få en stabil, repeterbar loop for å kartlegge et område (f.eks. Kolbotn) med minst mulig manuelt stress.

## Loop (hver kjøring)

1. **Collect** – hent snapshot fra kilder
2. **Normalize** – ett felles JSON-format
3. **Diff** – hva er nytt/endret/fjernet siden sist?
4. **Score** – prioritering (hva er mest interessant nå?)
5. **Report** – kort oppsummering til repo + Telegram

---

## Struktur

```txt
kartlegging-loop/
  areas/                  # Områdeprofiler (mål, kriterier)
  data/
    raw/                  # Rå snapshots
    processed/            # Normaliserte snapshots
  reports/                # Auto-genererte rapporter
  scripts/                # Små scripts for diff/report
  examples/               # Demo-data
```

---

## Standard dataformat (processed snapshot)

Hver oppføring i JSON-array:

```json
{
  "id": "bekkeliveien-3-75-270",
  "source": "finn",
  "url": "https://example.com/listing",
  "title": "Bekkeliveien 3",
  "address": "Bekkeliveien 3, Kolbotn",
  "area_m2_min": 75,
  "area_m2_max": 270,
  "types": ["kontor"],
  "price_nok_per_m2": null,
  "status": "available",
  "captured_at": "2026-02-20T20:00:00+01:00"
}
```

---

## Scripts (v1)

### Diff snapshots

```bash
node kartlegging-loop/scripts/diff_snapshots.mjs \
  kartlegging-loop/examples/snapshot-2026-02-20.json \
  kartlegging-loop/examples/snapshot-2026-02-21.json \
  kartlegging-loop/reports/latest-diff.json
```

### Bygg markdown-rapport

```bash
node kartlegging-loop/scripts/build_report.mjs \
  kartlegging-loop/reports/latest-diff.json \
  kartlegging-loop/reports/latest.md
```

---

## Drift (forslag)

- **Daglig lett scan** (08:00): nye/endringer
- **Ukentlig deep scan** (søndag): kilder + kvalitetssjekk
- Push kun når det finnes endringer (lav støy)

---

## Neste steg (v2)

- Legg til enkel scoring basert på områdeprofil
- Legg til Telegram-digest template
- Legg til multi-område (Ski, Trollåsen, Sofiemyr)
- Knytt til cron-job i OpenClaw
