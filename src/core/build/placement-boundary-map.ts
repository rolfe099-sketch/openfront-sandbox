import { createOpenFrontSourceReference, SourceReference } from "../source/source-reference";

export const PLACEMENT_BOUNDARY_SOURCES = {
  gameMapSurfaceAndOwnership: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    symbolName: "GameMap surface and ownership predicates",
    lineStart: 194,
    lineEnd: 337,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Surface and ownership predicates are available for map-context inspection, but not as build placement legality.",
  }),
  playerSpawnDispatch: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.canSpawnUnitType",
    lineStart: 1224,
    lineEnd: 1262,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located unit-specific spawn dispatch. Future placement checks must implement each branch separately.",
  }),
  nukeSpawn: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.nukeSpawn",
    lineStart: 1264,
    lineEnd: 1307,
    confidence: "source-located",
    exactness: "not implemented",
    notes: "Source-located nuke and missile silo targeting flow.",
  }),
  portSpawn: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.portSpawn",
    lineStart: 1309,
    lineEnd: 1330,
    confidence: "source-located",
    exactness: "not implemented",
    notes: "Source-located port spawn radius, ownership, shore, and valid-tile flow.",
  }),
  warshipSpawn: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.warshipSpawn",
    lineStart: 1332,
    lineEnd: 1349,
    confidence: "source-located",
    exactness: "not implemented",
    notes: "Source-located water and port/water-component flow for warship spawning.",
  }),
  landAndStructureSpawn: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.landBasedUnitSpawn, PlayerImpl.landBasedStructureSpawn, PlayerImpl.validStructureSpawnTiles",
    lineStart: 1351,
    lineEnd: 1404,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located land unit and structure valid tile search flow. Structure distance and nearby-unit behavior remain future work.",
  }),
  tradeShipSpawn: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.tradeShipSpawn",
    lineStart: 1406,
    lineEnd: 1410,
    confidence: "source-located",
    exactness: "not implemented",
    notes: "Source-located trade ship targeting flow.",
  }),
  transportShipUtils: createOpenFrontSourceReference({
    path: "src/core/game/TransportShipUtils.ts",
    symbolName: "canBuildTransportShip, targetTransportTile, bestShoreDeploymentSource",
    lineStart: 1,
    lineEnd: 35,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located transport ship spatial behavior. SpatialQuery and attack rules remain future work.",
  }),
  constructionExecution: createOpenFrontSourceReference({
    path: "src/core/execution/ConstructionExecution.ts",
    symbolName: "ConstructionExecution.init, ConstructionExecution.tick",
    lineStart: 27,
    lineEnd: 78,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located construction guard and execution flow. Phase 1J does not execute construction.",
  }),
  configPlacementValues: createOpenFrontSourceReference({
    path: "src/core/configuration/Config.ts",
    symbolName: "Config.radiusPortSpawn, Config.structureMinDist, Config.boatMaxNumber, Config.unitInfo",
    lineStart: 274,
    lineEnd: 897,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located config values used by future placement, cost, and construction checks. Values are not copied into active logic.",
  }),
  canBuildUnitType: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.canBuildUnitType",
    lineStart: 1102,
    lineEnd: 1117,
    confidence: "source-located",
    exactness: "not implemented",
    notes:
      "Source-located disabled-unit, gold, and player-alive gate. Only disabled-unit behavior is active elsewhere.",
  }),
} as const;

export const OPENFRONT_PLACEMENT_BOUNDARY_CATEGORY_IDS = [
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
] as const;

export type OpenFrontPlacementBoundaryCategoryId =
  (typeof OPENFRONT_PLACEMENT_BOUNDARY_CATEGORY_IDS)[number];

export type OpenFrontPlacementBoundaryImplementationStatus = "future-only";

export interface OpenFrontPlacementBoundaryCategory {
  readonly id: OpenFrontPlacementBoundaryCategoryId;
  readonly label: string;
  readonly implementationStatus: OpenFrontPlacementBoundaryImplementationStatus;
  readonly active: false;
  readonly sourceReferences: readonly SourceReference[];
  readonly notes: string;
}

