# OpenFront Source Map

This source map records where future source-faithful OpenFront Sandbox work should begin. It does not authorize implementation by itself. Every mechanic still requires focused source review, fair-play review, licensing review, and documentation before it can affect planner behavior.

## Source Intake Approach

OpenFront source is inspected through a local clone that is ignored by Git:

```bash
git clone https://github.com/openfrontio/OpenFrontIO.git .external/openfront
```

The `.external/` directory must remain uncommitted. OpenFront Sandbox should record any inspected upstream commit hash before using source findings. Source or asset intake must be approved and tracked before anything is copied or adapted into this repository.

Current inspection baseline:

- Repository: https://github.com/openfrontio/OpenFrontIO
- Branch: `main`
- Local path: `.external/openfront`
- Checked commit: `af2849a2d71a7700a72c077a9e5616e990e584f6`
- Upstream commit date: `2026-06-10T20:00:53-07:00`
- Last checked: 2026-06-11
- Git ignore verification: `.gitignore:4:.external/`
- Clone status: present locally and untracked by OpenFront Sandbox

## Phase 1D Source-Aligned Model Foundation

OpenFront Sandbox now has a minimal TypeScript model foundation in `src/core/source/` and `src/core/scenario/`. This foundation is aligned to upstream names and shapes from `src/core/game/Game.ts`, `src/core/game/GameMap.ts`, and `src/core/execution/ConstructionExecution.ts` at the checked commit.

This foundation does not implement OpenFront mechanics, formulas, scoring, simulation, map loading, construction behavior, unit costs, ranges, or UI behavior. It exists to make future source-derived mechanics easier to implement and cite.

## Phase 1E Tile Geometry Helpers

OpenFront Sandbox now implements a source-derived, pure TypeScript subset of OpenFront `GameMap.ts` tile geometry in `src/core/map/tile-geometry.ts`.

Implemented scope: `TileRef`, `ref`, `isValidRef`, `x`, `y`, `isValidCoord`, cardinal `neighbors`, `manhattanDist`, `euclideanDistSquared`, and `circleSearch`. This does not implement terrain bytes, mutable tile state, ownership, fallout, water/shore behavior, BFS, pathfinding, map binaries, map assets, scoring, simulation, or UI rendering.

## Phase 1F Build Action Catalogue

OpenFront Sandbox now implements a source-derived, pure TypeScript catalogue of OpenFront build/action vocabulary in `src/core/build/build-action-catalogue.ts`.

Implemented scope: `Nukes`, `Structures`, `BuildableAttacks`, `BuildMenus`, `PlayerBuildable`, normal build menu display order, source-present internal unit exclusions, and structure vs non-structure construction classification. This preserves source terminology, including OpenFront's `BuildableAttacks` group containing `Warship`.

This does not implement costs, placement legality, disabled-unit/modifier checks, economy, construction duration, combat, action execution, UI icons/assets, scoring, simulation, or browser/extension behavior.

## Phase 1G Disabled Unit Checks

OpenFront Sandbox now implements source-derived, pure TypeScript disabled-unit checks in `src/core/build/disabled-unit-checks.ts`.

Implemented scope: the verified OpenFront behavior `disabledUnits?.includes(unitType) ?? false`, plus build menu and player-buildable filtering based on that exact disabled unit list. Public game modifier flags are tracked for source awareness, but OpenFront Sandbox does not infer that `isPortsDisabled`, `isNukesDisabled`, or `isSAMsDisabled` disables specific unit types without an exact source mapping.

This does not implement costs, placement legality, economy checks, construction duration, build execution, combat, scoring, simulation, UI canvas, extension behavior, browser permissions, content scripts, or OpenFront integration.

## Phase 1H Build Availability Preflight Boundaries

OpenFront Sandbox now implements a source-aligned, pure TypeScript preflight boundary model in `src/core/build/build-availability-preflight.ts`.

Implemented scope: preflight input and result shape, stable active reason ordering, `not-player-buildable-catalogue-entry`, and `disabled-unit` checks. The passing status is intentionally named `available-for-future-checks` so it does not imply complete OpenFront build legality.

Future reason categories are represented as metadata only: invalid target refs, insufficient gold, player alive state, spawn phase, spawn tile legality, upgrade state, and construction execution. These categories are source-located but not active logic until their exact source-derived behavior is implemented and tested.

