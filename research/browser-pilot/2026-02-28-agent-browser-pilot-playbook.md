# Agent Browser Pilot Playbook

Date: 2026-02-28
Scope: Improve web browsing, extraction, and verification workflows safely.

## Objective
Increase reliable web verification throughput without increasing external side-effect risk.

## Pilot KPI
- Primary: verified-source extraction tasks completed per session
- Baseline: current manual/web flow
- Target: +30% throughput in 7 days

## Guardrails (mandatory)
1. Read-first mode by default
2. No form submissions unless explicitly approved
3. No account-setting changes
4. Capture evidence link per extracted claim
5. Log failures/ambiguities in learnings log

## Test scenarios
1. Source discovery for blocked R21 projects
2. Extract named fields from structured pages
3. Cross-verify one claim across 2 sources
4. Generate short evidence bundle for Mission Control

## Command pattern (example)
- open page
- snapshot refs
- extract fields
- store evidence links
- update task status in Mission Control

## Output artifacts
- `reports/browser-pilot/session-YYYY-MM-DD.md`
- update `research/skill-analysis/learnings.md`

## Exit criteria
Pilot succeeds if:
- KPI target met
- no high-severity side effects
- evidence quality improves

Otherwise: refine scope and re-run.
