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
