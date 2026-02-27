# Skill learnings log

Use this log during analysis pilots.

## Template
- **Skill:**
- **Date:**
- **Use case tested:**
- **Value signal (1-5):**
- **Safety risk (1-5):**
- **What worked:**
- **What failed / concerns:**
- **KPI impact observed:**
- **Decision:** Adopt now / Pilot / Defer
- **Guardrails required:**

---

## Entry 1
- **Skill:** summarize
- **Date:** 2026-02-28
- **Use case tested:** YouTube transcript extraction + note capture
- **Value signal (1-5):** 4.5
- **Safety risk (1-5):** 2.0
- **What worked:** Fast extraction, broad input support, machine-readable output options
- **What failed / concerns:** Output quality depends on source extraction and model choice
- **KPI impact observed:** Reduced time to produce structured notes from long-form media
- **Decision:** Adopt now
- **Guardrails required:** Keep source links + raw artifacts; do not treat summaries as sole truth

## Entry 2
- **Skill:** agent-browser
- **Date:** 2026-02-28
- **Use case tested:** Capability inspection for source verification workflows
- **Value signal (1-5):** 4.0
- **Safety risk (1-5):** 3.5
- **What worked:** Rich command set for deterministic automation and evidence capture
- **What failed / concerns:** Broad action surface can cause side effects without strict task constraints
- **KPI impact observed:** Potential to unblock partner verification backlog
- **Decision:** Pilot (sandbox)
- **Guardrails required:** Read-first mode, explicit approval for mutation actions, evidence snapshots

## Entry 3
- **Skill:** coding-agent
- **Date:** 2026-02-28
- **Use case tested:** Existing operational usage in dashboard/pipeline implementation
- **Value signal (1-5):** 5.0
- **Safety risk (1-5):** 3.5
- **What worked:** High implementation velocity with background orchestration
- **What failed / concerns:** Requires discipline in scope, branch context, and review
- **KPI impact observed:** Major acceleration in feature delivery cadence
- **Decision:** Adopt with guardrails
- **Guardrails required:** PTY usage, explicit workdir, incremental commits, review gates
