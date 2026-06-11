import {
  OPENFRONT_BUILD_MENU_UNIT_TYPES,
  OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES,
  BuildCatalogueEntry,
  getBuildCatalogueEntry,
} from "./build-action-catalogue";
import { OpenFrontUnitType } from "../scenario/types";
import { createOpenFrontSourceReference } from "../source/source-reference";

export const DISABLED_UNIT_CHECK_SOURCES = {
  configIsUnitDisabled: createOpenFrontSourceReference({
    path: "src/core/configuration/Config.ts",
    symbolName: "Config.isUnitDisabled",
    lineStart: 166,
    lineEnd: 168,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Authoritative runtime check for disabled units: disabledUnits?.includes(unitType) ?? false.",
  }),
  gameConfigSchema: createOpenFrontSourceReference({
    path: "src/core/Schemas.ts",
    symbolName: "GameConfigSchema.publicGameModifiers, GameConfigSchema.disabledUnits",
    lineStart: 251,
    lineEnd: 285,
    confidence: "source-code verified",
    exactness: "source-aligned model",
    notes:
      "Schema confirms public modifier flags and disabledUnits are separate fields.",
  }),
  publicGameModifiers: createOpenFrontSourceReference({
    path: "src/core/game/Game.ts",
    symbolName: "PublicGameModifiers",
    lineStart: 325,
    lineEnd: 338,
    confidence: "source-code verified",
    exactness: "source-aligned model",
    notes:
      "Public modifier flag names are modeled for boundary tests only; no flag-to-unit disabling mapping is implemented.",
  }),
  constructionExecutionGuard: createOpenFrontSourceReference({
    path: "src/core/execution/ConstructionExecution.ts",
    symbolName: "ConstructionExecution.init",
    lineStart: 27,
    lineEnd: 36,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "Construction execution stops when Config.isUnitDisabled returns true.",
  }),
  playerBuildUnitGuard: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.buildUnit",
    lineStart: 1046,
    lineEnd: 1057,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Player unit construction throws when the unit type is disabled.",
  }),
  playerCanBuildUnitGuard: createOpenFrontSourceReference({
    path: "src/core/game/PlayerImpl.ts",
    symbolName: "PlayerImpl.canBuildUnitType",
    lineStart: 1102,
    lineEnd: 1108,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Player build availability returns false when the unit type is disabled.",
  }),
} as const;

export interface OpenFrontPublicGameModifiers {
  readonly isCompact?: boolean;
  readonly isRandomSpawn?: boolean;
  readonly isCrowded?: boolean;
  readonly isHardNations?: boolean;
  readonly startingGold?: number;
  readonly goldMultiplier?: number;
  readonly isAlliancesDisabled?: boolean;
  readonly isPortsDisabled?: boolean;
  readonly isNukesDisabled?: boolean;
  readonly isSAMsDisabled?: boolean;
  readonly isPeaceTime?: boolean;
  readonly isWaterNukes?: boolean;
}

export interface OpenFrontDisabledUnitsConfig {
  readonly disabledUnits?: readonly OpenFrontUnitType[];
  readonly publicGameModifiers?: OpenFrontPublicGameModifiers;
}

export interface BuildCatalogueUnitDisabledState {
  readonly entry: BuildCatalogueEntry;
  readonly isDisabled: boolean;
}

export function isOpenFrontUnitDisabled(
  unitType: OpenFrontUnitType,
  config?: OpenFrontDisabledUnitsConfig,
): boolean {
  return config?.disabledUnits?.includes(unitType) ?? false;
}

export function getBuildCatalogueUnitDisabledState(
  unitType: OpenFrontUnitType,
  config?: OpenFrontDisabledUnitsConfig,
): BuildCatalogueUnitDisabledState {
  return {
    entry: getBuildCatalogueEntry(unitType),
    isDisabled: isOpenFrontUnitDisabled(unitType, config),
  };
}

export function filterEnabledBuildMenuUnitTypes(
  config?: OpenFrontDisabledUnitsConfig,
): readonly OpenFrontUnitType[] {
  return OPENFRONT_BUILD_MENU_UNIT_TYPES.filter(
    (unitType) => !isOpenFrontUnitDisabled(unitType, config),
  );
}

export function filterEnabledPlayerBuildableUnitTypes(
  config?: OpenFrontDisabledUnitsConfig,
): readonly OpenFrontUnitType[] {
  return OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES.filter(
    (unitType) => !isOpenFrontUnitDisabled(unitType, config),
  );
}
