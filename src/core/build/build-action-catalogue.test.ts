import { describe, expect, it } from "vitest";
import { OPENFRONT_UNIT_TYPES } from "../scenario/types";
import {
  BUILD_ACTION_CATALOGUE_SOURCES,
  OPENFRONT_BUILDABLE_ATTACK_UNIT_TYPES,
  OPENFRONT_BUILD_MENU_DISPLAY_ORDER,
  OPENFRONT_BUILD_MENU_UNIT_TYPES,
  OPENFRONT_NUKE_UNIT_TYPES,
  OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES,
  OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES,
  OPENFRONT_STRUCTURE_UNIT_TYPES,
  getBuildActionKind,
  getBuildCatalogueEntry,
  getBuildMenuOrder,
  isBuildMenuUnit,
  isBuildableAttack,
  isNuke,
  isPlayerBuildable,
  isStructure,
} from "./build-action-catalogue";

describe("OpenFront build action catalogue", () => {
  it("records symbol-level source references", () => {
    expect(BUILD_ACTION_CATALOGUE_SOURCES.unitInfoAndGroups.symbolName).toContain(
      "BuildableAttacks",
    );
    expect(BUILD_ACTION_CATALOGUE_SOURCES.buildMenuDisplayOrder.symbolName).toBe(
      "buildTable",
    );
    expect(BUILD_ACTION_CATALOGUE_SOURCES.constructionExecution.symbolName).toBe(
      "ConstructionExecution",
    );
  });

  it("matches OpenFront Structures group membership", () => {
    expect(OPENFRONT_STRUCTURE_UNIT_TYPES).toEqual([
      OPENFRONT_UNIT_TYPES.City,
      OPENFRONT_UNIT_TYPES.DefensePost,
      OPENFRONT_UNIT_TYPES.SAMLauncher,
      OPENFRONT_UNIT_TYPES.MissileSilo,
      OPENFRONT_UNIT_TYPES.Port,
      OPENFRONT_UNIT_TYPES.Factory,
    ]);

    expect(isStructure(OPENFRONT_UNIT_TYPES.City)).toBe(true);
    expect(isStructure(OPENFRONT_UNIT_TYPES.Warship)).toBe(false);
  });

  it("matches OpenFront BuildableAttacks group membership", () => {
    expect(OPENFRONT_BUILDABLE_ATTACK_UNIT_TYPES).toEqual([
      OPENFRONT_UNIT_TYPES.AtomBomb,
      OPENFRONT_UNIT_TYPES.HydrogenBomb,
      OPENFRONT_UNIT_TYPES.MIRV,
      OPENFRONT_UNIT_TYPES.Warship,
    ]);

    expect(isBuildableAttack(OPENFRONT_UNIT_TYPES.Warship)).toBe(true);
    expect(isBuildableAttack(OPENFRONT_UNIT_TYPES.Port)).toBe(false);
  });

  it("matches OpenFront Nukes group membership", () => {
    expect(OPENFRONT_NUKE_UNIT_TYPES).toEqual([
      OPENFRONT_UNIT_TYPES.AtomBomb,
      OPENFRONT_UNIT_TYPES.HydrogenBomb,
      OPENFRONT_UNIT_TYPES.MIRVWarhead,
      OPENFRONT_UNIT_TYPES.MIRV,
    ]);

    expect(isNuke(OPENFRONT_UNIT_TYPES.MIRVWarhead)).toBe(true);
    expect(isNuke(OPENFRONT_UNIT_TYPES.Warship)).toBe(false);
  });

  it("matches OpenFront BuildMenus group membership", () => {
    expect(OPENFRONT_BUILD_MENU_UNIT_TYPES).toEqual([
      OPENFRONT_UNIT_TYPES.City,
      OPENFRONT_UNIT_TYPES.DefensePost,
      OPENFRONT_UNIT_TYPES.SAMLauncher,
      OPENFRONT_UNIT_TYPES.MissileSilo,
      OPENFRONT_UNIT_TYPES.Port,
      OPENFRONT_UNIT_TYPES.Factory,
      OPENFRONT_UNIT_TYPES.AtomBomb,
      OPENFRONT_UNIT_TYPES.HydrogenBomb,
      OPENFRONT_UNIT_TYPES.MIRV,
      OPENFRONT_UNIT_TYPES.Warship,
    ]);

    expect(isBuildMenuUnit(OPENFRONT_UNIT_TYPES.Factory)).toBe(true);
    expect(isBuildMenuUnit(OPENFRONT_UNIT_TYPES.TransportShip)).toBe(false);
  });

  it("matches OpenFront PlayerBuildable group membership", () => {
    expect(OPENFRONT_PLAYER_BUILDABLE_UNIT_TYPES).toEqual([
      ...OPENFRONT_BUILD_MENU_UNIT_TYPES,
      OPENFRONT_UNIT_TYPES.TransportShip,
    ]);

    expect(isPlayerBuildable(OPENFRONT_UNIT_TYPES.TransportShip)).toBe(true);
    expect(isPlayerBuildable(OPENFRONT_UNIT_TYPES.TradeShip)).toBe(false);
  });

  it("keeps transport ship player-buildable but out of normal build menu display", () => {
    expect(isPlayerBuildable(OPENFRONT_UNIT_TYPES.TransportShip)).toBe(true);
    expect(isBuildMenuUnit(OPENFRONT_UNIT_TYPES.TransportShip)).toBe(false);
    expect(getBuildMenuOrder(OPENFRONT_UNIT_TYPES.TransportShip)).toBeNull();
  });

  it("excludes source-present internal units from normal player build menu", () => {
    expect(OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES).toEqual([
      OPENFRONT_UNIT_TYPES.Shell,
      OPENFRONT_UNIT_TYPES.SAMMissile,
      OPENFRONT_UNIT_TYPES.TradeShip,
      OPENFRONT_UNIT_TYPES.Train,
      OPENFRONT_UNIT_TYPES.MIRVWarhead,
    ]);

    for (const type of OPENFRONT_SOURCE_PRESENT_INTERNAL_UNIT_TYPES) {
      expect(isBuildMenuUnit(type)).toBe(false);
      expect(isPlayerBuildable(type)).toBe(false);
    }
  });

  it("matches source-level structure vs non-structure construction split", () => {
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.City)).toBe(
      "structure-construction",
    );
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.MissileSilo)).toBe(
      "structure-construction",
    );
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.AtomBomb)).toBe(
      "non-structure-construction",
    );
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.Warship)).toBe(
      "non-structure-construction",
    );
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.TransportShip)).toBe(
      "transport-buildable",
    );
    expect(getBuildActionKind(OPENFRONT_UNIT_TYPES.TradeShip)).toBe(
      "source-present-internal",
    );
  });

  it("matches source-derived BuildMenu display order without icons or assets", () => {
    expect(OPENFRONT_BUILD_MENU_DISPLAY_ORDER).toEqual([
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
    ]);

    expect(getBuildMenuOrder(OPENFRONT_UNIT_TYPES.AtomBomb)).toBe(0);
    expect(getBuildMenuOrder(OPENFRONT_UNIT_TYPES.Factory)).toBe(9);
    expect(getBuildMenuOrder(OPENFRONT_UNIT_TYPES.Shell)).toBeNull();
  });

  it("creates catalogue entries without build costs or placement legality", () => {
    expect(getBuildCatalogueEntry(OPENFRONT_UNIT_TYPES.Port)).toEqual({
      unitType: OPENFRONT_UNIT_TYPES.Port,
      actionKind: "structure-construction",
      isNormalBuildMenuUnit: true,
      isPlayerBuildable: true,
      buildMenuOrder: 4,
    });

    expect(getBuildCatalogueEntry(OPENFRONT_UNIT_TYPES.Shell)).toEqual({
      unitType: OPENFRONT_UNIT_TYPES.Shell,
      actionKind: "source-present-internal",
      isNormalBuildMenuUnit: false,
      isPlayerBuildable: false,
      buildMenuOrder: null,
    });
  });
});
