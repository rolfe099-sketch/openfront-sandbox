# OpenFront Mechanics Sources

This register tracks every OpenFront-related mechanic, constant, rule, and formula used by OpenFront Sandbox.

OpenFront Sandbox is source-faithful by default. Do not add invented mechanics, fake formulas, fake constants, fake maps, or arbitrary gameplay values unless they are explicitly approved as temporary educational placeholders. If exact mechanics are complex, stop and perform source research instead of inventing a simplification.

## Project Boundary

The long-term north star is to support fair, offline OpenFront-style training and decision review. This file helps preserve the fair-play sandbox boundary by making every mechanics claim traceable before it can affect planner behavior, scoring, or UI language.

Before changing this file for implemented mechanics, check `CHANGELOG.md`, `docs/project-discipline.md`, `docs/licensing-and-attribution.md`, `docs/openfront-asset-policy.md`, `docs/openfront-asset-inventory.md`, `docs/openfront-source-map.md`, `docs/upstream-status.json`, and the latest upstream watch report.

If upstream status has `"reviewRequired": true`, stop and ask before changing game-related logic.

## Optimal Under Stated Assumptions

When the project uses the word `optimal`, it means `optimal under stated assumptions`: best according to the visible inputs, documented assumptions, simplifications, and sourced formulas currently in use.

It must not imply exact OpenFront mechanics, hidden-state awareness, live-game automation, or guaranteed perfect play unless source-code verification supports that claim.

## Source Status Labels

- `unknown`: Relevant source has not been located yet.
- `source-located`: Relevant source path has been located, but no OpenFront Sandbox implementation has been verified against it.
- `needs review`: Relevant source exists or is suspected, but the behavior is complex enough to require focused review before implementation.
- `source-code verified`: Exact source path, commit hash, implementation notes, and tests are recorded. No mechanics are source-code verified yet.

## Source Inspection Baseline

| Field | Value |
| --- | --- |
| OpenFront repository | https://github.com/openfrontio/OpenFrontIO |
| Checked commit | `af2849a2d71a7700a72c077a9e5616e990e584f6` |
| Upstream commit date | `2026-06-10T20:00:53-07:00` |
| Last checked | 2026-06-11 |
| Local inspection path | `.external/openfront` |
| Local clone committed? | No |

## Mechanics Register

| Mechanic | OpenFront source path(s) | Checked commit | Last checked | Implementation status | Source status | Exactness | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Maps | `resources/maps/**`; `src/core/game/GameMap.ts`; `src/core/game/*GameMapLoader*.ts`; `src/core/game/TerrainMapLoader.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | needs review | not implemented | Map files are assets/resources. Do not copy or adapt maps until licensing and source review are approved. |
| Deterministic core simulation | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/execution/**`; `src/core/game/GameUpdates.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Core tick behavior is source-located but not modeled. |
| Player/nation state | `src/core/game/PlayerImpl.ts`; `src/core/game/Game.ts`; `src/core/execution/nation/**`; `src/core/execution/NationCreation.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Player resources, relations, and nation behavior require focused review. |
| Troops/population | `src/core/game/PlayerImpl.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Troop growth, caps, losses, and attack flow are not implemented. |
| Gold/economy | `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/TradeShipExecution.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/execution/FactoryExecution.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Economy values and formulas are source-located but not copied or modeled. |
| Buildings | `src/core/game/Game.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Buildable structure groups, construction flow, and placement rules need review. |
| City | `src/core/execution/CityExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | City behavior is source-located but not implemented. |
| Port | `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Port behavior, trade ships, and placement require focused review. |
| Factory | `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetworkImpl.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/TrainStationExecution.ts`; `src/core/configuration/Config.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Factory behavior connects to rail and train systems. |
| SAM launcher | `src/core/execution/SAMLauncherExecution.ts`; `src/core/execution/SAMMissileExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | SAM behavior, range, cooldown, and targeting are not implemented. |
| Missile silo | `src/core/execution/MissileSiloExecution.ts`; `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Silo behavior is tied to nuke construction and launch rules. |
| Nukes/MIRV | `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/client/render/gl/utils/NukeTrajectory.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Core execution files are authoritative; client trajectory files are display-oriented and need review before use. |
| Warships | `src/core/execution/WarshipExecution.ts`; `src/core/execution/MoveWarshipExecution.ts`; `src/core/execution/ShellExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Warship movement, targeting, shells, and port interactions are not implemented. |
| Transport ships | `src/core/execution/TransportShipExecution.ts`; `src/core/execution/BoatRetreatExecution.ts`; `src/core/game/TransportShipUtils.ts`; `src/core/game/PlayerImpl.ts`; `src/core/pathfinding/**` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Transport spawning, retreat, pathing, and attack flow require review. |
| Trade ships/routes | `src/core/execution/TradeShipExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Trade route eligibility, spawning, and payout are not implemented. |
| Alliances/diplomacy | `src/core/game/AllianceImpl.ts`; `src/core/game/AllianceRequestImpl.ts`; `src/core/game/GameImpl.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/alliance/**`; `src/core/configuration/Config.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Diplomacy behavior is source-located but not implemented. |
| Modifiers/settings | `src/core/Schemas.ts`; `src/core/configuration/Config.ts`; `src/core/game/UserSettings.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Game modifiers and disabled-unit settings are source-located but not implemented. |
| Win condition | `src/core/execution/WinCheckExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/GameImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Win condition behavior is source-located but not implemented. |
