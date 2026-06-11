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
- Local path: `.external/openfront`
- Checked commit: `af2849a2d71a7700a72c077a9e5616e990e584f6`
- Upstream commit date: `2026-06-10T20:00:53-07:00`
- Last checked: 2026-06-11

## Source Areas

| Area | Likely source path/file | Status | Notes | Safe to implement now? |
| --- | --- | --- | --- | --- |
| Maps | `resources/maps/**`; `src/core/game/GameMap.ts`; `src/core/game/GameMapLoader.ts`; `src/core/game/BinaryLoaderGameMapLoader.ts`; `src/core/game/FetchGameMapLoader.ts`; `src/core/game/TerrainMapLoader.ts` | located | Map files are assets/resources and need licensing review before reuse. Geometry and terrain behavior require source review before modeling. | Needs more review. |
| Deterministic core simulation | `src/core/game/Game.ts`; `src/core/game/GameImpl.ts`; `src/core/execution/**`; `src/core/game/GameUpdates.ts` | located | Core tick execution, unit updates, win state, and public game interfaces are source-located. | Needs more review. |
| Player/nation state | `src/core/game/PlayerImpl.ts`; `src/core/game/Game.ts`; `src/core/execution/nation/**`; `src/core/execution/NationCreation.ts` | located | Player resource state, relations, nation behaviors, and build decisions are source-located but complex. | Needs more review. |
| Troops/population | `src/core/game/PlayerImpl.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | located | Troop storage, growth, caps, attacks, and player state need focused source tracing. | Needs more review. |
| Gold/economy | `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/TradeShipExecution.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/execution/FactoryExecution.ts` | located | Gold income, trade ships, trains, structures, and costs are source-located. Do not copy values until reviewed. | Needs more review. |
| Buildings | `src/core/game/Game.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/ConstructionExecution.ts` | located | Buildable structures and unit groups are source-located. Construction and placement require separate review. | Needs more review. |
| City | `src/core/execution/CityExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | located | City behavior is source-located, including nearby structure interactions. | Needs more review. |
| Port | `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | located | Port placement, trade ship spawning, and nearby factory interactions are source-located. | Needs more review. |
| Factory | `src/core/execution/FactoryExecution.ts`; `src/core/game/RailNetworkImpl.ts`; `src/core/execution/TrainExecution.ts`; `src/core/execution/TrainStationExecution.ts`; `src/core/configuration/Config.ts` | located | Factory behavior connects to rail and train systems; implementation should review both structure and rail code. | Needs more review. |
| SAM launcher | `src/core/execution/SAMLauncherExecution.ts`; `src/core/execution/SAMMissileExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/Game.ts` | located | SAM behavior, missile behavior, range, cooldown, and construction are source-located. | Needs more review. |
| Missile silo | `src/core/execution/MissileSiloExecution.ts`; `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | located | Silo behavior is tied to nuke construction, launch, cooldown, and player build rules. | Needs more review. |
| Nukes/MIRV | `src/core/execution/NukeExecution.ts`; `src/core/execution/MIRVExecution.ts`; `src/core/configuration/Config.ts`; `src/client/render/gl/utils/NukeTrajectory.ts` | located | Simulation paths are in core execution. Client trajectory utilities are display-oriented and should not be treated as authoritative mechanics without review. | Needs more review. |
| Warships | `src/core/execution/WarshipExecution.ts`; `src/core/execution/MoveWarshipExecution.ts`; `src/core/execution/ShellExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | located | Warship state, movement, targeting, shells, port interactions, and cost behavior are source-located. | Needs more review. |
| Transport ships | `src/core/execution/TransportShipExecution.ts`; `src/core/execution/BoatRetreatExecution.ts`; `src/core/game/TransportShipUtils.ts`; `src/core/game/PlayerImpl.ts`; `src/core/pathfinding/**` | located | Transport spawning, retreat, water pathing, and attack flow need focused review. | Needs more review. |
| Trade ships/routes | `src/core/execution/TradeShipExecution.ts`; `src/core/execution/PortExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/PlayerImpl.ts` | located | Trade ship spawning, trading eligibility, route behavior, and payout are source-located. | Needs more review. |
| Alliances/diplomacy | `src/core/game/AllianceImpl.ts`; `src/core/game/AllianceRequestImpl.ts`; `src/core/game/GameImpl.ts`; `src/core/game/PlayerImpl.ts`; `src/core/execution/alliance/**`; `src/core/configuration/Config.ts` | located | Alliance requests, rejection, breaking, extensions, relation state, and cooldowns are source-located. | Needs more review. |
| Modifiers/settings | `src/core/Schemas.ts`; `src/core/configuration/Config.ts`; `src/core/game/UserSettings.ts` | located | Game configuration schemas, disabled units, and settings are source-located. | Needs more review. |
| Win condition | `src/core/execution/WinCheckExecution.ts`; `src/core/configuration/Config.ts`; `src/core/game/GameImpl.ts` | located | Win checks and winner state are source-located. | Needs more review. |

## Implementation Gate

Before any source-mapped area is implemented, update `docs/openfront-mechanics-sources.md` with the exact source paths, checked commit, exactness level, and any licensing or fair-play notes. Unknown or complex mechanics should block implementation until researched.
