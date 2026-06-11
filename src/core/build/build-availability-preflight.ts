import {
  BuildCatalogueEntry,
  getBuildCatalogueEntry,
  isPlayerBuildable,
} from "./build-action-catalogue";
import {
  OpenFrontDisabledUnitsConfig,
  isOpenFrontUnitDisabled,
} from "./disabled-unit-checks";
import type { OpenFrontMapSurfaceContext } from "../map/map-surface";
import type { OpenFrontTileGeometry } from "../map/tile-geometry";
import {
  OPENFRONT_UNIT_TYPES,
  OpenFrontUnitType,
  TileRef,
} from "../scenario/types";
import { createOpenFrontSourceReference } from "../source/source-reference";

export const BUILD_AVAILABILITY_PREFLIGHT_SOURCES = {
  tileRefValidity: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    symbolName: "GameMap.isValidRef",
    lineStart: 156,
    lineEnd: 158,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Source-derived tile ref bounds check used only when a target tile and geometry context are provided.",
  }),
  warshipTargetWater: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.warshipSpawn",
    lineStart: 1332,
    lineEnd: 1336,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "First source guard for Warship spawn: non-water target tiles are rejected.",
  }),
  mirvTargetOwner: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.canSpawnUnitType",
    lineStart: 1224,
    lineEnd: 1232,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Source MIRV branch rejects target tiles without an owner before delegating to nukeSpawn.",
  }),
  playerBuildableCatalogue: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "PlayerBuildable, PlayerBuildableUnitType",
    lineStart: 410,
    lineEnd: 415,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Source-derived player-buildable unit vocabulary.",
  }),
  buildableUnitResult: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "BuildableUnit",
    lineStart: 1009,
    lineEnd: 1017,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes:
      "Future full build availability result shape. Costs, rails, and canBuild tiles are not implemented.",
  }),
  playerBuildabilityFlow: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.buildableUnits, PlayerImpl.canBuild, PlayerImpl.canSpawnUnitType",
    lineStart: 1156,
    lineEnd: 1262,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes:
      "Source-located build availability flow. Phase 1H does not implement costs, spawn phase, placement, upgrades, or spawn helpers.",
  }),
  canBuildUnitType: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.canBuildUnitType",
    lineStart: 1102,
    lineEnd: 1117,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Disabled-unit guard is active; gold and player-alive checks are source-located future work.",
  }),
  constructionExecution: createOpenFrontSourceReference({
    path: "src/core/execution/ConstructionExecution.ts",
    symbolName: "ConstructionExecution.init, ConstructionExecution.tick",
    lineStart: 27,
    lineEnd: 78,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes:
      "Source-located construction guards and execution flow. Phase 1I validates target ref bounds only; construction execution remains unimplemented.",
  }),
  executionDispatch: createOpenFrontSourceReference({
    path: "src/core/execution/ExecutionManager.ts",
    symbolName: "ExecutionManager.intentToExecution",
    lineStart: 98,
    lineEnd: 104,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "Source-located build_unit intent dispatch only.",
  }),
  gameRunnerBuildability: createOpenFrontSourceReference({
    path: "src/core/GameRunner.ts",
    symbolName: "GameRunner.playerBuildables, GameRunner.playerActions",
    lineStart: 206,
    lineEnd: 229,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "Source-located buildability query entrypoints only.",
  }),
  workerBuildabilityMessages: createOpenFrontSourceReference({
    path: "src/core/worker/WorkerMessages.ts",
    symbolName: "PlayerActionsMessage, PlayerBuildablesMessage",
    lineStart: 72,
    lineEnd: 95,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "Source-located worker message shapes for buildability queries only.",
  }),
  buildUnitIntentSchema: createOpenFrontSourceReference({
    path: "src/core/Schemas.ts",
    symbolName: "BuildUnitIntentSchema",
    lineStart: 422,
    lineEnd: 427,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "Source-located build_unit intent input shape only.",
  }),
} as const;

export const BUILD_AVAILABILITY_ACTIVE_REASON_ORDER = [
  "not-player-buildable-catalogue-entry",
  "disabled-unit",
  "invalid-target-ref",
  "warship-target-not-water",
  "mirv-target-has-no-owner",
] as const;

export const BUILD_AVAILABILITY_FUTURE_REASON_ORDER = [
  "insufficient-gold",
  "player-not-alive",
  "spawn-phase-blocked",
  "no-valid-spawn-tile",
  "upgrade-state-blocked",
  "construction-execution-blocked",
] as const;

export type BuildAvailabilityActiveReason =
  (typeof BUILD_AVAILABILITY_ACTIVE_REASON_ORDER)[number];

export type BuildAvailabilityFutureReason =
  (typeof BUILD_AVAILABILITY_FUTURE_REASON_ORDER)[number];

export type BuildAvailabilityPreflightStatus =
  | "available-for-future-checks"
  | "blocked";

export type BuildAvailabilityTileGeometry = Pick<
  OpenFrontTileGeometry,
  "isValidRef"
>;
export type BuildAvailabilityMapSurfaceContext = Pick<
  OpenFrontMapSurfaceContext,
  "isValidRef" | "isWater" | "hasOwner"
>;

