import { TileRef } from "../scenario/types";
import { createOpenFrontSourceReference } from "../source/source-reference";

export const MAP_SURFACE_NOT_PLACEMENT_NOTICE =
  "Map surface snapshots describe the provided map context only and do not evaluate OpenFront build placement legality.";

export const MAP_SURFACE_SOURCES = {
  geometryContext: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    symbolName: "GameMap.isValidRef, GameMap.neighbors, GameMap.manhattanDist, GameMap.euclideanDistSquared",
    lineStart: 156,
    lineEnd: 364,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Map surface helpers reuse source-derived ref validity, neighbor, and distance context without implementing placement legality.",
  }),
  terrainPredicates: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    symbolName: "GameMap.isLand, GameMap.isWater, GameMap.isShore, GameMap.isOcean, GameMap.isOceanShore, GameMap.isShoreline",
    lineStart: 194,
    lineEnd: 337,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Source-derived tile surface predicates for valid refs only. Invalid refs are handled by OpenFront Sandbox safety wrappers.",
  }),
  ownershipPredicates: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    symbolName: "GameMap.ownerID, GameMap.hasOwner",
    lineStart: 245,
    lineEnd: 252,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Source-derived ownership predicates for valid refs only. Owner id 0 means no owner.",
  }),
} as const;

export interface OpenFrontMapSurfacePrimitiveContext {
  readonly isValidRef: (ref: TileRef) => boolean;
  readonly neighbors: (ref: TileRef) => readonly TileRef[];
  readonly manhattanDist: (a: TileRef, b: TileRef) => number;
  readonly euclideanDistSquared: (a: TileRef, b: TileRef) => number;
  readonly isLand: (ref: TileRef) => boolean;
  readonly isOcean: (ref: TileRef) => boolean;
  readonly isShoreline: (ref: TileRef) => boolean;
  readonly ownerID: (ref: TileRef) => number;
}

export interface OpenFrontMapSurfaceContext
  extends OpenFrontMapSurfacePrimitiveContext {
  readonly isWater: (ref: TileRef) => boolean;
  readonly isShore: (ref: TileRef) => boolean;
  readonly isOceanShore: (ref: TileRef) => boolean;
  readonly hasOwner: (ref: TileRef) => boolean;
}

export interface OpenFrontValidTileSurfaceSnapshot {
  readonly tile: TileRef;
  readonly isValidRef: true;
  readonly isLand: boolean;
  readonly isWater: boolean;
  readonly isShore: boolean;
  readonly isOcean: boolean;
  readonly isOceanShore: boolean;
  readonly isShoreline: boolean;
  readonly ownerID: number;
  readonly hasOwner: boolean;
  readonly placementLegality: "not-evaluated";
  readonly placementLegalityNotice: typeof MAP_SURFACE_NOT_PLACEMENT_NOTICE;
}

export interface OpenFrontInvalidTileSurfaceSnapshot {
  readonly tile: TileRef;
  readonly isValidRef: false;
  readonly isLand: null;
  readonly isWater: null;
  readonly isShore: null;
  readonly isOcean: null;
  readonly isOceanShore: null;
  readonly isShoreline: null;
  readonly ownerID: null;
  readonly hasOwner: null;
  readonly placementLegality: "not-evaluated";
  readonly placementLegalityNotice: typeof MAP_SURFACE_NOT_PLACEMENT_NOTICE;
}

export type OpenFrontTileSurfaceSnapshot =
  | OpenFrontValidTileSurfaceSnapshot
  | OpenFrontInvalidTileSurfaceSnapshot;

export type OpenFrontSafeSurfaceBoolean = boolean | null;
export type OpenFrontSafeOwnerID = number | null;

export function createOpenFrontMapSurfaceContext(
  context: OpenFrontMapSurfacePrimitiveContext,
): OpenFrontMapSurfaceContext {
  return {
    ...context,
    isWater: (ref) => !context.isLand(ref),
    isShore: (ref) => context.isLand(ref) && context.isShoreline(ref),
    isOceanShore: (ref) =>
      context.isLand(ref) &&
      context.neighbors(ref).some((neighbor) => context.isOcean(neighbor)),
    hasOwner: (ref) => context.ownerID(ref) !== 0,
  };
}

export function getOpenFrontTileSurfaceSnapshot(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontTileSurfaceSnapshot {
  if (!context.isValidRef(tile)) {
    return {
      tile,
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
    };
  }

  return {
    tile,
    isValidRef: true,
    isLand: context.isLand(tile),
    isWater: context.isWater(tile),
    isShore: context.isShore(tile),
    isOcean: context.isOcean(tile),
    isOceanShore: context.isOceanShore(tile),
    isShoreline: context.isShoreline(tile),
    ownerID: context.ownerID(tile),
    hasOwner: context.hasOwner(tile),
    placementLegality: "not-evaluated",
    placementLegalityNotice: MAP_SURFACE_NOT_PLACEMENT_NOTICE,
  };
}

export function isOpenFrontTileLand(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) => context.isLand(ref));
}

export function isOpenFrontTileWater(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) => context.isWater(ref));
}

export function isOpenFrontTileShore(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) => context.isShore(ref));
}

export function isOpenFrontTileOcean(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) => context.isOcean(ref));
}

export function isOpenFrontTileOceanShore(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) =>
    context.isOceanShore(ref),
  );
}

export function isOpenFrontTileShoreline(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) =>
    context.isShoreline(ref),
  );
}

export function getOpenFrontTileOwnerID(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeOwnerID {
  return context.isValidRef(tile) ? context.ownerID(tile) : null;
}

export function doesOpenFrontTileHaveOwner(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
): OpenFrontSafeSurfaceBoolean {
  return readSafeSurfaceBoolean(context, tile, (ref) => context.hasOwner(ref));
}

function readSafeSurfaceBoolean(
  context: OpenFrontMapSurfaceContext,
  tile: TileRef,
  read: (ref: TileRef) => boolean,
): OpenFrontSafeSurfaceBoolean {
  return context.isValidRef(tile) ? read(tile) : null;
}
