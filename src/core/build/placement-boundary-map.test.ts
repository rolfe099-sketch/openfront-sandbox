import { describe, expect, it } from "vitest";
import {
  BUILD_AVAILABILITY_ACTIVE_REASON_ORDER,
  BUILD_AVAILABILITY_FUTURE_REASON_ORDER,
  preflightBuildAvailability,
} from "./build-availability-preflight";
import {
  OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES,
  OPENFRONT_PLACEMENT_BOUNDARY_CATEGORY_IDS,
  PLACEMENT_BOUNDARY_SOURCES,
  areOpenFrontPlacementBoundaryCategoriesFutureOnly,
  getOpenFrontPlacementBoundaryCategories,
  getOpenFrontPlacementBoundaryCategory,
} from "./placement-boundary-map";
import { createOpenFrontTileGeometry } from "../map/tile-geometry";
import { OPENFRONT_UNIT_TYPES } from "../scenario/types";

describe("OpenFront placement boundary map", () => {
  it("records source references for future placement boundaries", () => {
    expect(
      PLACEMENT_BOUNDARY_SOURCES.gameMapSurfaceAndOwnership.path,
    ).toBe("src/core/game/GameMap.ts");
    expect(
      PLACEMENT_BOUNDARY_SOURCES.playerSpawnDispatch.symbolName,
    ).toBe("PlayerImpl.canSpawnUnitType");
    expect(PLACEMENT_BOUNDARY_SOURCES.transportShipUtils.path).toBe(
      "src/core/game/TransportShipUtils.ts",
    );
  });

  it("keeps placement boundary category ids stable", () => {
    expect(OPENFRONT_PLACEMENT_BOUNDARY_CATEGORY_IDS).toEqual([
      "terrain-surface-checks",
      "ownership-checks",
      "shoreline-coast-water-checks",
      "port-spawn-radius",
      "valid-structure-tile-search",
      "transport-ship-spatial-behavior",
      "trade-ship-targeting",
      "nuke-silo-targeting",
      "structure-distance-rules",
      "costs-gold-player-state",
      "construction-execution",
    ]);
    expect(getOpenFrontPlacementBoundaryCategories().map((entry) => entry.id))
      .toEqual(OPENFRONT_PLACEMENT_BOUNDARY_CATEGORY_IDS);
  });

  it("marks only the approved Phase 1K placement boundaries as partially active", () => {
    const activeCategories = OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES.filter(
      (category) => category.active,
    );

    expect(activeCategories.map((category) => category.id)).toEqual([
      "ownership-checks",
      "shoreline-coast-water-checks",
    ]);
    expect(activeCategories.map((category) => category.activeReasons)).toEqual([
      ["mirv-target-has-no-owner"],
      ["warship-target-not-water"],
    ]);
    expect(
      activeCategories.every(
        (category) => category.implementationStatus === "partially-active",
      ),
    ).toBe(true);
  });

  it("keeps all other placement boundary categories future-only", () => {
    const futureOnlyCategories = OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES.filter(
      (category) => !category.active,
    );

    expect(
      areOpenFrontPlacementBoundaryCategoriesFutureOnly(
        futureOnlyCategories,
      ),
    ).toBe(true);

    for (const category of futureOnlyCategories) {
      expect(category.active).toBe(false);
      expect(category.implementationStatus).toBe("future-only");
      expect(category.activeReasons).toEqual([]);
      expect(category.sourceReferences.length).toBeGreaterThan(0);
    }
  });

  it("does not imply active build placement legality", () => {
    const category = getOpenFrontPlacementBoundaryCategory(
      "terrain-surface-checks",
    );

    expect(category.notes).toContain("does not decide");
    expect(category).not.toHaveProperty("canBuild");
    expect(category).not.toHaveProperty("placementIsLegal");
    expect(category).not.toHaveProperty("implemented");
  });

  it("does not treat partially active categories as full placement legality", () => {
    const category = getOpenFrontPlacementBoundaryCategory(
      "shoreline-coast-water-checks",
    );

    expect(category.active).toBe(true);
    expect(category.implementationStatus).toBe("partially-active");
    expect(category.notes).toContain("only the Warship target-water guard");
    expect(category.notes).toContain("remain future work");
    expect(category).not.toHaveProperty("canBuild");
    expect(category).not.toHaveProperty("placementIsLegal");
  });

  it("leaves existing build availability preflight behavior unchanged", () => {
    const tileGeometry = createOpenFrontTileGeometry({ width: 2, height: 2 });
    const result = preflightBuildAvailability({
      unitType: OPENFRONT_UNIT_TYPES.City,
      targetTile: 4,
      tileGeometry,
    });

    expect(BUILD_AVAILABILITY_ACTIVE_REASON_ORDER).toEqual([
      "not-player-buildable-catalogue-entry",
      "disabled-unit",
      "invalid-target-ref",
      "warship-target-not-water",
      "mirv-target-has-no-owner",
    ]);
    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
    expect(result.futureReasons).toEqual(BUILD_AVAILABILITY_FUTURE_REASON_ORDER);
  });
});