export interface BuildAvailabilityPreflightInput {
  readonly unitType: OpenFrontUnitType;
  readonly targetTile?: TileRef;
  readonly tileGeometry?: BuildAvailabilityTileGeometry;
  readonly mapSurfaceContext?: BuildAvailabilityMapSurfaceContext;
  readonly disabledUnitsConfig?: OpenFrontDisabledUnitsConfig;
}

export interface BuildAvailabilityPreflightResult {
  readonly unitType: OpenFrontUnitType;
  readonly targetTile?: TileRef;
  readonly catalogueEntry: BuildCatalogueEntry;
  readonly status: BuildAvailabilityPreflightStatus;
  readonly activeReasons: readonly BuildAvailabilityActiveReason[];
  readonly futureReasons: readonly BuildAvailabilityFutureReason[];
}

const NOT_FULL_BUILD_LEGALITY_NOTICE =
  "This is not full OpenFront build legality.";

const ACTIVE_REASON_SUMMARIES: Record<BuildAvailabilityActiveReason, string> = {
  "not-player-buildable-catalogue-entry":
    "The unit is not in OpenFront's source-derived player-buildable catalogue.",
  "disabled-unit":
    "The unit is listed in the explicit source-derived disabledUnits configuration.",
  "invalid-target-ref":
    "The target tile ref is outside the source-derived GameMap ref bounds.",
  "warship-target-not-water":
    "The Warship target tile is not water under the provided source-derived map surface context.",
  "mirv-target-has-no-owner":
    "The MIRV target tile has no owner under the provided source-derived map surface context.",
};

export function preflightBuildAvailability(
  input: BuildAvailabilityPreflightInput,
): BuildAvailabilityPreflightResult {
  const activeReasons: BuildAvailabilityActiveReason[] = [];

  for (const reason of BUILD_AVAILABILITY_ACTIVE_REASON_ORDER) {
    if (hasActiveBuildAvailabilityReason(reason, input)) {
      activeReasons.push(reason);
    }
  }

  return {
    unitType: input.unitType,
    targetTile: input.targetTile,
    catalogueEntry: getBuildCatalogueEntry(input.unitType),
    status:
      activeReasons.length === 0 ? "available-for-future-checks" : "blocked",
    activeReasons,
    futureReasons: BUILD_AVAILABILITY_FUTURE_REASON_ORDER,
  };
}

function hasActiveBuildAvailabilityReason(
  reason: BuildAvailabilityActiveReason,
  input: BuildAvailabilityPreflightInput,
): boolean {
  switch (reason) {
    case "not-player-buildable-catalogue-entry":
      return !isPlayerBuildable(input.unitType);
    case "disabled-unit":
      return isOpenFrontUnitDisabled(input.unitType, input.disabledUnitsConfig);
    case "invalid-target-ref":
      return hasInvalidTargetRef(input);
    case "warship-target-not-water":
      if (input.unitType !== OPENFRONT_UNIT_TYPES.Warship) {
        return false;
      }
      if (!hasValidMapSurfaceTarget(input)) {
        return false;
      }
      return !input.mapSurfaceContext.isWater(input.targetTile);
    case "mirv-target-has-no-owner":
      if (input.unitType !== OPENFRONT_UNIT_TYPES.MIRV) {
        return false;
      }
      if (!hasValidMapSurfaceTarget(input)) {
        return false;
      }
      return !input.mapSurfaceContext.hasOwner(input.targetTile);
  }
}

function hasInvalidTargetRef(input: BuildAvailabilityPreflightInput): boolean {
  if (input.targetTile === undefined) {
    return false;
  }

  const validityContext = input.tileGeometry ?? input.mapSurfaceContext;
  return validityContext !== undefined && !validityContext.isValidRef(input.targetTile);
}

function hasValidMapSurfaceTarget(
  input: BuildAvailabilityPreflightInput,
): input is BuildAvailabilityPreflightInput & {
  readonly targetTile: TileRef;
  readonly mapSurfaceContext: BuildAvailabilityMapSurfaceContext;
} {
  return (
    input.targetTile !== undefined &&
    input.mapSurfaceContext !== undefined &&
    input.mapSurfaceContext.isValidRef(input.targetTile)
  );
}

export function hasBuildAvailabilityPreflightPassed(
  result: BuildAvailabilityPreflightResult,
): boolean {
  return result.status === "available-for-future-checks";
}

export function getBuildAvailabilityPreflightSummary(
  result: BuildAvailabilityPreflightResult,
): string {
  if (hasBuildAvailabilityPreflightPassed(result)) {
    return `Build availability preflight passed for currently implemented source-derived boundary checks. ${NOT_FULL_BUILD_LEGALITY_NOTICE}`;
  }

  const reasonLabel =
    result.activeReasons.length === 1 ? "reason" : "reasons";

  return `Build availability preflight blocked by ${result.activeReasons.length} active source-derived ${reasonLabel}. ${NOT_FULL_BUILD_LEGALITY_NOTICE}`;
}

export function getBuildAvailabilityPreflightReasonSummaries(
  result: BuildAvailabilityPreflightResult,
): readonly string[] {
  if (result.activeReasons.length === 0) {
    return [
      `No active preflight boundary reasons were found by currently implemented checks. ${NOT_FULL_BUILD_LEGALITY_NOTICE}`,
    ];
  }

  return result.activeReasons.map(
    (reason) => `${ACTIVE_REASON_SUMMARIES[reason]} ${NOT_FULL_BUILD_LEGALITY_NOTICE}`,
  );
}
