# Architecture Decisions

This log records important project architecture choices for OpenFront Sandbox.

Each entry should include:

- Date
- Decision
- Options considered
- Reason
- Tradeoffs

## 2026-06-11

### Decision

Maintain an architecture decision log from the start of the project.

### Options Considered

- Keep decisions only in chat history.
- Track decisions in a repository document.

### Reason

Project constraints around OpenFront accuracy, fair-play compliance, privacy, browser permissions, and dependency discipline should remain visible in the codebase.

### Tradeoffs

This adds a small documentation maintenance cost, but reduces the risk of losing important context between implementation phases.

## 2026-06-11

### Decision

Keep a root-level `CHANGELOG.md` as the live project memory.

### Options Considered

- Rely on chat context and summaries.
- Keep the live project state in a root-level changelog.
- Keep status only inside deeper documentation files.

### Reason

The changelog is easy to locate, survives context compaction, and gives future updates a single first place to check before editing.

### Tradeoffs

This requires small ongoing maintenance after meaningful changes, but it reduces the risk of losing project state or repeating decisions.

## 2026-06-11

### Decision

Use upstream watch reports instead of automatic mechanic updates.

### Options Considered

- Automatically update mechanics and fair-play policy from upstream changes.
- Ignore upstream changes until manually noticed.
- Detect upstream changes and generate human-review reports.

### Reason

OpenFront changes frequently, and terms or rules changes require judgment. Automatic mechanic updates could introduce wrong formulas or fair-play risk. Human-review reports keep OpenFront Sandbox informed without silently changing behavior.

### Tradeoffs

This requires manual review before changes are applied, but it protects project accuracy, fair-play compliance, and user trust.

## 2026-06-11

### Decision

Complete Phase 0 as documentation and process only.

### Options Considered

- Scaffold the React/Vite app during Phase 0.
- Add dependencies and wire runnable scripts immediately.
- Keep Phase 0 limited to repository guardrails, roadmap, and safe placeholders.

### Reason

The project needs a clear long-term north star, fair-play sandbox boundary, upstream watch process, changelog-first rule, and `optimal under stated assumptions` definition before app code or mechanics exist.

### Tradeoffs

This delays visible app progress, but it prevents premature dependencies, mechanics, formulas, permissions, or architecture decisions from slipping in before approval.

## 2026-06-11

### Decision

Use Vite, React, and TypeScript for the Phase 1A website shell.

### Options Considered

- Plain HTML, CSS, and TypeScript without React.
- Vite, React, and TypeScript.
- A heavier full-stack React framework.

### Reason

The first app phase needs a local, fast, static-capable website shell with maintainable component structure and quality gates. Vite keeps the build small and conventional, React supports future stateful training UI, and TypeScript keeps assumptions explicit.

### Tradeoffs

This adds a Node package toolchain and React runtime dependency, but avoids a heavier framework, backend, routing dependency, or extension-specific build system.

## 2026-06-11

### Decision

Reserve extension folders without implementing extension runtime behavior in Phase 1A.

### Options Considered

- Ignore extension structure until a later phase.
- Create a functional extension manifest and runtime now.
- Create inert extension folders with README placeholders.

### Reason

The project may later need a browser extension structure, but Phase 1A must avoid permissions, content scripts, host access, storage, and OpenFront integration. Placeholder folders preserve the future shape without shipping behavior.

### Tradeoffs

This creates empty-looking structure now, but prevents messy retrofit work later while keeping the fair-play sandbox boundary intact.

## 2026-06-11

### Decision

Wire `scripts/upstream-check.ts` into npm by compiling it with TypeScript before execution.

### Options Considered

- Leave upstream checks as an unwired TypeScript placeholder.
- Add a TypeScript runtime dependency such as `tsx`.
- Compile the script with the existing TypeScript dev dependency and run Node on the emitted JavaScript.

### Reason

Phase 1A already has TypeScript for the app, so compiling the script avoids adding another dependency while making `npm run upstream:check` available.

### Tradeoffs

The command has a small compile step and writes to `dist-scripts`, but avoids an extra runtime tool and keeps dependency scope tight.

## 2026-06-11

### Decision

Use local ignored OpenFront source clone for inspection, not vendored source.

### Options Considered

- Vendor OpenFront source or assets into this repository.
- Rely only on GitHub web browsing for source inspection.
- Use `.external/openfront` as a local clone that is ignored by Git.

### Reason

The local ignored clone keeps this repository clean, avoids copying OpenFront code or assets before licensing decisions, allows commit-pinned source research, and supports source-faithful implementation later.

### Tradeoffs

Developers who perform source research need to clone OpenFront separately and record the checked commit. Normal build and test workflows remain independent of the external clone.

## 2026-06-11

### Decision

Prefer source-faithful mechanics over placeholder formulas.

### Options Considered

