# Benchmark Policy Engine

This document describes a future OpenFront Sandbox architecture direction. It is not implemented yet. It defines the intended boundary for benchmark play, simulation evaluation, replay-style review, and support or coordination actions before any code is added.

OpenFront Sandbox should remain an offline, fair-play training sandbox. The benchmark policy engine is intended to help players study decisions under documented assumptions. It must not interact with live OpenFront matches or provide real-time gameplay assistance.

## Goals

- Evaluate offline scenarios with source-faithful mechanics where those mechanics are verified and documented.
- Compare available sandbox actions against a clear benchmark policy.
- Explain why one action scores better than another under stated assumptions.
- Identify timing mistakes, resource inefficiencies, and defensive or offensive weaknesses after a sandbox simulation.
- Support future replay-style review only from user-provided or officially supported post-game data.

## Meaning of Optimal

`Optimal` means `optimal under stated assumptions`. A recommendation may be exact only for mechanics and inputs that are source-code verified and represented in the sandbox. Strategic recommendations that depend on opponents, alliances, diplomacy, timing, or incomplete information are probabilistic model outputs, not guarantees of perfect play.

Every future recommendation should be able to state:

- The visible scenario inputs used.
- The source-derived mechanics used.
- The assumptions or opponent models used.
- The alternatives compared.
- The main tradeoffs that changed the recommendation.

## Benchmark Policy Engine

The benchmark policy engine is a future offline decision policy for OpenFront Sandbox. It should eventually evaluate legal sandbox actions, forward-simulate outcomes, and compare alternatives with transparent scoring.

Potential action categories include:

- Expansion and waiting.
- Building and upgrading.
- Attacking and defending.
- Resource preservation and spending.
- Source-verified missile, naval, trade, and building actions.
- Support, transfer, and coordination actions when OpenFront source mechanics support them.

The policy should be benchmark-oriented: it should represent strong offline play inside the sandbox, highlight mistakes, and show why a choice is recommended. It should not be a live-match assistant, automation tool, overlay, content script, or client modification.

## Support and Coordination Actions

Support and coordination actions are future sandbox action types, not live-player coordination tools. They may include source-verified actions such as resource transfers, defensive support, alliance-aware timing, or coordinated pressure in a simulated scenario.

Before implementing these actions, the project must verify the relevant OpenFront source behavior and document it in `docs/openfront-mechanics-sources.md`.

Future evaluation may consider:

- Whether a transfer reaches a meaningful breakpoint.
- Whether support creates better expected value than direct self-investment.
- Whether the receiving sandbox player or agent can convert support into pressure, defense, or survival.
- Whether the support weakens the sender below a defensive or deterrence threshold.
- Whether alliance, betrayal, elimination, or timing assumptions change the expected value.
- Whether a coordinated attack or defense depends on uncertain opponent behavior.

Explanations should stay concrete and scenario-based. For example, a future report might say that supporting a sandbox ally is preferred because it keeps them above a survival threshold and delays an enemy timing window, while still preserving the sender's minimum defense requirement. That statement would need to list the assumptions that make it true.

## Simulation Evaluation

Future simulations should produce structured post-run evaluation rather than vague advice. A useful report may include:

- Overall performance under stated assumptions.
- Category scores for expansion, economy, defense, attack timing, building timing, naval control, missile resilience, and diplomacy risk when those mechanics exist.
- A timeline of major turning points.
- Missed opportunities and overextensions.
- Actions that had the largest positive or negative expected-value impact.
- Suggested practice drills based on the weakest categories.

Simulation scoring must be modular and testable. It should not mix UI rendering with simulation logic.

## Replay Review

Replay-style review is a future post-game learning feature. It may be considered only for data that is user-provided or officially supported by OpenFront. It must not rely on hidden-state reading, packet inspection, WebSocket inspection, live scraping, content scripts, live overlays, automation, or any real-time match interaction.

Replay review should help a player understand completed decisions. It should not provide instructions during a live match.

## Fair-Play Boundary

The benchmark, support, simulation, and replay-review systems must remain inside these boundaries:

- No live match interaction.
- No gameplay automation.
- No hidden-state reading.
- No packet, network, or WebSocket inspection.
- No live overlays.
- No content scripts or OpenFront page integration without explicit approval and fair-play review.
- No browser host permissions unless explicitly approved.
- No real-time gameplay recommendations for live OpenFront matches.

Any feature that approaches these boundaries must stop for human review before implementation.

## Implementation Gates

Before implementing any part of this architecture:

1. Locate and document relevant OpenFront source paths and commit hashes.
2. Update `docs/openfront-mechanics-sources.md`.
3. Update `docs/openfront-source-map.md` if new source areas are needed.
4. Update `docs/openfront-asset-inventory.md` and `NOTICE` if assets are imported.
5. Add focused tests for simulation and policy logic.
6. Update `docs/architecture-decisions.md` if the architecture changes.
7. Run all quality gates.

## Status

Not implemented. This document is a planning and compliance boundary for future approved work.
