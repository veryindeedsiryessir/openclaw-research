# RUNBOOK – OpenClaw Research Ops

Purpose: keep the research loop autonomous, predictable, and safe.

## Daily/Weekly Job Map

- Daily 08:00 → `node scripts/build-daily-digest.mjs`
- Monday 08:15 → `node scripts/build-weekly-implementation-report.mjs`
- Every 30 min → `node scripts/run-telegram-monitor.mjs`
- Every 60 min → `node scripts/healthcheck.mjs`

## Operating Modes

### Telegram monitor
- `passive` (default): compute matches, no outbound sends
- `alerts`: send keyword-based alerts
- `digest`: send compact digest summary

Change mode in `data/telegram-monitor.json`.

## What can run autonomously (no approval)

- Generate/update reports under `reports/`
- Run local validation and health checks
- Commit internal repo improvements
- Update internal docs (`README.md`, `ops/*`, script docs)

## What should require human confirmation

- External outbound messages (except explicitly approved monitoring mode)
- Destructive changes (delete large datasets/history)
- Secret/provider configuration changes
- Branch protection / repo settings changes

## If something fails

### GitHub auth fails
1. Run `gh auth status`
2. If logged out: `gh auth login --with-token`
3. Then: `gh auth setup-git`

### Push fails (`could not read Username`)
1. Run `gh auth setup-git`
2. Retry push
3. If still failing, verify keychain helper:
   - `git config --global credential.helper osxkeychain`

### Pages deploy looks stale
1. Check latest workflow run:
   - `gh run list --repo veryindeedsiryessir/openclaw-research --limit 5`
2. If failing, inspect logs:
   - `gh run view <run-id> --repo veryindeedsiryessir/openclaw-research --log-failed`
3. Re-run failed job if needed:
   - `gh run rerun <run-id> --failed --repo veryindeedsiryessir/openclaw-research`

### Digest/report generation fails
1. Re-run manually and capture error output
2. Check input JSON files in `data/` and `reports/`
3. Run sanity scripts:
   - `node scripts/validate-library.mjs`
   - `node scripts/build-library-summary.mjs`

## Escalation rules

Escalate to human quickly if:
- auth loops fail repeatedly
- deployment fails >2 consecutive runs
- script output becomes empty/invalid unexpectedly
- monitoring starts producing noisy false positives

## Definition of healthy state

- `gh auth status` = logged in
- `git status --short --branch` = not diverged unexpectedly
- latest Pages run = success
- site HEAD request returns 200
- healthcheck report generated in last hour