This does not implement costs, gold checks, placement legality, target tile validation, player alive state, spawn phase logic, upgrade validity, construction duration, construction execution, combat, scoring, simulation, UI canvas, extension behavior, browser permissions, content scripts, or OpenFront integration.

## Phase 1I Build Availability Preflight V1

OpenFront Sandbox now activates `invalid-target-ref` in `src/core/build/build-availability-preflight.ts` using the existing source-derived `OpenFrontTileGeometry.isValidRef` helper from `src/core/map/tile-geometry.ts`.

Implemented scope: explicit target ref bounds validation when both `targetTile` and a tile geometry context are provided, stable active reason ordering, pass/fail helpers, and preflight explanation helpers. The passing status remains `available-for-future-checks`, and explanation strings state that preflight is not full OpenFront build legality.

This does not implement terrain checks, ownership checks, coast/water/land placement rules, spawn validity, placement legality, costs, gold checks, player alive state, spawn phase logic, upgrade validity, construction duration, construction execution, combat, scoring, simulation, UI canvas, extension behavior, browser permissions, content scripts, or OpenFront integration.

## Phase 1J Map Surface Primitives and Placement Boundary Map

OpenFront Sandbox now implements a source-derived map surface context layer in `src/core/map/map-surface.ts`.

Implemented scope: source-derived valid-ref-safe access to land, water, shore, ocean, ocean shore, shoreline, owner id, and has-owner predicates under a provided map context. Safe tile surface snapshots explicitly report that they do not evaluate OpenFront build placement legality.

OpenFront Sandbox also records a future-only placement boundary map in `src/core/build/placement-boundary-map.ts`.

Documented future boundary categories: terrain/surface checks, ownership checks, shoreline/coast/water checks, port spawn radius behavior, valid structure tile search, transport ship spatial behavior, trade ship targeting, nuke/silo targeting, structure distance rules, costs/gold/player state, and construction execution.

This does not implement actual build placement legality, port placement, SAM placement, city/factory/defense post placement, ownership-based build legality, coast/water/land build legality, valid spawn tile algorithms, structure distance rules, port spawn radius behavior, transport ship placement, trade ship targeting, nuke targeting, costs, gold checks, player alive state, spawn phase logic, upgrade validity, construction duration, construction execution, combat, scoring, simulation, UI canvas, extension behavior, browser permissions, content scripts, or OpenFront integration.

## Source Areas

