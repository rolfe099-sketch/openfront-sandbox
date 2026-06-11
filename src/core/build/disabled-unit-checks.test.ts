import { describe, expect, it } from "vitest";
import {
  OPENFRONT_BUILD_MENU_UNIT_TYPES,
  OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES,
  OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES,
  isBuildMenuUnit,
} from "./build-action-catalogue";
import {
  DISABLED_UNIT_CHECK_SOURCES,
  filterEnabledBuildMenuUnitTypes,
  filterEnabledPlayerBuildableUnitTypes,
  getBuildCatalogueUnitDisabledState,
  isOpenFrontUnitDisabled,
} from "./disabled-unit-checks";
import { OPENFRONT_UNIT_TYPES } from "../scenario/types";

describe("OpenFront disabled unit checks", () => {
  it("records symbol-level source references", () => {
    expect(DISABLED_UNIT_CHECK_SOURCES.configIsUnitDisabled.symbolName).toBe(
      "Config.isUnitDisabled",
    );
    expect(DISABLED_UNIT_CHECK_SOURCES.gameConfigSchema.symbolName).toContain(
      "disabledUnits",
    );
    expect(DISABLED_UNIT_CHECK_SOURCES.publicGameModifiers.notes).toContain(
      "no flag-to-unit disabling mapping",
    );
  });

  it("treats undefined config as disabling nothing", () => {
    for (const unitType of OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES) {
      expect(isOpenFrontUnitDisabled(unitType)).toBe(false);
    }
  });

  it("treats empty disabledUnits as disabling nothing", () => {
    const config = { disabledUnits: [] };

    for (const unitType of OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES) {
      expect(isOpenFrontUnitDisabled(unitType, config)).toBe(false);
    }
  });

  it("marks a listed unit type as disabled", () => {
    const config = { disabledUnits: [OPENFRONT_UNIT_TYPES.Port] };

    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.Port, config)).toBe(true);
    expect(getBuildCatalogueUnitDisabledState(OPENFRONT_UNIT_TYPES.Port, config))
      .toEqual({
        entry: {
          unitType: OPENFRONT_UNIT_TYPES.Port,
          actionKind: "structure-construction",
          isNormalBuildMenuUnit: true,
          isPlayerBuildable: true,
          buildMenuOrder: 4,
        },
        isDisabled: true,
      });
  });

  it("keeps non-listed unit types enabled", () => {
    const config = { disabledUnits: [OPENFRONT_UNIT_TYPES.Port] };

    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.City, config)).toBe(false);
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.Warship, config)).toBe(
      false,
    );
  });

  it("supports multiple disabled units", () => {
    const config = {
      disabledUnits: [
        OPENFRONT_UNIT_TYPES.AtomBomb,
        OPENFRONT_UNIT_TYPES.MIRV,
        OPENFRONT_UNIT_TYPES.SAMLauncher,
      ],
    };

    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.AtomBomb, config)).toBe(
      true,
    );
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.MIRV, config)).toBe(true);
    expect(
      isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.SAMLauncher, config),
    ).toBe(true);
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.HydrogenBomb, config))
      .toBe(false);
  });

  it("filters disabled normal build menu entries", () => {
    const enabled = filterEnabledBuildMenuUnitTypes({
      disabledUnits: [
        OPENFRONT_UNIT_TYPES.Port,
        OPENFRONT_UNIT_TYPES.AtomBomb,
      ],
    });

    expect(enabled).toEqual(
      OPENFRONT_BUILD_MENU_UNIT_TYPES.filter(
        (unitType) =>
          unitType !== OPENFRONT_UNIT_TYPES.Port &&
          unitType !== OPENFRONT_UNIT_TYPES.AtomBomb,
      ),
    );
  });

  it("filters disabled player-buildable entries", () => {
    const enabled = filterEnabledPlayerBuildableUnitTypes({
      disabledUnits: [
        OPENFRONT_UNIT_TYPES.TransportShip,
        OPENFRONT_UNIT_TYPES.Factory,
      ],
    });

    expect(enabled).toEqual(
      OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES.filter(
        (unitType) =>
          unitType !== OPENFRONT_UNIT_TYPES.TransportShip &&
          unitType !== OPENFRONT_UNIT_TYPES.Factory,
      ),
    );
  });

  it("keeps source-present internal units outside normal build menu behavior", () => {
    const enabled = filterEnabledBuildMenuUnitTypes({
      disabledUnits: [...OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES],
    });

    expect(enabled).toEqual(OPENFRONT_BUILD_MENU_UNIT_TYPES);

    for (const unitType of OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES) {
      expect(isBuildMenuUnit(unitType)).toBe(false);
      expect(enabled).not.toContain(unitType);
    }
  });

  it("does not treat public modifier flags as disabled-unit mappings", () => {
    const config = {
      publicGameModifiers: {
        isPortsDisabled: true,
        isNukesDisabled: true,
        isSAMsDisabled: true,
      },
    };

    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.Port, config)).toBe(
      false,
    );
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.AtomBomb, config)).toBe(
      false,
    );
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.HydrogenBomb, config))
      .toBe(false);
    expect(isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.MIRV, config)).toBe(false);
    expect(
      isOpenFrontUnitDisabled(OPENFRONT_UNIT_TYPES.SAMLauncher, config),
    ).toBe(false);
  });
});
