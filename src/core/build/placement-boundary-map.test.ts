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

  it("marks every placement boundary category as future-only", () => {
    expect(
      areOpenFrontPlacementBoundaryCategoriesFutureOnly(
        OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES,
      ),
    ).toBe(true);

    for (const category of OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES) {
      expect(category.active).toBe(false);
      expect(category.implementationStatus).toBe("future-only");
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
    ]);
    expect(result.status).toBe("blocked");
    expect(result.activeReasons).toEqual(["invalid-target-ref"]);
    expect(result.futureReasons).toEqual(BUILD_AVAILABILITY_FUTURE_REASON_ORDER);
  });
});
