# OpenFront Mechanics Sources

This register tracks every OpenFront-related mechanic, constant, rule, and formula used by OpenFront Sandbox.

Do not present placeholder formulas as exact OpenFront mechanics. If a formula has not been verified against the OpenFront source, wiki, or manual testing, label it as a training assumption in both code and UI.

## Project Boundary

The long-term north star is to support fair, offline OpenFront-style training and decision review. This file helps preserve the fair-play sandbox boundary by making every mechanics claim traceable before it can affect planner behavior, scoring, or UI language.

Before changing this file for implemented mechanics, check `CHANGELOG.md`, `docs/project-discipline.md`, `docs/upstream-status.json`, and the latest upstream watch report.

If upstream status has `"reviewRequired": true`, stop and ask before changing game-related logic.

## Optimal Under Stated Assumptions

When the project uses the word `optimal`, it means `optimal under stated assumptions`: best according to the visible inputs, documented assumptions, simplifications, and sourced formulas currently in use.

It must not imply exact OpenFront mechanics, hidden-state awareness, live-game automation, or guaranteed perfect play unless source-code verification supports that claim.

## Source Confidence Labels

- `placeholder`: Not verified. Use only for offline training assumptions.
- `wiki-based`: Based on OpenFront wiki or public documentation.
- `source-code verified`: Verified against OpenFront source code.
- `manually verified`: Verified by controlled manual testing.

## Mechanics

| Mechanic | Source Link or File Path | Last Checked | Exact or Simplified | Confidence | Notes |
| --- | --- | --- | --- | --- | --- |
| None yet | N/A | 2026-06-11 | N/A | N/A | Add entries before implementing OpenFront-related mechanics. |
