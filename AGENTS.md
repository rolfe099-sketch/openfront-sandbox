# AGENTS.md

This is the standing development contract for any AI or coding assistant working on OpenFront Sandbox. This repository is public and consumer-facing. Treat every committed file as something players, contributors, OpenFront developers, browser extension reviewers, and supporters may read.

## Read First

Before making changes, read:

1. `CHANGELOG.md`
2. `README.md`
3. `docs/project-discipline.md`
4. `docs/architecture-decisions.md`
5. `docs/openfront-source-map.md`
6. `docs/openfront-mechanics-sources.md`
7. `docs/openfront-asset-policy.md`
8. `docs/openfront-asset-inventory.md`
9. `docs/licensing-and-attribution.md`
10. `docs/benchmark-policy-engine.md`
11. `docs/upstream-status.json`

## Project Direction

- OpenFront Sandbox is source-faithful by default.
- It is an offline, fair-play training sandbox.
- It is not an OpenFront-inspired approximation.
- Do not invent mechanics, fake constants, fake formulas, fake maps, or arbitrary gameplay values unless explicitly approved as temporary non-gameplay placeholders.
- If a mechanic is complex or unclear, stop and inspect OpenFront source instead of guessing.

## Fair-Play Boundaries

Do not add any of the following without explicit approval:

- Live match interaction.
- Content scripts.
- Hidden-state reading.
- Packet, network, or WebSocket inspection.
- Gameplay automation.
- Live overlays.
- Browser host permissions.
- OpenFront page integration.

## Future Benchmark and Replay Features

- Benchmark policy, support, transfer, coordination, simulation evaluation, and replay-review features must remain offline or post-game only.
- Replay review may use only user-provided or officially supported post-game data.
- Do not provide real-time recommendations for live OpenFront matches.
- Strategic recommendations must state their assumptions and must not imply guaranteed perfect play.

## Licensing

- OpenFront Sandbox code is AGPL-3.0-only.
- OpenFront code and assets must be tracked before use.
- OpenFront `/resources` assets may be used only when confirmed, inventoried, and attributed.
- OpenFront `/proprietary`, CDN/API/database-hosted, premium, and unknown-license assets are forbidden unless explicit written permission is documented.
- Do not copy OpenFront code or assets into this repository without approved intake notes.

## Public Quality

- Do not commit private scratch notes, rough planning notes, or unpublished private plans.
- Do not mention Cursor, Codex, ChatGPT, prompts, internal reasoning, or hidden planning in repository files.
- Keep docs professional and useful to players and contributors.
- Do not include secrets, tokens, credentials, personal data, or unsupported legal certainty.

## Phase Workflow

- Propose a small plan before implementation.
- Implement only the approved scope.
- Run quality gates before a phase is considered complete.
- Update `CHANGELOG.md`.
- Update `docs/architecture-decisions.md` if architecture changed.
- Show `git status`.
- Propose a commit message and optional tag.
- Do not commit or tag without approval.

Quality gates:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Scope Control

Never add dependencies, browser permissions, backend services, analytics, accounts, external APIs, content scripts, or OpenFront integration without explicit approval.

## Source-Derived Mechanics

- Cite source paths and commit hashes in `docs/openfront-mechanics-sources.md`.
- Add tests.
- Keep implementation modular.
- Do not mix UI and simulation logic.
- Keep every mechanic marked `not implemented` until code and tests exist.

## Assets

- Update `docs/openfront-asset-inventory.md` before importing or deriving from assets.
- Update `NOTICE` if attribution changes.
- Keep forbidden assets out of the repository.
