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

## Entry 4
- **Skill:** gog
- **Date:** 2026-02-28
- **Use case tested:** Capability inspection for Gmail/Calendar/Drive/Sheets automation
- **Value signal (1-5):** 4.0
- **Safety risk (1-5):** 4.0
- **What worked:** Broad Google Workspace coverage and scriptability
- **What failed / concerns:** Large write-capable access scope to external systems
- **KPI impact observed:** Potentially high for reporting and scheduling loops
- **Decision:** Pilot
- **Guardrails required:** Tier-C approvals on outbound mutations; account scope minimization

## Entry 5
- **Skill:** remind
- **Date:** 2026-02-28
- **Use case tested:** Reminder semantics and adaptive timing model review
- **Value signal (1-5):** 4.2
- **Safety risk (1-5):** 2.0
- **What worked:** Clear reminder boundaries and practical timing logic
- **What failed / concerns:** Risk of noisy reminders if untuned
- **KPI impact observed:** Better follow-through on recurring commitments
- **Decision:** Adopt now
- **Guardrails required:** Conservative defaults; explicit skip-list

## Entry 6
- **Skill:** caldav-calendar
- **Date:** 2026-02-28
- **Use case tested:** CLI workflow and sync architecture review
- **Value signal (1-5):** 3.2
- **Safety risk (1-5):** 3.0
- **What worked:** Mature sync/query model for CalDAV ecosystems
- **What failed / concerns:** Linux-oriented setup and higher config overhead for current stack
- **KPI impact observed:** Moderate, conditional on adopting CalDAV-first flow
- **Decision:** Defer
- **Guardrails required:** Read-only pilot before write operations if activated

## Entry 7
- **Skill:** proactive-agent
- **Date:** 2026-02-28
- **Use case tested:** Architecture-level review of autonomy/memory/governance patterns
- **Value signal (1-5):** 4.5
- **Safety risk (1-5):** 4.2
- **What worked:** Strong operational patterns for continuity and proactive loops
- **What failed / concerns:** High complexity and autonomy surface if adopted wholesale
- **KPI impact observed:** High potential for reliability and consistency
- **Decision:** Pilot selected patterns only
- **Guardrails required:** Incremental adoption mapped to existing Mission Control policy tiers

## Entry 8
- **Skill:** self-improving-agent
- **Date:** 2026-02-28
- **Use case tested:** Deep inspection of self-learning/logging architecture
- **Value signal (1-5):** 4.2
- **Safety risk (1-5):** 4.5
- **What worked:** Good structured learnings/error capture model
- **What failed / concerns:** Can over-expand autonomy if applied wholesale
- **KPI impact observed:** Potential reduction of repeated operational mistakes
- **Decision:** Pilot selected components only
- **Guardrails required:** Human review for policy/process changes

## Entry 9
- **Skill:** auto-updater
- **Date:** 2026-02-28
- **Use case tested:** Daily unattended update strategy review
- **Value signal (1-5):** 3.6
- **Safety risk (1-5):** 4.6
- **What worked:** Clear automation concept for maintenance
- **What failed / concerns:** High blast radius without canary/rollback
- **KPI impact observed:** Potentially lower maintenance effort
- **Decision:** Defer
- **Guardrails required:** Dry-run mode, pinned versions, rollback + smoke tests

## Entry 10
- **Skill:** wacli-family (WhatsApp)
- **Date:** 2026-02-28
- **Use case tested:** Family-level risk/value assessment (slug ambiguity in catalog)
- **Value signal (1-5):** 3.8
- **Safety risk (1-5):** 4.8
- **What worked:** Strong potential for outbound comms workflow
- **What failed / concerns:** External messaging mistakes are high-impact
- **KPI impact observed:** Could improve notification throughput if controlled
- **Decision:** Defer unless Tier-C workflow is strict
- **Guardrails required:** Recipient allowlists, templates, human approval, full audit logs

## Entry 11
- **Skill:** home-assistant-family
- **Date:** 2026-02-28
- **Use case tested:** Family-level risk/value assessment (slug ambiguity in catalog)
- **Value signal (1-5):** 3.2
- **Safety risk (1-5):** 4.7
- **What worked:** Potential convenience for environmental automations
- **What failed / concerns:** Physical/device side-effects; not core to current goals
- **KPI impact observed:** Low direct impact on R21 mission-critical workflows
- **Decision:** Defer
- **Guardrails required:** Isolated scope, non-safety-critical actions only

## Entry 12
- **Skill:** agent-browser (pilot session)
- **Date:** 2026-02-28
- **Use case tested:** 5-task read-first verification pass for missing byggherre fields
- **Value signal (1-5):** 3.5
- **Safety risk (1-5):** 2.5
- **What worked:** Structured run and evidence logging worked; repeatable session artifacts created
- **What failed / concerns:** 0/5 verified hits from open web in this pass (source scarcity)
- **KPI impact observed:** Throughput process established, but no immediate completion lift
- **Decision:** Continue pilot with richer sources (PDF/municipal docs/manual seed links)
- **Guardrails required:** Keep read-first; no auto-write without evidence-grade sources

## Entry 13
- **Skill:** agent-browser (pilot session 002)
- **Date:** 2026-02-28
- **Use case tested:** 5-task enriched-query verification pass (project + entreprenør + site filters)
- **Value signal (1-5):** 3.6
- **Safety risk (1-5):** 2.5
- **What worked:** Enriched query strategy executed cleanly and produced reproducible artifacts
- **What failed / concerns:** Still 0/5 verified byggherre hits; external sources do not expose clean fields for targets
- **KPI impact observed:** No direct improvement in done/verified coverage yet
- **Decision:** Keep pilot, but switch to seeded sources from project docs/internal references
- **Guardrails required:** Evidence-grade source requirement remains mandatory