export const OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES = [
  {
    id: "terrain-surface-checks",
    label: "Terrain and surface checks",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.gameMapSurfaceAndOwnership,
      PLACEMENT_BOUNDARY_SOURCES.playerSpawnDispatch,
    ],
    notes:
      "Future checks may use land, water, shore, ocean, and shoreline predicates. Phase 1J does not decide whether a build can be placed.",
  },
  {
    id: "ownership-checks",
    label: "Ownership checks",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.gameMapSurfaceAndOwnership,
      PLACEMENT_BOUNDARY_SOURCES.playerSpawnDispatch,
      PLACEMENT_BOUNDARY_SOURCES.landAndStructureSpawn,
    ],
    notes:
      "Future checks may use owner ids and ownership comparisons. Phase 1J does not implement ownership-based build legality.",
  },
  {
    id: "shoreline-coast-water-checks",
    label: "Shoreline, coast, and water checks",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.gameMapSurfaceAndOwnership,
      PLACEMENT_BOUNDARY_SOURCES.portSpawn,
      PLACEMENT_BOUNDARY_SOURCES.warshipSpawn,
    ],
    notes:
      "Future checks may distinguish shore, water, and water components. Phase 1J does not implement port or warship placement.",
  },
  {
    id: "port-spawn-radius",
    label: "Port spawn radius behavior",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.portSpawn,
      PLACEMENT_BOUNDARY_SOURCES.configPlacementValues,
    ],
    notes:
      "Future checks must derive radius and search behavior from source. Phase 1J does not copy or activate radiusPortSpawn behavior.",
  },
  {
    id: "valid-structure-tile-search",
    label: "Valid structure tile search",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.landAndStructureSpawn,
      PLACEMENT_BOUNDARY_SOURCES.configPlacementValues,
    ],
    notes:
      "Future structure placement must derive the search, ownership, nearby-unit, and sorting behavior from source.",
  },
  {
    id: "transport-ship-spatial-behavior",
    label: "Transport ship spatial behavior",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.transportShipUtils,
      PLACEMENT_BOUNDARY_SOURCES.configPlacementValues,
    ],
    notes:
      "Future transport checks must review SpatialQuery, attack eligibility, owner checks, and boat limit behavior.",
  },
  {
    id: "trade-ship-targeting",
    label: "Trade ship targeting",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [PLACEMENT_BOUNDARY_SOURCES.tradeShipSpawn],
    notes:
      "Future trade ship targeting must remain separate from normal player build menu behavior.",
  },
  {
    id: "nuke-silo-targeting",
    label: "Nuke and silo targeting",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.nukeSpawn,
      PLACEMENT_BOUNDARY_SOURCES.playerSpawnDispatch,
    ],
    notes:
      "Future nuke checks must review spawn immunity, teammate rules, game-over behavior, and active silo selection.",
  },
  {
    id: "structure-distance-rules",
    label: "Structure distance rules",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.landAndStructureSpawn,
      PLACEMENT_BOUNDARY_SOURCES.configPlacementValues,
    ],
    notes:
      "Future checks must derive structure distance behavior from source instead of using arbitrary spacing values.",
  },
  {
    id: "costs-gold-player-state",
    label: "Costs, gold, and player state",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [
      PLACEMENT_BOUNDARY_SOURCES.canBuildUnitType,
      PLACEMENT_BOUNDARY_SOURCES.configPlacementValues,
    ],
    notes:
      "Future checks must derive costs, gold requirements, and alive-state gates from source. Phase 1J does not implement them.",
  },
  {
    id: "construction-execution",
    label: "Construction execution",
    implementationStatus: "future-only",
    active: false,
    sourceReferences: [PLACEMENT_BOUNDARY_SOURCES.constructionExecution],
    notes:
      "Future construction behavior must be implemented separately from preflight and surface inspection.",
  },
] as const satisfies readonly OpenFrontPlacementBoundaryCategory[];

export function getOpenFrontPlacementBoundaryCategories(): readonly OpenFrontPlacementBoundaryCategory[] {
  return OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES;
}

export function getOpenFrontPlacementBoundaryCategory(
  id: OpenFrontPlacementBoundaryCategoryId,
): OpenFrontPlacementBoundaryCategory {
  const category = OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES.find(
    (entry) => entry.id === id,
  );

  if (category === undefined) {
    throw new Error(`Unknown OpenFront placement boundary category: ${id}`);
  }

  return category;
}

export function areOpenFrontPlacementBoundaryCategoriesFutureOnly(
  categories: readonly OpenFrontPlacementBoundaryCategory[] = OPENFRONT_PLACEMENT_BOUNDARY_CATEGORIES,
): boolean {
  return categories.every(
    (category) =>
      category.implementationStatus === "future-only" &&
      category.active === false,
  );
}
