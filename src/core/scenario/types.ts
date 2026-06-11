import {
  SourceReference,
  createOpenFrontSourceReference,
} from "../source/source-reference";

// Source: OpenFront `src/core/game/Game.ts`
// Confidence: source-located; source-aligned model only, no mechanics.
export type PlayerID = string;
export type Tick = number;
export type Gold = bigint;

// Source: OpenFront `src/core/game/GameMap.ts`
// Confidence: source-located; source-aligned model only, no map behavior.
export type TileRef = number;

export interface MapPos {
  readonly x: number;
  readonly y: number;
}

export const SOURCE_ALIGNED_MODEL_SOURCES = {
  coreAliases: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    lineStart: 25,
    lineEnd: 27,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "PlayerID, Tick, and Gold aliases.",
  }),
  mapPosition: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    lineStart: 53,
    lineEnd: 56,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "MapPos shape.",
  }),
  tileRef: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 3,
    lineEnd: 3,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "TileRef alias.",
  }),
  unitTypeVocabulary: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    lineStart: 357,
    lineEnd: 374,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "UnitType names only; no unit behavior, costs, ranges, or formulas.",
  }),
  playerAndUnitInterfaces: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    lineStart: 622,
    lineEnd: 767,
    confidence: "source-located",
    exactness: "source-aligned model",
    notes: "Player and Unit interface vocabulary for snapshots.",
  }),
  constructionFlow: createOpenFrontSourceReference({
    path: "src/core/execution/ConstructionExecution.ts",
    lineStart: 1,
    lineEnd: 158,
    confidence: "source-located",
    exactness: "not implemented",
    notes: "Inspected for future build flow research; no construction mechanics implemented.",
  }),
} as const;

export const OPENFRONT_UNIT_TYPES = {
  TransportShip: "Transport",
  Warship: "Warship",
  Shell: "Shell",
  SAMMissile: "SAMMissile",
  Port: "Port",
  AtomBomb: "Atom Bomb",
  HydrogenBomb: "Hydrogen Bomb",
  TradeShip: "Trade Ship",
  MissileSilo: "Missile Silo",
  DefensePost: "Defense Post",
  SAMLauncher: "SAM Launcher",
  City: "City",
  MIRV: "MIRV",
  MIRVWarhead: "MIRV Warhead",
  Train: "Train",
  Factory: "Factory",
} as const;

export type OpenFrontUnitType =
  (typeof OPENFRONT_UNIT_TYPES)[keyof typeof OPENFRONT_UNIT_TYPES];

const OPENFRONT_UNIT_TYPE_VALUES = Object.values(OPENFRONT_UNIT_TYPES);

export interface OpenFrontMapModel {
  readonly width: number;
  readonly height: number;
  readonly numLandTiles?: number;
}

export interface OpenFrontPlayerModel {
  readonly id: PlayerID;
  readonly displayName?: string;
}

export interface OpenFrontUnitModel {
  readonly id: number;
  readonly type: OpenFrontUnitType;
  readonly ownerId: PlayerID;
  readonly tile: TileRef;
  readonly isActive?: boolean;
}

export interface OpenFrontScenarioModel {
  readonly id: string;
  readonly map: OpenFrontMapModel;
  readonly players: readonly OpenFrontPlayerModel[];
  readonly units: readonly OpenFrontUnitModel[];
  readonly tick?: Tick;
  readonly sourceReferences: readonly SourceReference[];
}

export interface OpenFrontScenarioModelInput {
  readonly id: string;
  readonly map: OpenFrontMapModel;
  readonly players: readonly OpenFrontPlayerModel[];
  readonly units?: readonly OpenFrontUnitModel[];
  readonly tick?: Tick;
  readonly sourceReferences?: readonly SourceReference[];
}

export function isOpenFrontUnitType(
  value: unknown,
): value is OpenFrontUnitType {
  return (
    typeof value === "string" &&
    (OPENFRONT_UNIT_TYPE_VALUES as readonly string[]).includes(value)
  );
}

export function isTileRefValue(value: unknown): value is TileRef {
  return Number.isInteger(value) && Number(value) >= 0;
}

export function isMapPos(value: unknown): value is MapPos {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<MapPos>;
  return Number.isInteger(candidate.x) && Number.isInteger(candidate.y);
}

export function createOpenFrontScenarioModel(
  input: OpenFrontScenarioModelInput,
): OpenFrontScenarioModel {
  if (input.id.trim().length === 0) {
    throw new Error("OpenFront scenario models require a non-empty id.");
  }

  assertValidMapModel(input.map);

  const playerIds = new Set<PlayerID>();
  for (const player of input.players) {
    if (player.id.trim().length === 0) {
      throw new Error("OpenFront player models require non-empty ids.");
    }
    if (playerIds.has(player.id)) {
      throw new Error(`Duplicate OpenFront player id: ${player.id}`);
    }
    playerIds.add(player.id);
  }

  const units = input.units ?? [];
  const unitIds = new Set<number>();
  for (const unit of units) {
    assertValidUnitModel(unit, playerIds);
    if (unitIds.has(unit.id)) {
      throw new Error(`Duplicate OpenFront unit id: ${unit.id}`);
    }
    unitIds.add(unit.id);
  }

  if (input.tick !== undefined && !Number.isInteger(input.tick)) {
    throw new Error("OpenFront scenario tick must be an integer.");
  }

  return {
    id: input.id,
    map: input.map,
    players: input.players,
    units,
    tick: input.tick,
    sourceReferences: [
      ...Object.values(SOURCE_ALIGNED_MODEL_SOURCES),
      ...(input.sourceReferences ?? []),
    ],
  };
}

function assertValidMapModel(map: OpenFrontMapModel): void {
  if (!Number.isInteger(map.width) || map.width <= 0) {
    throw new Error("OpenFront map width must be a positive integer.");
  }

  if (!Number.isInteger(map.height) || map.height <= 0) {
    throw new Error("OpenFront map height must be a positive integer.");
  }

  if (
    map.numLandTiles !== undefined &&
    (!Number.isInteger(map.numLandTiles) || map.numLandTiles < 0)
  ) {
    throw new Error("OpenFront numLandTiles must be a non-negative integer.");
  }
}

function assertValidUnitModel(
  unit: OpenFrontUnitModel,
  playerIds: ReadonlySet<PlayerID>,
): void {
  if (!Number.isInteger(unit.id) || unit.id < 0) {
    throw new Error("OpenFront unit id must be a non-negative integer.");
  }

  if (!isOpenFrontUnitType(unit.type)) {
    throw new Error(`Unknown OpenFront unit type: ${String(unit.type)}`);
  }

  if (!playerIds.has(unit.ownerId)) {
    throw new Error(`OpenFront unit owner is not in scenario players: ${unit.ownerId}`);
  }

  if (!isTileRefValue(unit.tile)) {
    throw new Error("OpenFront unit tile must be a non-negative integer TileRef.");
  }
}
