import { describe, expect, it } from "vitest";
import {
  BUILD_AVAILABILITY_ACTIVE_REASON_ORDER,
  BUILD_AVAILABILITY_FUTURE_REASON_ORDER,
  BUILD_AVAILABILITY_PREFLIGHT_SOURCES,
  getBuildAvailabilityPreflightReasonSummaries,
  getBuildAvailabilityPreflightSummary,
  hasBuildAvailabilityPreflightPassed,
  preflightBuildAvailability,
} from "./build-availability-preflight";
import type { BuildAvailabilityMapSurfaceContext } from "./build-availability-preflight";
import { createOpenFrontTileGeometry } from "../map/tile-geometry";
import { OPENFRONT_UNIT_TYPES } from "../scenario/types";

const TEST_TILE_GEOMETRY = createOpenFrontTileGeometry({
  width: 4,
  height: 3,
});

describe("OpenFront build availability preflight", () => {
  const tileGeometry = TEST_TILE_GEOMETRY;

  it("records source references for preflight boundaries", () => {
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.tileRefValidity.symbolName,
    ).toBe("GameMap.isValidRef");
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.warshipTargetWater.symbolName,
    ).toBe("PlayerImpl.warshipSpawn");
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.mirvTargetOwner.symbolName,
    ).toBe("PlayerImpl.canSpawnUnitType");
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.playerBuildableCatalogue.symbolName,
    ).toContain("PlayerBuildable");
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.canBuildUnitType.symbolName,
    ).toBe("PlayerImpl.canBuildUnitType");
    expect(
      BUILD_AVAILABILITY_PREFLIGHT_SOURCES.buildUnitIntentSchema.symbolName,
    ).toBe("BuildUnitIntentSchema");
  });

  it("documents stable active and future reason ordering", () => {
    expect(BUILD_AVAILABILITY_ACTIVE_REASON_ORDER).toEqual([
      "not-player-buildable-catalogue-entry",
      "disabled-unit",
      "invalid-target-ref",
      "warship-target-not-water",
      "mirv-target-has-no-owner",
    ]);
    expect(BUILD_AVAILABILITY_FUTURE_REASON_ORDER).toEqual([
      "insufficient-gold",
      "player-not-alive",
      "spawn-phase-blocked",
      "no-valid-spawn-tile",
      "upgrade-state-blocked",
      "construction-execution-blocked",
    ]);
  });

  it("returns cautious availability for a player-buildable unit with no active block", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.City,
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
    expect(result.futureReasons).toEqual(BUILD_AVAILABILITY_FUTURE_REASON_ORDER);
    expect(result.catalogueEntry.isPlayerBuildable).toBe(true);
    expect(hasBuildAvailabilityPreflightPassed(result)).toBe(true);
  });

  it("blocks disabled player-buildable units", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Port,
      disabledUnitsConfig: {
        disabledUnits: [OPENFRONT_UNIT_TYPES.Port],
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["disabled-unit"]);
  });

  it("blocks source-present units outside the player-buildable catalogue", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Shell,
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual([
      "not-player-buildable-catalogue-entry",
    ]);
    expect(result.catalogueEntry.isPlayerBuildable).toBe(false);
  });

  it("keeps active reasons in stable order when more than one applies", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Shell,
      targetTile: -1,
      tileGeometry,
      disabledUnitsConfig: {
        disabledUnits: [OPENFRONT_UNIT_TYPES.Shell],
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual([
      "not-player-buildable-catalogue-entry",
      "disabled-unit",
      "invalid-target-ref",
    ]);
  });

  it("does not treat public modifier flags as active disabled-unit mappings", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Port,
      disabledUnitsConfig: {
        publicGameModifiers: {
          isPortsDisabled: true,
          isNukesDisabled: true,
          isSAMsDisabled: true,
        },
      },
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("accepts valid target refs when tile geometry is provided", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: 11,
      tileGeometry,
    });

    expect(result.targetTile).toBe(11);
    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("blocks negative target refs when tile geometry is provided", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: -1,
      tileGeometry,
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
    expect(hasBuildAvailabilityPreflightPassed(result)).toBe(false);
  });

  it("blocks out-of-bounds target refs when tile geometry is provided", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: 12,
      tileGeometry,
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
  });

  it("uses source-derived ref bounds without extra integer coercion", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: 1.5,
      tileGeometry,
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("blocks Warship targets that are not water when map surface context is provided", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: 0,
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [1],
        ownerTiles: [],
      }),
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["warship-target-not-water"]);
  });

  it("allows Warship targets through current checks when the target is water", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: 1,
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [1],
        ownerTiles: [],
      }),
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("does not run the Warship water blocker without map surface context", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: 0,
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("does not read Warship water state when the target ref is invalid", () => {
    let isWaterReads = 0;
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: -1,
      mapSurfaceContext: {
        isValidRef: () => false,
        isWater: () => {
          isWaterReads++;
          return false;
        },
        hasOwner: () => true,
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
    expect(isWaterReads).toBe(0);
  });

  it("blocks MIRV targets that have no owner when map surface context is provided", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.MIRV,
      targetTile: 0,
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [],
        ownerTiles: [1],
      }),
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["mirv-target-has-no-owner"]);
  });

  it("allows MIRV targets through current checks when the target has an owner", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.MIRV,
      targetTile: 1,
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [],
        ownerTiles: [1],
      }),
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("does not run the MIRV owner blocker without map surface context", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.MIRV,
      targetTile: 0,
    });

    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("does not read MIRV ownership state when the target ref is invalid", () => {
    let hasOwnerReads = 0;
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.MIRV,
      targetTile: -1,
      mapSurfaceContext: {
        isValidRef: () => false,
        isWater: () => true,
        hasOwner: () => {
          hasOwnerReads++;
          return false;
        },
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
    expect(hasOwnerReads).toBe(0);
  });

  it("keeps new placement blockers after existing active reasons", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: 0,
      disabledUnitsConfig: {
        disabledUnits: [OPENFRONT_UNIT_TYPES.Warship],
      },
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [],
        ownerTiles: [],
      }),
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual([
      "disabled-unit",
      "warship-target-not-water",
    ]);
  });

  it("does not validate when targetTile is missing", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      tileGeometry,
    });

    expect(result.targetTile).toBeUndefined();
    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("preserves targetTile without validating when tile geometry is missing", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: -1,
    });

    expect(result.targetTile).toBe(-1);
    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
  });

  it("summarizes preflight pass and block status cautiously", () => {
    const passed = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.City,
      targetTile: 0,
      tileGeometry,
    });
    const blocked = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.City,
      targetTile: -1,
      tileGeometry,
    });

    expect(getBuildAvailabilityPreflightSummary(passed)).toBe(
      "Build availability preflight passed for currently implemented source-derived boundary checks. This is not full OpenFront build legality.",
    );
    expect(getBuildAvailabilityPreflightSummary(blocked)).toBe(
      "Build availability preflight blocked by 1 active source-derived reason. This is not full OpenFront build legality.",
    );
  });

  it("summarizes active reasons without implying placement legality", () => {
    const passed = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.City,
    });
    const blocked = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Port,
      targetTile: -1,
      tileGeometry,
      disabledUnitsConfig: {
        disabledUnits: [OPENFRONT_UNIT_TYPES.Port],
      },
    });

    expect(getBuildAvailabilityPreflightReasonSummaries(passed)).toEqual([
      "No active preflight boundary reasons were found by currently implemented checks. This is not full OpenFront build legality.",
    ]);
    expect(getBuildAvailabilityPreflightReasonSummaries(blocked)).toEqual([
      "The unit is listed in the explicit source-derived disabledUnits configuration. This is not full OpenFront build legality.",
      "The target tile ref is outside the source-derived GameMap ref bounds. This is not full OpenFront build legality.",
    ]);
  });

  it("summarizes source-derived placement blockers cautiously", () => {
    const blocked = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
      targetTile: 0,
      mapSurfaceContext: createBuildAvailabilityMapSurfaceContext({
        waterTiles: [],
        ownerTiles: [],
      }),
    });

    expect(getBuildAvailabilityPreflightReasonSummaries(blocked)).toEqual([
      "The Warship target tile is not water under the provided source-derived map surface context. This is not full OpenFront build legality.",
    ]);
  });

  it("keeps future reasons as metadata only", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Warship,
    });

    expect(result.futureReasons).toEqual(BUILD_AVAILABILITY_FUTURE_REASON_ORDER);
    expect(result).not.toHaveProperty("cost");
    expect(result).not.toHaveProperty("canBuild");
    expect(result).not.toHaveProperty("placement");
    expect(result).not.toHaveProperty("constructionDuration");
    expect(result).not.toHaveProperty("terrain");
    expect(result).not.toHaveProperty("ownership");
    expect(result).not.toHaveProperty("spawnValidity");
    expect(result).not.toHaveProperty("gold");
  });
});

function createBuildAvailabilityMapSurfaceContext(input: {
  readonly waterTiles: readonly number[];
  readonly ownerTiles: readonly number[];
}): BuildAvailabilityMapSurfaceContext {
  const waterTiles = new Set(input.waterTiles);
  const ownerTiles = new Set(input.ownerTiles);

  return {
    isValidRef: (tile) => TEST_TILE_GEOMETRY.isValidRef(tile),
    isWater: (tile) => waterTiles.has(tile),
    hasOwner: (tile) => ownerTiles.has(tile),
  };
}
