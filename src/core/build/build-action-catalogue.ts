import {
  OPENFRONT_UNIT_TYPES,
  OpenFrontUnitType,
} from "../scenario/types";
import { createOpenFrontSourceReference } from "../source/source-reference";

export const BUILD_ACTION_CATALOGUE_SOURCES = {
  unitInfoAndGroups: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "UnitInfo, UnitType, Nukes, BuildableAttacks, Structures, BuildMenus, PlayerBuildable",
    lineStart: 340,
    lineEnd: 415,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Build/action catalogue vocabulary and group membership only.",
  }),
  unitParamsMap: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "UnitParamsMap",
    lineStart: 425,
    lineEnd: 478,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Source-present unit parameter vocabulary only; no execution behavior implemented.",
  }),
  buildableUnit: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "BuildableUnit",
    lineStart: 1009,
    lineEnd: 1017,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Buildable result shape inspected for catalogue boundaries only.",
  }),
  constructionExecution: createOpenFrontSourceReference({
    path: "src/core/execution/ConstructionExecution.ts",
    symbolName: "ConstructionExecution",
    lineStart: 13,
    lineEnd: 167,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Source structure/non-structure construction split and dispatch vocabulary only; construction execution is not implemented.",
  }),
  playerBuildableBranching: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.buildableUnits, PlayerImpl.canBuild, PlayerImpl.canSpawnUnitType",
    lineStart: 1180,
    lineEnd: 1261,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Buildable/spawn branch vocabulary only; placement legality is not implemented.",
  }),
  buildMenuDisplayOrder: createOpenFrontSourceReference({
    path: "src/client/hud/layers/BuildMenu.ts",
    symbolName: "buildTable",
    lineStart: 41,
    lineEnd: 124,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Build menu display order only; icons, assets, styles, and UI behavior are not used.",
  }),
  intentDispatch: createOpenFrontSourceReference({
    path: "src/core/execution/ExecutionManager.ts",
    symbolName: "ExecutionManager.intentToExecution",
    lineStart: 98,
    lineEnd: 112,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Action dispatch names only; no execution behavior implemented.",
  }),
} as const;

export const OPENFRONT_NUKE_UNIT_TYPES = [
  OPENFRONT_UNIT_TYPES.AtomBomb,
  OPENFRONT_UNIT_TYPES.HydrogenBomb,
  OPENFRONT_UNIT_TYPES.MIRVWarhead,
  OPENFRONT_UNIT_TYPES.MIRV,
] as const satisfies readonly OpenFrontUnitType[];

export const OPENFRONT_STRUCTURE_UNIT_TYPES = [
  OPENFRONT_UNIT_TYPES.City,
  OPENFRONT_UNIT_TYPES.DefensePost,
  OPENFRONT_UNIT_TYPES.SAMLauncher,
  OPENFRONT_UNIT_TYPES.MissileSilo,
  OPENFRONT_UNIT_TYPES.Port,
  OPENFRONT_UNIT_TYPES.Factory,
] as const satisfies readonly OpenFrontUnitType[];

// OpenFront source names this group BuildableAttacks. It includes Warship.
export const OPENFRONT_BUILDABLE_ATTACK_UNIT_TYPES = [
  OPENFRONT_UNIT_TYPES.AtomBomb,
  OPENFRONT_UNIT_TYPES.HydrogenBomb,
  OPENFRONT_UNIT_TYPES.MIRV,
  OPENFRONT_UNIT_TYPES.Warship,
] as const satisfies readonly OpenFrontUnitType[];

export const OPENFRONT_BUILD_MENU_UNIT_TYPES = [
  ...OPENFRONT_STRUCTURE_UNIT_TYPES,
  ...OPENFRONT_BUILDABLE_ATTACK_UNIT_TYPES,
] as const satisfies readonly OpenFrontUnitType[];

export const OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES = [
  ...OPENFRONT_BUILD_MENU_UNIT_TYPES,
  OPENFRONT_UNIT_TYPES.TransportShip,
] as const satisfies readonly OpenFrontUnitType[];

export const OPENFRONT_BUILD_MENU_DISPLAY_ORDER = [
  OPENFRONT_UNIT_TYPES.AtomBomb,
  OPENFRONT_UNIT_TYPES.MIRV,
  OPENFRONT_UNIT_TYPES.HydrogenBomb,
  OPENFRONT_UNIT_TYPES.Warship,
  OPENFRONT_UNIT_TYPES.Port,
  OPENFRONT_UNIT_TYPES.MissileSilo,
  OPENFRONT_UNIT_TYPES.SAMLauncher,
  OPENFRONT_UNIT_TYPES.DefensePost,
  OPENFRONT_UNIT_TYPES.City,
  OPENFRONT_UNIT_TYPES.Factory,
] as const satisfies readonly OpenFrontUnitType[];

export const OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES = [
  OPENFRONT_UNIT_TYPES.Shell,
  OPENFRONT_UNIT_TYPES.SAMMissile,
  OPENFRONT_UNIT_TYPES.TradeShip,
  OPENFRONT_UNIT_TYPES.Train,
  OPENFRONT_UNIT_TYPES.MIRVWarhead,
] as const satisfies readonly OpenFrontUnitType[];

export type BuildActionKind =
  | "structure-construction"
  | "non-structure-construction"
  | "transport-buildable"
  | "source-present-internal";

export interface BuildCatalogueEntry {
  readonly unitType: OpenFrontUnitType;
  readonly actionKind: BuildActionKind;
  readonly isNormalBuildMenuUnit: boolean;
  readonly isPlayerBuildable: boolean;
  readonly buildMenuOrder: number | null;
}

export function isNuke(type: OpenFrontUnitType): boolean {
  return includesUnitType(OPENFRONT_NUKE_UNIT_TYPES, type);
}

export function isStructure(type: OpenFrontUnitType): boolean {
  return includesUnitType(OPENFRONT_STRUCTURE_UNIT_TYPES, type);
}

export function isBuildableAttack(type: OpenFrontUnitType): boolean {
  return includesUnitType(OPENFRONT_BUILDABLE_ATTACK_UNIT_TYPES, type);
}

export function isBuildMenuUnit(type: OpenFrontUnitType): boolean {
  return includesUnitType(OPENFRONT_BUILD_MENU_UNIT_TYPES, type);
}

export function isPlayerBuildable(type: OpenFrontUnitType): boolean {
  return includesUnitType(OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES, type);
}

export function getBuildMenuOrder(type: OpenFrontUnitType): number | null {
  const order = (
    OPENFRONT_BUILD_MENU_DISPLAY_ORDER as readonly OpenFrontUnitType[]
  ).indexOf(type);
  return order === -1 ? null : order;
}

export function getBuildActionKind(type: OpenFrontUnitType): BuildActionKind {
  if (isStructure(type)) {
    return "structure-construction";
  }

  if (isBuildableAttack(type)) {
    return "non-structure-construction";
  }

  if (type === OPENFRONT_UNIT_TYPES.TransportShip) {
    return "transport-buildable";
  }

  return "source-present-internal";
}

export function getBuildCatalogueEntry(
  type: OpenFrontUnitType,
): BuildCatalogueEntry {
  return {
    unitType: type,
    actionKind: getBuildActionKind(type),
    isNormalBuildMenuUnit: isBuildMenuUnit(type),
    isPlayerBuildable: isPlayerBuildable(type),
    buildMenuOrder: getBuildMenuOrder(type),
  };
}

function includesUnitType(
  types: readonly OpenFrontUnitType[],
  type: OpenFrontUnitType,
): boolean {
  return types.includes(type);
}
