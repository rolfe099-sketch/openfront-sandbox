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
- `source-code verified`: Exact source path, commit hash, implementation notes, and tests are recorded for the listed scope.

## Source Inspection Baseline

| Field | Value |
| --- | --- |
| OpenFront repository | https://github.com/openfrontio/OpenFrontIO |
| Branch | `main` |
| Checked commit | `af2849a2d71a7700a72c077a9e5616e990e584f6` |
| Upstream commit date | `2026-06-10T20:00:53-07:00` |
| Last checked | 2026-06-11 |
| Local inspection path | `.external/openfront` |
| Local clone committed? | No |
| Git ignore verification | `.gitignore:4:.external/` |

## Source-Aligned Model Foundation

Phase 1D adds a small TypeScript foundation for source references and scenario snapshots. These are infrastructure pieces only. They do not implement mechanics, formulas, scoring, simulation, construction behavior, map loading, or OpenFront gameplay rules.

| Foundation | OpenFront source path(s) | OpenFront Sandbox path(s) | Checked commit | Last checked | Implementation status | Source status | Exactness | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Source reference metadata | `src/core/game/Game.ts`; `src/core/game/GameMap.ts`; `src/core/execution/ConstructionExecution.ts` | `src/core/source/source-reference.ts`; `src/core/source/source-reference.test.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | implemented as infrastructure | source-located | source-aligned model | Tracks repo URL, branch, commit hash, checked date, source path, confidence, and exactness for future source-derived work. |
| Core aliases and coordinate vocabulary | `src/core/game/Game.ts`; `src/core/game/GameMap.ts` | `src/core/scenario/types.ts`; `src/core/scenario/types.test.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | implemented as infrastructure | source-located | source-aligned model | Defines `PlayerID`, `Tick`, `Gold`, `TileRef`, and `MapPos` shapes without map behavior or gameplay rules. |
| Unit type vocabulary and scenario snapshots | `src/core/game/Game.ts`; `src/core/execution/ConstructionExecution.ts` | `src/core/scenario/types.ts`; `src/core/scenario/types.test.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | implemented as infrastructure | source-located | source-aligned model | Captures OpenFront unit type names and basic player/unit/map snapshot shapes only. Costs, ranges, build rules, construction behavior, and scoring remain not implemented. |

## Mechanics Register

| Mechanic | OpenFront source path(s) | Checked commit | Last checked | Implementation status | Source status | Exactness | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GameMap tile geometry primitives | `src/core/game/GameMap.ts` lines 3-51, 131-180, 333-384 | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | implemented | source-code verified | source-derived behavior | Implemented in `src/core/map/tile-geometry.ts` with tests in `src/core/map/tile-geometry.test.ts`. Scope is limited to `TileRef`, `ref`, `isValidRef`, `x`, `y`, `isValidCoord`, cardinal `neighbors`, `manhattanDist`, `euclideanDistSquared`, and `circleSearch`. Terrain, ownership, map loading, BFS, pathfinding, scoring, and simulation are not implemented. |
| Maps/map loading | `resources/maps/**`; `src/core/game/GameMap.ts`; `src/core/game/*GameMapLoader*.ts`; `src/core/game/TerrainMapLoader.ts`; `src/core/game/TerrainSearchMap.ts`; `src/core/pathfinding/**` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | needs review | not implemented | Map files are open-asset candidates. Do not copy or adapt maps until per-file licensing and source review are approved. |
| Deterministic core simulation | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/core/game/GameUpdateUtils.ts`; `src/core/execution/ExecutionManager.ts`; `src/core/execution/**` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Core tick behavior is source-located but not modeled. |
| Game state | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameView.ts`; `src/core/game/UnitImpl.ts`; `src/core/game/UnitGrid.ts`; `src/core/game/Stats*.ts`; `src/core/game/WaterManager.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Game, unit, stats, ownership, water, and public view state are source-located. |
| Player/nation state | `src/core/game/PlayerImpl.ts`; `src/core/game/Game.ts`; `src/core/game/NationCreation.ts`; `src/core/execution/NationExecution.ts`; `src/core/execution/nation/**`; `src/core/execution/Tribe*.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Player resources, relations, nations, and tribe behavior require focused review. |
| Troops/population | `src/core/game/PlayerImpl.ts`; `src/core/configuration/Config.ts`; `src/core/execution/AttackExecution.ts`; `src/core/execution/PlayerExecution.ts`; `src/core/execution/DonateTroopExecution.ts`; `src/core/game/Game.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Troop growth, caps, losses, donations, and attack flow are not implemented. |
| Gold/economy | `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/DonateGoldExecution.ts`; `src/core/execution/TradeShipExecution.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetworkImpl.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Economy values and formulas are source-located but not copied or modeled. |
| Buildings | `src/core/game/Game.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/execution/UpgradeStructureExecution.ts`; `src/core/execution/DeleteUnitExecution.ts`; `src/client/hud/layers/BuildMenu.ts`; `src/client/hud/layers/UnitDisplay.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Buildable structure groups, construction flow, upgrades, deletion, and UI display references need review. |
| City | `src/core/execution/CityExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts`; `src/core/execution/nation/NationStructureBehavior.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | City behavior is source-located but not implemented. |
| Port | `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationStructureBehavior.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Port behavior, trade ships, placement, and nation placement references require focused review. |
| Factory | `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetwork*.ts`; `src/core/game/Railroad*.ts`; `src/core/game/TrainStation.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/TrainStationExecution.ts`; `src/core/execution/RecomputeRailClusterExecution.ts`; `src/core/configuration/Config.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Factory behavior connects to rail and train systems. |
| SAM launcher | `src/core/execution/SAMLauncherExecution.ts`; `src/core/execution/SAMMissileExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts`; `src/client/render/gl/passes/SamRadiusPass.ts`; `src/client/render/gl/shaders/sam-radius/**` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | SAM core behavior, range display, cooldown, and targeting are not implemented. |
| Missile silo | `src/core/execution/MissileSiloExecution.ts`; `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationNukeBehavior.ts`; `src/core/execution/nation/NationMIRVBehavior.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Silo behavior is tied to nuke construction and launch rules. |
| Nukes/MIRV | `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/client/render/gl/utils/NukeTrajectory.ts`; `src/client/render/frame/derive/NukeTelegraphs.ts`; `src/client/render/gl/passes/NukeTrajectoryPass.ts`; `src/client/render/gl/passes/NukeTelegraphPass.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Core execution files are authoritative; client trajectory files are display-oriented and need review before use. |
| Warships | `src/core/execution/WarshipExecution.ts`; `src/core/execution/MoveWarshipExecution.ts`; `src/core/execution/ShellExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationWarshipBehavior.ts`; `src/client/controllers/WarshipSelectionController.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Warship movement, targeting, shells, port interactions, and nation behavior are not implemented. |
| Transport ships | `src/core/execution/TransportShipExecution.ts`; `src/core/execution/BoatRetreatExecution.ts`; `src/core/game/TransportShipUtils.ts`; `src/core/game/PlayerImpl.ts`; `src/core/pathfinding/**`; `src/core/execution/utils/AiAttackBehavior.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Transport spawning, retreat, pathing, and attack flow require review. |
| Trade ships/routes | `src/core/execution/TradeShipExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationWarshipBehavior.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Trade route eligibility, spawning, payout, and related warship behavior are not implemented. |
| Alliances/diplomacy | `src/core/game/AllianceImpl.ts`; `src/core/game/AllianceRequestImpl.ts`; `src/core/game/GameImpl.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/alliance/**`; `src/core/execution/Embargo*.ts`; `src/core/configuration/Config.ts`; `src/client/hud/layers/ActionableEvents.ts`; `src/client/hud/layers/PlayerInfoOverlay.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Diplomacy behavior is source-located but not implemented. |
| Modifiers/settings | `src/core/Schemas.ts`; `src/core/configuration/Config.ts`; `src/core/game/UserSettings.ts`; `src/client/hud/layers/SettingsModal.ts`; `src/client/render/gl/render-settings.json`; `src/client/render/gl/RenderSettings.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Game modifiers, disabled-unit settings, water nukes, and user/render settings are source-located but not implemented. |
| Win condition | `src/core/execution/WinCheckExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/client/hud/layers/WinModal.ts` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 | not implemented | source-located | not implemented | Win condition behavior is source-located but not implemented. |
