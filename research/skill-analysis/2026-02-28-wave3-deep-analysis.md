# Wave 3 deep analysis (high-risk group)

Date: 2026-02-28
Scope target: self-improving-agent, auto-updater, wacli-equivalent, home-assistant

## Discovery note
The exact shortlist slugs `wacli` and `homeassistant` were not directly resolvable via `clawhub inspect` under those IDs in this environment. Closest candidates were found via search:
- WhatsApp family candidates (e.g. `openclaw-whatsapp`, `whatsapp-business`)
- Home Assistant family candidates (e.g. `home-assistant`, `openclaw-homeassistant`)

Assessment below uses confirmed inspected skills plus family-level risk judgement for the unresolved IDs.

## Summary decision table

| Skill | Value (1-5) | Safety Risk (1-5) | Operational Fit | Decision |
|---|---:|---:|---|---|
| self-improving-agent | 4.2 | 4.5 | Strong for learning loops, but high governance complexity | Pilot selected components only |
| auto-updater | 3.6 | 4.6 | Helpful maintenance, but high blast radius for unattended updates | Defer until explicit rollback controls |
| wacli-family (WhatsApp) | 3.8 | 4.8 | Useful outbound ops, but external messaging risk is very high | Defer unless strict approval workflow |
| home-assistant-family | 3.2 | 4.7 | Potential automation leverage; physical/system side effects possible | Defer unless isolated scope and safety interlocks |

---

## 1) self-improving-agent

### What we verified
- Skill inspected successfully.
- Includes learnings/error logs, scripts, hook integrations, and substantial guidance content.
- Emphasizes continuous adaptation and correction capture.

### Value
- High potential for improving process quality and reducing repeated mistakes.
- Aligns with mission-control/gov direction if kept constrained.

### Risk
- High autonomy + self-modification patterns can become hard to audit if adopted wholesale.

### Guardrails
- Adopt only explicit logging patterns (learning/error capture), not autonomous mutation loops.
- Require human review for policy/process changes.

### Decision
**Pilot selected components only.**

---

## 2) auto-updater

### What we verified
- Skill inspected successfully.
- Purpose: unattended daily updates for core tools/skills + summary messaging.

### Value
- Reduces maintenance burden.
- Can keep stack current with less manual intervention.

### Risk
- Very high operational blast radius: unattended update may break workflows.
- Requires robust rollback and canary strategy before trust.

### Guardrails
- Dry-run only at first.
- Maintain pinned versions for critical workflows.
- Require backup + rollback script and post-update smoke checks.

### Decision
**Defer for now** until rollback/canary controls are in place.

---

## 3) wacli-family (WhatsApp skills)

### What we verified
- Exact `wacli` slug not resolved in inspect.
- Multiple WhatsApp-related skills exist in search results.

### Value
- Could support outbound stakeholder communication and notification routing.

### Risk
- External messaging mistakes are high-impact (privacy/compliance/reputation).

### Guardrails
- Tier-C approval mandatory.
- Template-based outbound messages only.
- Full audit logging and explicit recipient allowlists.

### Decision
**Defer unless strict approval workflow is implemented first.**

---

## 4) home-assistant-family

### What we verified
- Exact `homeassistant` slug not resolved in inspect.
- Multiple Home Assistant-related alternatives found.

### Value
- Potential convenience for environmental automations.

### Risk
- Physical/device side effects can be non-trivial.
- Not core to current R21/Mission Control operational goals.

### Guardrails
- Isolated sandbox environment.
- No safety-critical or external-door/power automations.

### Decision
**Defer** (not a current core priority).

---

## Recommended policy updates from Wave 3

1. Add a mandatory **rollback checklist** before any updater/autonomous maintenance skill.
2. Keep **external messaging** in Tier-C with explicit human approval.
3. Require **exact skill-id verification** before evaluation to avoid slug ambiguity.
4. Restrict high-autonomy skills to **pilot scope with measurable KPI and expiry date**.
