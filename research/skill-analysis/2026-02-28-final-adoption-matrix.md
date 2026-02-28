# Final skill adoption matrix (Waves 1–3)

Date: 2026-02-28
Scope: Consolidated recommendation across all analyzed skills.

## Decision summary

## Adopt now
- summarize
- coding-agent (with existing guardrails)
- remind

## Pilot (controlled)
- agent-browser (sandbox, read-first verification playbook)
- deep-research (select one candidate first)
- gog (read-only first, Tier-C for mutations)
- proactive-agent (selected patterns only)
- self-improving-agent (selected components only)

## Defer
- caldav-calendar (keep as optional path)
- auto-updater (until rollback/canary controls)
- wacli-family / whatsapp skills (until strict approval + audit)
- home-assistant-family (not core, high side-effect risk)

---

## Adoption gates (mandatory)

1. **KPI gate**
   - Every adopted/pilot skill must map to one measurable KPI.

2. **Safety gate**
   - Define allowed/denied/approval-required actions before use.

3. **Evidence gate**
   - All pilot outputs must include source/evidence logs and incident notes.

---

## Recommended rollout order

1) summarize (adopt)
2) remind (adopt)
3) agent-browser pilot
4) deep-research pilot
5) gog read-only pilot
6) proactive/self-improving selected patterns pilot

---

## Exit criteria

A pilot moves to Adopt only if:
- KPI improves during pilot window
- No high-severity incidents
- Guardrails are practical and enforceable
- Rollback path is tested
