import { describe, expect, it } from "vitest";
import {
  BUILD_AVAILABILITY_ACTIVE_REASON_ORDER,
  BUILD_AVAILABILITY_FUTURE_REASON_ORDER,
  BUILD_AVAILABILITY_PREFLIGHT_SOURCES,
  preflightBuildAvailability,
} from "./build-availability-preflight";
import { OPENFRONT_UNIT_TYPES } from "../scenario/types";

describe("OpenFront build availability preflight", () => {
  it("records source references for preflight boundaries", () => {
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
    ]);
    expect(BUILD_AVAILABILITY_FUTURE_REASON_ORDER).toEqual([
      "invalid-target-ref",
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
      disabledUnitsConfig: {
        disabledUnits: [OPENFRONT_UNIT_TYPES.Shell],
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual([
      "not-player-buildable-catalogue-entry",
      "disabled-unit",
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

  it("preserves targetTile without validating it", () => {
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.Factory,
      targetTile: -1,
    });

    expect(result.targetTile).toBe(-1);
    expect(result.status).toBe("available-for-future-checks");
    expect(result.activeReasons).toEqual([]);
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
  });
});