- Add simple placeholder formulas whenever exact mechanics are unknown.
- Allow placeholders only when explicitly approved as temporary educational assumptions.
- Block mechanics implementation until source research locates and documents the relevant OpenFront behavior.

### Reason

The project goal is accurate OpenFront training. Fake mechanics would undermine trust, and unknown mechanics should block implementation until researched unless a temporary educational placeholder is explicitly approved.

### Tradeoffs

This slows early mechanics work, but it protects accuracy, public credibility, and fair-play compliance.

## 2026-06-11

### Decision

License OpenFront Sandbox code under AGPL-3.0 for source-derived compatibility.

### Options Considered

- Keep OpenFront Sandbox without an explicit root license.
- Use a permissive license and avoid source-derived OpenFront logic.
- License OpenFront Sandbox code under AGPL-3.0-only.

### Reason

OpenFront source code is AGPL-3.0 in the checked upstream license materials, and OpenFront Sandbox aims to be source-faithful where legally and technically practical. AGPL-3.0-only keeps the project posture compatible with future approved reuse or adaptation of OpenFront public source code.

### Tradeoffs

AGPL licensing imposes stronger reciprocal obligations than a permissive license. That is appropriate for source-derived compatibility, but future contributors and distributors must understand the license obligations.

## 2026-06-11

### Decision

Use OpenFront `resources` assets when useful and compliant; forbid `proprietary` and external assets.

### Options Considered

- Avoid all OpenFront assets.
- Use any asset visible in the OpenFront repository or service.
- Allow reviewed `resources` assets under CC BY-SA 4.0 and forbid proprietary, external, premium, and unknown-license assets.

### Reason

OpenFront open assets under `resources` may help source-faithful offline training when properly attributed and tracked. OpenFront proprietary assets and external assets are not covered by the open asset license and must not be used without explicit written permission.

### Tradeoffs

This allows useful open resources later, but requires a per-asset inventory, attribution handling, and ShareAlike review before import.

## 2026-06-11

### Decision

Prefer source-derived mechanics over approximations.

### Options Considered

- Build OpenFront-inspired approximations from scratch.
- Use temporary placeholder formulas broadly during early development.
- Derive mechanics from OpenFront public source where approved and documented.

### Reason

The product goal is source-faithful OpenFront training rather than an approximation. Source-derived mechanics, with tracked paths and commit hashes, protect user trust and reduce the risk of inaccurate planner behavior.

### Tradeoffs

This requires more source research and compliance tracking before mechanics appear in the app, but it gives the project a much stronger accuracy foundation.

## 2026-06-11

### Decision

Keep benchmark policy, support and coordination actions, simulation evaluation, and replay review offline or post-game only.

### Options Considered

- Add live recommendations, automation, overlays, or OpenFront page integration.
- Avoid benchmark and replay architecture entirely.
- Define a strict offline and post-game architecture before implementation.

### Reason

OpenFront Sandbox should help players learn source-faithful decision quality without interacting with live matches. A documented offline boundary allows future benchmark, support, simulation, and replay-review features to be designed for training while avoiding cheat-adjacent behavior.

### Tradeoffs

This limits real-time convenience and requires user-provided or officially supported post-game data for replay-style review. It protects fair-play compliance, project credibility, and the distinction between training tools and live-match assistance.

## 2026-06-11

### Decision

Separate source-aligned model infrastructure from source-derived mechanic behavior.

### Options Considered

- Start by implementing a visible mechanic without shared source-reference infrastructure.
- Build a large simulation framework before implementing any mechanics.
- Add a small source-aligned model foundation and source-reference helper layer first.

### Reason

Future mechanics need consistent source paths, commit hashes, confidence labels, and model vocabulary before gameplay behavior is added. A small foundation supports the next source-derived mechanic while avoiding fake formulas, invented constants, and premature simulation architecture.

### Tradeoffs

This adds a modest amount of infrastructure before the first mechanic, but keeps the boundary clear: model shapes and source references are implemented, while formulas, scoring, simulation, map loading, and gameplay rules remain out of scope until their specific source review is complete.

## 2026-06-11

### Decision

Use a map surface context abstraction before loading real OpenFront map data.

### Options Considered

- Wait for full OpenFront map loading before adding any surface predicates.
- Add hardcoded training maps or invented terrain fixtures to production code.
- Add a small source-derived map surface context that can later be backed by approved OpenFront-derived map data.

### Reason

Future build placement work needs land, water, shore, ocean, shoreline, owner id, and has-owner predicates. A context abstraction lets OpenFront Sandbox implement and test those source-derived questions without copying map assets, inventing maps, or implying build placement legality.

### Tradeoffs

This adds a small abstraction layer before real map loading exists. It keeps the current phase testable and source-faithful, but future phases still need approved map data intake and separate placement legality implementations.
