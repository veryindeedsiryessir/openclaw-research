# Wave 2 deep analysis (value + safety)

Date: 2026-02-28
Scope: gog, remind, caldav-calendar, proactive-agent

## Summary decision table

| Skill | Value (1-5) | Safety Risk (1-5) | Operational Fit | Decision |
|---|---:|---:|---|---|
| gog | 4.0 | 4.0 | High leverage for mail/calendar workflows; broad account scope | Pilot with strict approval gates |
| remind | 4.2 | 2.0 | Strong for cadence and human follow-through | Adopt now |
| caldav-calendar | 3.2 | 3.0 | Useful for Linux-centric calendar sync; less direct fit on current mac flow | Defer (keep as option) |
| proactive-agent | 4.5 | 4.2 | Powerful architecture patterns; high autonomy complexity | Pilot selected patterns only |

---

## 1) gog

### What we verified
- Skill exists and is maintained.
- Covers Gmail/Calendar/Drive/Contacts/Sheets/Docs via OAuth credentials.
- Includes send/create/update style commands (not read-only).

### Value for our stack
- Strong for turning Mission Control + R21 outputs into outbound operational workflows.
- Can reduce manual copy/paste for calendar and reporting loops.

### Risks
- Broad Google account access (write actions).
- External side-effects (email sends, event creation).

### Guardrails
- Restrict to dedicated service account where possible.
- Tier-C approval for outbound send/create mutations.
- Keep audit logs for each write operation.

### Decision
**Pilot with strict approval gates.**

---

## 2) remind

### What we verified
- Skill exists with clear reminder-specific philosophy (not generic alerting).
- Emphasizes adaptive timing/style and explicit reminder semantics.

### Value for our stack
- Excellent for improving routine execution and reducing dropped follow-ups.
- Fits Mission Control “Today + cadence” behavior directly.

### Risks
- Low technical risk.
- Main risk is over-notification if not tuned.

### Guardrails
- Start with conservative reminder frequency.
- Maintain skip-list for low-value reminders.

### Decision
**Adopt now.**

---

## 3) caldav-calendar

### What we verified
- Skill exists and is detailed.
- Built around `vdirsyncer + khal` and marked Linux-oriented.
- Supports read/write calendar operations and sync workflows.

### Value for our stack
- Useful if we standardize on CalDAV sync architecture.
- Less immediate fit vs existing setup on current host/tooling.

### Risks
- Sync/config overhead.
- Write-side calendar mutations if misconfigured.

### Guardrails
- Read-only trial first.
- Clear calendar scope and backup before write operations.

### Decision
**Defer for now (keep as option).**

---

## 4) proactive-agent

### What we verified
- Skill appears robust and extensive (v3.1.0) with memory/governance/security guidance.
- Includes advanced concepts (WAL, compaction recovery, autonomous cron distinctions).
- File-level script inspection timed out on one attempt; high-level docs reviewed.

### Value for our stack
- Very aligned with your direction: agentic operations + continuity + governance.
- Offers architecture patterns to improve reliability under long-running operations.

### Risks
- High complexity and potential overreach if adopted wholesale.
- Can increase autonomy surface too quickly.

### Guardrails
- Adopt only selected patterns (not full stack all at once).
- Explicitly map to existing Mission Control governance tiers.
- Keep human approval boundaries unchanged.

### Decision
**Pilot selected patterns only** (WAL-like state discipline + compaction recovery habits).

---

## Recommended next actions

1. Enable `remind` patterns in Mission Control cadence.
2. Run a contained `gog` pilot for non-destructive reads first.
3. Extract 2-3 proactive-agent patterns into local conventions (without full adoption).
4. Revisit caldav if calendar architecture shifts to CalDAV-first.
