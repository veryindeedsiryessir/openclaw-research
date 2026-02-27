# Skill analysis worklist (value + safety)

Date: 2026-02-28
Source note: `ByteRover — byterover — 14,376` (Apple Notes shortlist)

## Goal
Build a structured evaluation of shortlisted skills to decide:
1. install now
2. pilot in sandbox
3. defer/reject

Focus areas:
- business value
- safety risk
- implementation effort
- observability/auditability
- learnings captured

---

## Evaluation framework (apply to every skill)

### A) Value score (1-5)
- Direct impact on current workflows (R21 + Mission Control)
- KPI lift potential (verification throughput, reduced missing-critical, reduced manual overhead)
- Time-to-value

### B) Safety score (1-5, lower is safer)
- External side effects (messages/emails/posts)
- Credential scope required
- Ability to constrain actions
- Rollback/recovery if misbehaves

### C) Operational fit
- Can it be run with existing policy tiers (A/B/C)?
- Does it produce evidence/audit logs?
- Failure isolation (small blast radius?)

### D) Decision outcome
- Adopt now / Pilot / Defer
- Preconditions
- Owner and next review date

---

## Master checklist for each skill

- [ ] Inspect files/scripts and dependencies
- [ ] Identify required credentials/access
- [ ] Define allowed/denied actions
- [ ] Run dry-run / sandbox test
- [ ] Measure 1 concrete KPI during pilot
- [ ] Log incidents/odd behaviors
- [ ] Document keep/kill decision + learning

---

## Skill-by-skill analysis queue

1. **ByteRover** (`byterover`) — score: 14,376
   - Hypothesis: could improve dev/research throughput
   - Key risk: unknown autonomy scope + external actions
   - Status: TODO

2. **Wacli (WhatsApp)** (`wacli`) — score: 10,016
   - Hypothesis: outbound communication automation
   - Key risk: external messaging risk high
   - Status: TODO

3. **self-improving-agent** (`self-improvement`) — score: 9,370
   - Hypothesis: adaptive optimization
   - Key risk: self-modifying behavior / governance complexity
   - Status: TODO

4. **Clawhub (CLI skill)** (`clawhub`) — score: 5,753
   - Hypothesis: package/distribute skill workflows
   - Key risk: install-chain trust
   - Status: TODO

5. **Gog (Google Workspace CLI)** (`gog`) — score: 5,611
   - Hypothesis: email/calendar automation and reporting
   - Key risk: broad account access scope
   - Status: TODO

6. **ATXP** (`atxp`) — score: 5,154
   - Hypothesis: TBD during inspection
   - Key risk: unknown until tool/file review
   - Status: TODO

7. **Agent Browser** (`agent-browser`) — score: 4,765
   - Hypothesis: stronger source verification workflows
   - Key risk: browser-side action errors
   - Status: TODO

8. **Auto-Updater Skill** (`auto-updater`) — score: 4,123
   - Hypothesis: maintain system freshness
   - Key risk: autonomous update blast radius
   - Status: TODO

9. **Summarize** (`summarize`) — score: 4,063
   - Hypothesis: rapid transcript/data extraction
   - Key risk: low (mostly read/transform)
   - Status: TODO

10. **Sonoscli** (`sonoscli`) — score: 3,564
    - Hypothesis: media/device control
    - Key risk: low-medium (device control scope)
    - Status: TODO

11. **Coding Agent** (`coding-agent`) — score: 3,540
    - Hypothesis: accelerate implementation
    - Key risk: medium (code changes at scale)
    - Status: TODO

12. **Remind Me** (`remind-me`) — score: 3,295
    - Hypothesis: cadence and accountability
    - Key risk: low
    - Status: TODO

13. **Weather** (`weather`) — score: 3,110
    - Hypothesis: context enrichment for briefs
    - Key risk: low
    - Status: TODO

14. **Home Assistant** (`homeassistant`) — score: 2,996
    - Hypothesis: environment automations
    - Key risk: medium-high (physical side effects)
    - Status: TODO

15. **Caldav Calendar** (`caldav-calendar`) — score: 2,265
    - Hypothesis: schedule integration
    - Key risk: medium (calendar write actions)
    - Status: TODO

16. **Nano Banana Pro (image gen/edit)** (`nano-banana-pro`) — score: 2,191
    - Hypothesis: visual communication speed
    - Key risk: low-medium
    - Status: TODO

17. **Obsidian** (`obsidian`) — score: 2,192
    - Hypothesis: knowledge workflow integration
    - Key risk: low-medium (vault write scope)
    - Status: TODO

18. **Proactive Agent** (`proactive-agent`) — score: 2,189
    - Hypothesis: proactive monitoring/alerts
    - Key risk: medium (autonomous actions)
    - Status: TODO

19. **YouTube Watcher** (`youtube-watcher`) — score: 2,127
    - Hypothesis: trend/watch intelligence
    - Key risk: low
    - Status: TODO

20. **Deep Research Agent** (`deep-research`) — score: 1,630
    - Hypothesis: source discovery for blocked verification tasks
    - Key risk: medium (inference drift/source quality)
    - Status: TODO

---

## Priority sequence for analysis execution

### Wave 1 (highest immediate value)
- summarize
- deep-research
- agent-browser
- coding-agent

### Wave 2 (ops leverage)
- remind-me
- gog
- caldav-calendar
- proactive-agent

### Wave 3 (high-risk / needs strict guardrails)
- self-improving-agent
- auto-updater
- wacli
- homeassistant

---

## Learning log template

For each skill, append to `research/skill-analysis/learnings.md`:
- Skill
- Use case tested
- What worked
- What failed / risk observed
- KPI impact
- Decision (adopt/pilot/defer)
- Guardrails required
