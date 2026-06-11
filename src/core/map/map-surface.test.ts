import { describe, expect, it } from "vitest";
import {
  MAP_SURFACE_NOT_PLACEMENT_NOTICE,
  MAP_SURFACE_SOURCES,
  OpenFrontMapSurfaceContext,
  OpenFrontMapSurfacePrimitiveContext,
  createOpenFrontMapSurfaceContext,
  doesOpenFrontTileHaveOwner,
  getOpenFrontTileOwnerID,
  getOpenFrontTileSurfaceSnapshot,
  isOpenFrontTileLand,
  isOpenFrontTileOcean,
  isOpenFrontTileOceanShore,
  isOpenFrontTileShore,
  isOpenFrontTileShoreline,
  isOpenFrontTileWater,
} from "./map-surface";
import { createOpenFrontTileGeometry } from "./tile-geometry";
import { TileRef } from "../scenario/types";

describe("OpenFront map surface primitives", () => {
  const surface = createFixtureSurfaceContext();

  it("records source-derived GameMap surface references", () => {
    expect(MAP_SURFACE_SOURCES.terrainPredicates.path).toBe(
      "src/core/game/GameMap.ts",
    );
    expect(MAP_SURFACE_SOURCES.terrainPredicates.symbolName).toContain(
      "GameMap.isWater",
    );
    expect(MAP_SURFACE_SOURCES.ownershipPredicates.confidence).toBe(
      "source-code verified",
    );
  });

  it("derives land and water predicates from the provided context", () => {
    expect(isOpenFrontTileLand(surface, 0)).toBe(true);
    expect(isOpenFrontTileWater(surface, 0)).toBe(false);
    expect(isOpenFrontTileLand(surface, 2)).toBe(false);
    expect(isOpenFrontTileWater(surface, 2)).toBe(true);
    expect(isOpenFrontTileLand(surface, 6)).toBe(false);
    expect(isOpenFrontTileWater(surface, 6)).toBe(true);
  });

  it("derives shore and shoreline predicates from the provided context", () => {
    expect(isOpenFrontTileShoreline(surface, 1)).toBe(true);
    expect(isOpenFrontTileShore(surface, 1)).toBe(true);
    expect(isOpenFrontTileShoreline(surface, 2)).toBe(false);
    expect(isOpenFrontTileShore(surface, 2)).toBe(false);
    expect(isOpenFrontTileShoreline(surface, 0)).toBe(false);
    expect(isOpenFrontTileShore(surface, 0)).toBe(false);
  });

  it("derives ocean and ocean shore predicates from the provided context", () => {
    expect(isOpenFrontTileOcean(surface, 2)).toBe(true);
    expect(isOpenFrontTileOcean(surface, 6)).toBe(false);
    expect(isOpenFrontTileOceanShore(surface, 1)).toBe(true);
    expect(isOpenFrontTileOceanShore(surface, 4)).toBe(false);
    expect(isOpenFrontTileOceanShore(surface, 2)).toBe(false);
  });

  it("derives ownerID and hasOwner behavior from the provided context", () => {
    expect(getOpenFrontTileOwnerID(surface, 0)).toBe(0);
    expect(doesOpenFrontTileHaveOwner(surface, 0)).toBe(false);
    expect(getOpenFrontTileOwnerID(surface, 4)).toBe(2);
    expect(doesOpenFrontTileHaveOwner(surface, 4)).toBe(true);
  });

  it("creates safe valid tile snapshots without implying placement legality", () => {
    const snapshot = getOpenFrontTileSurfaceSnapshot(surface, 1);

    expect(snapshot).toMatchObject({
      tile: 1,
      isValidRef: true,
      isLand: true,
      isWater: false,
      isShore: true,
      isOcean: false,
      isOceanShore: true,
      isShoreline: true,
      ownerID: 0,
      hasOwner: false,
      placementLegality: "not-evaluated",
      placementLegalityNotice: MAP_SURFACE_NOT_PLACEMENT_NOTICE,
    });
    expect(snapshot).not.toHaveProperty("canBuild");
    expect(snapshot).not.toHaveProperty("placementIsLegal");
  });

  it("returns null surface and ownership values for invalid refs", () => {
    const snapshot = getOpenFrontTileSurfaceSnapshot(surface, -1);

    expect(snapshot).toEqual({
      tile: -1,
      isValidRef: false,
      isLand: null,
      isWater: null,
      isShore: null,
      isOcean: null,
      isOceanShore: null,
      isShoreline: null,
      ownerID: null,
      hasOwner: null,
      placementLegality: "not-evaluated",
      placementLegalityNotice: MAP_SURFACE_NOT_PLACEMENT_NOTICE,
    });
    expect(getOpenFrontTileOwnerID(surface, -1)).toBeNull();
    expect(doesOpenFrontTileHaveOwner(surface, -1)).toBeNull();
  });

  it("does not read terrain or ownership callbacks for invalid refs", () => {
    const invalidOnly = createOpenFrontMapSurfaceContext({
      isValidRef: () => false,
      neighbors: throwIfRead,
      manhattanDist: throwIfReadDistance,
      euclideanDistSquared: throwIfReadDistance,
      isLand: throwIfReadBoolean,
      isOcean: throwIfReadBoolean,
      isShoreline: throwIfReadBoolean,
      ownerID: throwIfReadOwner,
    });

    expect(getOpenFrontTileSurfaceSnapshot(invalidOnly, 99)).toMatchObject({
      tile: 99,
      isValidRef: false,
      placementLegality: "not-evaluated",
    });
    expect(isOpenFrontTileLand(invalidOnly, 99)).toBeNull();
    expect(isOpenFrontTileWater(invalidOnly, 99)).toBeNull();
    expect(isOpenFrontTileShore(invalidOnly, 99)).toBeNull();
    expect(isOpenFrontTileOcean(invalidOnly, 99)).toBeNull();
    expect(isOpenFrontTileOceanShore(invalidOnly, 99)).toBeNull();
    expect(isOpenFrontTileShoreline(invalidOnly, 99)).toBeNull();
  });
});

function createFixtureSurfaceContext(): OpenFrontMapSurfaceContext {
  const geometry = createOpenFrontTileGeometry({ width: 3, height: 3 });
  const landTiles = new Set<TileRef>([0, 1, 3, 4, 5, 7]);
  const oceanTiles = new Set<TileRef>([2, 8]);
  const shorelineTiles = new Set<TileRef>([1, 4, 5, 7]);
  const ownerIds = new Map<TileRef, number>([
    [4, 2],
    [7, 3],
  ]);

  const context: OpenFrontMapSurfacePrimitiveContext = {
    isValidRef: (ref) => geometry.isValidRef(ref),
    neighbors: (ref) => geometry.neighbors(ref),
    manhattanDist: (a, b) => geometry.manhattanDist(a, b),
    euclideanDistSquared: (a, b) => geometry.euclideanDistSquared(a, b),
    isLand: (ref) => landTiles.has(ref),
    isOcean: (ref) => oceanTiles.has(ref),
    isShoreline: (ref) => shorelineTiles.has(ref),
    ownerID: (ref) => ownerIds.get(ref) ?? 0,
  };

  return createOpenFrontMapSurfaceContext(context);
}

function throwIfRead(): never {
  throw new Error("Invalid refs must not read fixture map data.");
}

function throwIfReadDistance(): never {
  throw new Error("Invalid refs must not read fixture map distances.");
}

function throwIfReadBoolean(): never {
  throw new Error("Invalid refs must not read fixture map predicates.");
}

function throwIfReadOwner(): never {
  throw new Error("Invalid refs must not read fixture owner data.");
}