| Area | Likely source path/file | Status | Notes | Safe to implement now? |
| --- | --- | --- | --- | --- |
| Deterministic core simulation | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/core/game/GameUpdateUtils.ts`; `src/core/execution/ExecutionManager.ts`; `src/core/execution/**` | located | Core domain interfaces, tick execution, execution dispatch, updates, player/unit mutation, and win state are source-located. | Needs more review. |
| Game state | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameView.ts`; `src/core/game/UnitImpl.ts`; `src/core/game/UnitGrid.ts`; `src/core/game/Stats.ts`; `src/core/game/StatsImpl.ts`; `src/core/game/WaterManager.ts` | located | Game, unit, map ownership, stats, water, and public view state are source-located. | Needs more review. |
| Maps/map loading | `resources/maps/**`; `src/core/game/GameMap.ts`; `src/core/game/GameMapLoader.ts`; `src/core/game/BinaryLoaderGameMapLoader.ts`; `src/core/game/FetchGameMapLoader.ts`; `src/core/game/TerrainMapLoader.ts`; `src/core/game/TerrainSearchMap.ts`; `src/core/pathfinding/**` | located | Map directories contain `manifest.json`, `map.bin`, `map4x.bin`, `map16x.bin`, and `thumbnail.webp` patterns. Map files are open-asset candidates and need per-file asset review before reuse. | Needs more review. |
| GameMap tile geometry primitives | `src/core/game/GameMap.ts` lines 3-51, 131-180, 333-384 | implemented for listed scope | Pure tile geometry helpers are implemented in `src/core/map/tile-geometry.ts` with source-derived tests. | Implemented for listed helpers only. |
| GameMap map surface and ownership primitives | `src/core/game/GameMap.ts` lines 156-337 | implemented for listed scope | Source-derived map surface/context helpers are implemented in `src/core/map/map-surface.ts` with tests. Scope is limited to surface and ownership predicates under a provided context. Safe snapshots do not evaluate build placement legality. | Implemented for listed helpers only. |
| Build/action catalogue and grouping | `src/core/game/Game.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/game/PlayerImpl.ts`; `src/client/hud/layers/BuildMenu.ts`; `src/core/execution/ExecutionManager.ts`; `src/core/GameRunner.ts`; `src/core/worker/WorkerMessages.ts` | implemented for listed scope | Source-derived build/action vocabulary and grouping helpers are implemented in `src/core/build/build-action-catalogue.ts` with tests. UI icon paths and asset references from `BuildMenu.ts` are intentionally not used. | Implemented for catalogue/classification only. |
| Disabled unit checks | `src/core/configuration/Config.ts`; `src/core/Schemas.ts`; `src/core/game/Game.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/game/PlayerImpl.ts` | implemented for listed scope | Source-derived disabled-unit helpers are implemented in `src/core/build/disabled-unit-checks.ts` with tests. Scope is limited to `Config.isUnitDisabled` behavior and build catalogue filtering from the explicit `disabledUnits` list. Public modifier flags are not mapped to disabled units without exact source evidence. | Implemented for disabledUnits membership checks only. |
| Build availability preflight boundaries | `src/core/game/GameMap.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/execution/ExecutionManager.ts`; `src/core/GameRunner.ts`; `src/core/worker/WorkerMessages.ts`; `src/core/configuration/Config.ts`; `src/core/Schemas.ts`; `src/core/game/Game.ts` | implemented for listed scope | Source-aligned preflight model is implemented in `src/core/build/build-availability-preflight.ts` with tests. Active checks are limited to player-buildable catalogue membership, explicit disabled-unit membership, and target ref bounds when geometry context is provided. Future reason categories remain metadata only. | Implemented for preflight V1 boundary checks only. |
| Placement boundary map | `src/core/game/GameMap.ts`; `src/core/game/PlayerImpl.ts`; `src/core/game/TransportShipUtils.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/configuration/Config.ts` | source-located for future categories | Future placement boundary categories are documented in `src/core/build/placement-boundary-map.ts` with tests that keep every category future-only. | Not implemented as placement legality. |
| Player/nation state | `src/core/game/PlayerImpl.ts`; `src/core/game/Game.ts`; `src/core/game/NationCreation.ts`; `src/core/execution/NationExecution.ts`; `src/core/execution/TribeExecution.ts`; `src/core/execution/TribeSpawner.ts`; `src/core/execution/nation/**` | located | Player resource state, relations, nation spawning, nation behavior, and tribe behavior are source-located but complex. | Needs more review. |
| Troops/population | `src/core/game/PlayerImpl.ts`; `src/core/configuration/Config.ts`; `src/core/execution/AttackExecution.ts`; `src/core/execution/PlayerExecution.ts`; `src/core/execution/DonateTroopExecution.ts`; `src/core/game/Game.ts` | located | Troop growth, caps, donations, attacks, tile ownership, and player state need focused source tracing. | Needs more review. |
| Gold/economy | `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/DonateGoldExecution.ts`; `src/core/execution/TradeShipExecution.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetworkImpl.ts` | located | Gold income, costs, donations, trade ships, trains, rail connections, ports, and factories are source-located. Do not copy values until reviewed. | Needs more review. |
| Buildings | `src/core/game/Game.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/execution/UpgradeStructureExecution.ts`; `src/core/execution/DeleteUnitExecution.ts`; `src/client/hud/layers/BuildMenu.ts`; `src/client/hud/layers/UnitDisplay.ts` | partially implemented | Catalogue membership, disabled-unit checks, preflight boundary shape, and target ref bounds preflight are implemented. Costs, placement legality, upgrades, construction execution, deletion, and UI display behavior remain source-located future work. | Implemented for catalogue, disabled-unit checks, and preflight V1 only. |
| City | `src/core/execution/CityExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts`; `src/core/execution/nation/NationStructureBehavior.ts` | located | City behavior, city cost/config values, and nation structure behavior references are source-located. | Needs more review. |
| Port | `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationStructureBehavior.ts` | located | Port placement, trade ship spawning, port weighting, nearby factory interaction, and nation structure placement are source-located. | Needs more review. |
| Factory | `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetwork.ts`; `src/core/game/RailNetworkImpl.ts`; `src/core/game/Railroad.ts`; `src/core/game/TrainStation.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/TrainStationExecution.ts`; `src/core/execution/RecomputeRailClusterExecution.ts`; `src/core/configuration/Config.ts` | located | Factory behavior connects to rail, train, city, port, and factory systems; implementation should review both structure and rail code. | Needs more review. |
| SAM launcher | `src/core/execution/SAMLauncherExecution.ts`; `src/core/execution/SAMMissileExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts`; `src/client/render/gl/passes/SamRadiusPass.ts`; `src/client/render/gl/shaders/sam-radius/**` | located | SAM core behavior and display radius paths are source-located. Rendering paths should not be treated as authoritative simulation logic without review. | Needs more review. |
| Missile silo | `src/core/execution/MissileSiloExecution.ts`; `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationNukeBehavior.ts`; `src/core/execution/nation/NationMIRVBehavior.ts` | located | Silo behavior is tied to nuke construction, launch, cooldown, player build rules, and nation behavior. | Needs more review. |
| Nukes/MIRV | `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/client/render/gl/utils/NukeTrajectory.ts`; `src/client/render/frame/derive/NukeTelegraphs.ts`; `src/client/render/gl/passes/NukeTrajectoryPass.ts`; `src/client/render/gl/passes/NukeTelegraphPass.ts`; `src/client/render/gl/shaders/nuke-trajectory/**`; `src/client/render/gl/shaders/nuke-telegraph/**` | located | Simulation paths are in core execution. Client trajectory and telegraph utilities are display-oriented and need review before use. | Needs more review. |
| Warships | `src/core/execution/WarshipExecution.ts`; `src/core/execution/MoveWarshipExecution.ts`; `src/core/execution/ShellExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationWarshipBehavior.ts`; `src/client/controllers/WarshipSelectionController.ts` | located | Warship state, movement, targeting, shells, port interactions, nation behavior, and client selection references are source-located. | Needs more review. |
| Transport ships | `src/core/execution/TransportShipExecution.ts`; `src/core/execution/BoatRetreatExecution.ts`; `src/core/game/TransportShipUtils.ts`; `src/core/game/PlayerImpl.ts`; `src/core/pathfinding/**`; `src/core/execution/utils/AiAttackBehavior.ts` | located | Transport spawning, retreat, pathing, AI attack references, water movement, and attack flow require review. | Needs more review. |
| Trade ships/routes | `src/core/execution/TradeShipExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/nation/NationWarshipBehavior.ts` | located | Trade route eligibility, spawning, payout, port weighting, and warship-retaliation references are source-located. | Needs more review. |
| Alliances/diplomacy | `src/core/game/AllianceImpl.ts`; `src/core/game/AllianceRequestImpl.ts`; `src/core/game/GameImpl.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/alliance/**`; `src/core/execution/EmbargoExecution.ts`; `src/core/execution/EmbargoAllExecution.ts`; `src/core/configuration/Config.ts`; `src/client/hud/layers/ActionableEvents.ts`; `src/client/hud/layers/PlayerInfoOverlay.ts` | located | Alliance requests, rejections, breaking, extensions, relation state, embargoes, cooldowns, and display references are source-located. | Needs more review. |
| Modifiers/settings | `src/core/Schemas.ts`; `src/core/configuration/Config.ts`; `src/core/game/UserSettings.ts`; `src/client/hud/layers/SettingsModal.ts`; `src/client/render/gl/render-settings.json`; `src/client/render/gl/RenderSettings.ts` | partially implemented | Explicit disabled-unit membership checks are implemented for the build catalogue. Other game modifiers, water nukes, custom settings, user settings, and render settings are source-located but not implemented. | Implemented for disabledUnits checks only; other modifiers need more review. |
| Win condition | `src/core/execution/WinCheckExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/client/hud/layers/WinModal.ts` | located | Win checks, percentage-to-win config, winner state, winner updates, and win UI references are source-located. | Needs more review. |

## Implementation Gate

Before any source-mapped area is implemented, update `docs/openfront-mechanics-sources.md` with the exact source paths, checked commit, exactness level, and any licensing or fair-play notes. Unknown or complex mechanics should block implementation until researched.
