# Project Discipline

OpenFront Sandbox should default to sandboxed, manual, offline learning tools. Do not add live OpenFront integrations, hidden-state access, gameplay automation, client modification, or cheat-adjacent behavior without explicit approval.

## Long-Term North Star

The long-term north star is to help players reason clearly about OpenFront-style strategy in a fair, offline training sandbox. The project should teach decision quality, tradeoffs, and assumptions without automating live play or modifying OpenFront.

## Project Memory

- Check `CHANGELOG.md` before making updates.
- Keep `CHANGELOG.md` live by adding a concise entry after meaningful project changes.
- Use `CHANGELOG.md` as the fastest recovery point when context has compacted or a new session begins.
- Check this document, `docs/architecture-decisions.md`, `docs/licensing-and-attribution.md`, `docs/openfront-asset-policy.md`, `docs/openfront-asset-inventory.md`, `docs/openfront-source-map.md`, and `docs/openfront-mechanics-sources.md` when a change touches project rules, architecture, licensing, source intake, assets, or OpenFront mechanics.

## Mechanics and Compliance Preflight

Before implementing mechanics or compliance-sensitive features, check:

1. `CHANGELOG.md`
2. `docs/project-discipline.md`
3. `docs/licensing-and-attribution.md`
4. `docs/openfront-asset-policy.md`
5. `docs/openfront-asset-inventory.md`
6. `docs/openfront-source-map.md`
7. `docs/openfront-mechanics-sources.md`
8. `docs/upstream-status.json`
9. The latest file in `docs/upstream-checks/`

If `docs/upstream-status.json` has `"reviewRequired": true`, stop and ask before changing game-related or compliance-sensitive logic.

## Upstream Watch Process

- Use `docs/upstream-watch.md` and `docs/upstream-status.json` to stay aware of OpenFront source, release, terms, and privacy changes.
- Treat upstream watch reports as human-review inputs only.
- Do not automatically update mechanics, formulas, scoring, fair-play rules, browser permissions, host permissions, content script behavior, planner behavior, or OpenFront integration behavior from upstream checks.

## Source Tracking and Game Accuracy

- OpenFront Sandbox is source-faithful by default.
- Do not add invented mechanics, fake formulas, fake constants, fake maps, or arbitrary gameplay values unless they are explicitly approved as temporary educational placeholders.
- If exact mechanics are complex, stop and perform source research instead of inventing a simplification.
- Use direct OpenFront public source and open assets where legally allowed, technically useful, and explicitly approved for intake.
- Never use OpenFront proprietary assets, external/CDN/API/database-hosted assets, premium assets, or unknown-license assets unless explicit written permission is obtained and documented.
- Track every copied or adapted source file, source-derived implementation, and imported asset with upstream path, commit hash, license status, attribution, and review notes.
- Do not guess silently when implementing OpenFront-related mechanics.
- Document every game mechanic constant or rule with source and confidence level in code.
- Update `docs/openfront-mechanics-sources.md` before implementing mechanics that claim to match OpenFront.
- Temporary educational placeholders require explicit approval and must be labeled as training assumptions in both code and UI.
- Define `optimal` as `optimal under stated assumptions`: the best recommendation for the visible inputs, documented assumptions, simplifications, and sourced formulas currently in use.
- Do not imply guaranteed perfect play, hidden-state awareness, live-game automation, or exact OpenFront behavior unless the relevant mechanics are source-code verified and documented.

## Benchmark and Replay Direction

- Future benchmark policy, support, transfer, coordination, simulation evaluation, and replay-review features must remain offline or post-game learning tools.
- Support and coordination actions are sandbox action categories only; they must not become live-player coordination tools or real-time match advice.
- Replay-style review may use only user-provided or officially supported post-game data.
- Do not add live recommendations, live overlays, hidden-state reading, packet or WebSocket inspection, automation, content scripts, or OpenFront page integration without explicit approval and fair-play review.
- Document future benchmark and replay architecture in `docs/benchmark-policy-engine.md`.

## Fair Play

- Review current OpenFront rules, terms, and source-code expectations before adding features that interact with OpenFront itself.
- Stop and ask before implementing anything that could provide a live gameplay advantage, automate gameplay, read hidden state, modify the client, or otherwise become cheat-adjacent.
- Keep Phase 0 and Phase 1 within the fair-play sandbox boundary: no OpenFront page integration, no content scripts, no live overlays, no gameplay automation, no hidden-state reading, no client modification, no host permissions, and no exact mechanic claims without documented sources.

## Scope Control

Ask before implementing major features, including:

- Content scripts
- Live overlays
- OpenFront page integration
- AI opponents
- Monte Carlo full-game simulations
- Accounts
- Backend
- Payment systems
- Analytics
- External APIs
- New large dependencies
- Browser permissions beyond storage

For each suggestion, provide what it adds, why it helps, risk level, complexity level, and fair-play impact, then wait for approval.

## Dependencies

- Do not add dependencies unless clearly necessary.
- Before adding one, explain why native code is not enough, bundle-size impact, maintenance risk, and license compatibility.
- Prefer simple TypeScript and React code over heavy libraries.

## Quality Gates

Before considering a phase complete, run or provide instructions for:

- TypeScript check
- Tests
- Lint
- Production build
- Extension build, if applicable

Do not mark work complete if the app does not build.

## Version-Control Checkpoints

After each meaningful phase or subphase:

1. Run quality gates:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`
   - `npm run build`
2. Update `CHANGELOG.md`.
3. Update `docs/architecture-decisions.md` if architecture changed.
4. Show `git status`.
5. Propose a commit message and optional version tag.
6. Wait for approval before committing.

Do not auto-commit or create tags without explicit approval.

Use this version pattern:

- `v0.1.0-phase-1a` for app shell
- `v0.1.1-phase-1b` for licensing and source intake
- `v0.1.2-phase-1c` for source and asset inventory
- `v0.1.3-phase-1d` for visual sandbox grid
- `v0.1.4-phase-1e` for analysis panel
- `v0.1.5-phase-1f` for extension launcher
- `v0.1.6-phase-1g` for GitHub Pages deployment

A future `npm run checkpoint` helper may be added only if it does not commit or tag automatically. It should only run quality gates, print git status, remind the user to update the changelog, and suggest the next tag.

## Privacy and Permissions

- Do not add tracking, analytics, telemetry, cookies, accounts, or remote logging.
- Keep Phase 1 data local.
- If saved scenarios are implemented, use local browser storage only.
- Phase 1 should use no host permissions.
- If storage is used, request only `storage`.
- Do not request permissions for openfront.io, tabs, webRequest, scripting, activeTab, or host access without explicit approval.

## Branding and Support

- Use the name OpenFront Sandbox.
- Make the Buy Me a Coffee button visible but tasteful.
- Do not make the app feel paywalled or spammy.
- Keep core learning features free in early versions.
- Document supporter-only ideas for later rather than implementing them now.
