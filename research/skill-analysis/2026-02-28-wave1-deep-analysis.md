# Wave 1 deep analysis (value + safety)

Date: 2026-02-28
Scope: summarize, agent-browser, coding-agent, deep-research family discovery

## Summary decision table

| Skill | Value (1-5) | Safety Risk (1-5) | Operational Fit | Decision |
|---|---:|---:|---|---|
| summarize | 4.5 | 2.0 | Strong for transcript/source extraction pipelines | Adopt now |
| agent-browser | 4.0 | 3.5 | Strong for source verification and web workflows | Pilot in sandbox |
| coding-agent | 5.0 | 3.5 | Already central to implementation velocity | Adopt with guardrails |
| deep-research (family) | 4.0 | 3.0 | Promising for blocked verification sourcing | Pilot after candidate selection |

---

## 1) summarize

### What we verified
- Skill exists and is maintained.
- CLI supports URL/file/YouTube summarization, extract-only mode, JSON output.
- Works with multiple model providers (OpenAI/Anthropic/Google/xAI keys).

### Value for our stack
- High utility for ingesting meeting transcripts and long external docs.
- Supports machine-readable outputs (`--json`) which fits Mission Control/R21 pipelines.

### Risks
- Dependence on model/API keys and extraction quality.
- Potential source hallucination if used as "truth" rather than preprocessing.

### Guardrails
- Always preserve source URL + raw artifact.
- Use summarize as extraction aid, not final authority.

### Decision
**Adopt now** for pipeline augmentation.

---

## 2) agent-browser

### What we verified
- Skill exists, extensive command surface (navigation, snapshot refs, storage, network routing, eval, state save/load).
- Designed for deterministic browser automation.

### Value for our stack
- Very useful for semi-manual verification flows (e.g., extracting Byggherre/Entreprenør from sites that require interaction).
- Can reduce verification bottlenecks in R21 partner matrix.

### Risks
- Wider action surface (click/type/eval) means accidental side effects possible.
- Requires strict scope controls per session and target site.

### Guardrails
- Sandbox-first usage and read-first workflow.
- No form submissions or state mutations without explicit task-level approval.
- Log snapshots/evidence per verification step.

### Decision
**Pilot in sandbox** with a strict verification playbook.

---

## 3) coding-agent

### What we verified
- Existing core skill in local OpenClaw install with detailed runbook.
- Strong operational guidance: PTY required, background monitoring, safety caveats.

### Value for our stack
- Highest implementation throughput for building dashboards, pipelines, and automation scripts.
- Already proven in our repos.

### Risks
- Fast, high-volume changes can outpace review if not gated.
- Branch/repo context mistakes can cause unintended modifications.

### Guardrails
- Continue using workspace-bound directories.
- Keep commit granularity small and reviewable.
- Maintain explicit escalation rules for risky changes.

### Decision
**Adopt with guardrails** (already active).

---

## 4) deep-research (family)

### What we verified
- The exact `deep-research` slug from the note did not resolve directly in ClawHub search.
- Multiple adjacent candidates exist (e.g., deep-research-pro, academic-deep-research, etc.).

### Value for our stack
- Could materially help with blocked source discovery tasks.
- Good candidate for improving throughput in hard-to-find partner fields.

### Risks
- Varies by implementation quality; risk of low-trust synthesis without evidence discipline.

### Guardrails
- Select one candidate, run short pilot with explicit KPI:
  - target: increase verified partner rows without lowering evidence quality.
- Require evidence URLs for every generated claim.

### Decision
**Pilot after candidate selection** (next action item).

---

## Recommended next actions

1. Integrate `summarize` in R21 transcript/doc intake scripts.
2. Design and run `agent-browser` verification pilot for 8 blocked projects.
3. Evaluate top 2 deep-research candidates and choose 1 for pilot.
4. Log all findings in `research/skill-analysis/learnings.md`.
