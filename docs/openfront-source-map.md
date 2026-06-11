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

## Source Areas

| Area | Likely source path/file | Status | Notes | Safe to implement now? |
| --- | --- | --- | --- | --- |
| Deterministic core simulation | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/core/game/GameUpdateUtils.ts`; `src/core/execution/ExecutionManager.ts`; `src/core/execution/**` | located | Core domain interfaces, tick execution, execution dispatch, updates, player/unit mutation, and win state are source-located. | Needs more review. |
| Game state | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameView.ts`; `src/core/game/UnitImpl.ts`; `src/core/game/UnitGrid.ts`; `src/core/game/Stats.ts`; `src/core/game/StatsImpl.ts`; `src/core/game/WaterManager.ts` | located | Game, unit, map ownership, stats, water, and public view state are source-located. | Needs more review. |
| Maps/map loading | `resources/maps/**`; `src/core/game/GameMap.ts`; `src/core/game/GameMapLoader.ts`; `src/core/game/BinaryLoaderGameMapLoader.ts`; `src/core/game/FetchGameMapLoader.ts`; `src/core/game/TerrainMapLoader.ts`; `src/core/game/TerrainSearchMap.ts`; `src/core/pathfinding/**` | located | Map directories contain `manifest.json`, `map.bin`, `map4x.bin`, `map16x.bin`, and `thumbnail.webp` patterns. Map files are open-asset candidates and need per-file asset review before reuse. | Needs more review. |
| Player/nation state | `src/core/game/PlayerImpl.ts`; `src/core/game/Game.ts`; `src/core/game/NationCreation.ts`; `src/core/execution/NationExecution.ts`; `src/core/execution/TribeExecution.ts`; `src/core/execution/TribeSpawner.ts`; `src/core/execution/nation/**` | located | Player resource state, relations, nation spawning, nation behavior, and tribe behavior are source-located but complex. | Needs more review. |
| Troops/population | `src/core/game/PlayerImpl.ts`; `src/core/configuration/Config.ts`; `src/core/execution/AttackExecution.ts`; `src/core/execution/PlayerExecution.ts`; `src/core/execution/DonateTroopExecution.ts`; `src/core/game/Game.ts` | located | Troop growth, caps, donations, attacks, tile ownership, and player state need focused source tracing. | Needs more review. |
| Gold/economy | `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/DonateGoldExecution.ts`; `src/core/execution/TradeShipExecution.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetworkImpl.ts` | located | Gold income, costs, donations, trade ships, trains, rail connections, ports, and factories are source-located. Do not copy values until reviewed. | Needs more review. |
| Buildings | `src/core/game/Game.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts`; `src/core/execution/UpgradeStructureExecution.ts`; `src/core/execution/DeleteUnitExecution.ts`; `src/client/hud/layers/BuildMenu.ts`; `src/client/hud/layers/UnitDisplay.ts` | located | Buildable structure groups, construction flow, upgrades, deletion, and UI display references are source-located. Core logic remains separate from display code. | Needs more review. |
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
| Modifiers/settings | `src/core/Schemas.ts`; `src/core/configuration/Config.ts`; `src/core/game/UserSettings.ts`; `src/client/hud/layers/SettingsModal.ts`; `src/client/render/gl/render-settings.json`; `src/client/render/gl/RenderSettings.ts` | located | Game configuration schemas, disabled units, water nukes, custom settings, user settings, and render settings are source-located. | Needs more review. |
| Win condition | `src/core/execution/WinCheckExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/GameImpl.ts`; `src/core/game/GameUpdates.ts`; `src/client/hud/layers/WinModal.ts` | located | Win checks, percentage-to-win config, winner state, winner updates, and win UI references are source-located. | Needs more review. |

## Implementation Gate

Before any source-mapped area is implemented, update `docs/openfront-mechanics-sources.md` with the exact source paths, checked commit, exactness level, and any licensing or fair-play notes. Unknown or complex mechanics should block implementation until researched.
