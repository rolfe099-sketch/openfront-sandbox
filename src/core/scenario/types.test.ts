import { describe, expect, it } from "vitest";
import {
  OPENFRONT_UNIT_TYPES,
  SOURCE_ALIGNED_MODEL_SOURCES,
  createOpenFrontScenarioModel,
  isMapPos,
  isOpenFrontUnitType,
  isTileRefValue,
} from "./types";

describe("source-aligned OpenFront scenario models", () => {
  it("recognizes source-aligned unit type vocabulary", () => {
    expect(isOpenFrontUnitType(OPENFRONT_UNIT_TYPES.City)).toBe(true);
    expect(isOpenFrontUnitType("Castle")).toBe(false);
  });

  it("validates TileRef and MapPos model values without map behavior", () => {
    expect(isTileRefValue(0)).toBe(true);
    expect(isTileRefValue(12)).toBe(true);
    expect(isTileRefValue(-1)).toBe(false);
    expect(isTileRefValue(1.25)).toBe(false);

    expect(isMapPos({ x: 4, y: 7 })).toBe(true);
    expect(isMapPos({ x: 4.5, y: 7 })).toBe(false);
    expect(isMapPos(null)).toBe(false);
  });

  it("creates a scenario snapshot with source references", () => {
    const scenario = createOpenFrontScenarioModel({
      id: "foundation-smoke",
      map: { width: 20, height: 10, numLandTiles: 100 },
      players: [{ id: "player-a", displayName: "Player A" }],
      units: [
        {
          id: 1,
          type: OPENFRONT_UNIT_TYPES.City,
          ownerId: "player-a",
          tile: 42,
          isActive: true,
        },
      ],
      tick: 0,
    });

    expect(scenario.sourceReferences).toContain(
      SOURCE_ALIGNED_MODEL_SOURCES.coreAliases,
    );
    expect(scenario.units[0]?.type).toBe("City");
  });

  it("rejects inconsistent scenario snapshots", () => {
    expect(() =>
      createOpenFrontScenarioModel({
        id: "",
        map: { width: 20, height: 10 },
        players: [],
      }),
    ).toThrow(/non-empty id/);

    expect(() =>
      createOpenFrontScenarioModel({
        id: "bad-owner",
        map: { width: 20, height: 10 },
        players: [{ id: "player-a" }],
        units: [
          {
            id: 1,
            type: OPENFRONT_UNIT_TYPES.Port,
            ownerId: "missing-player",
            tile: 4,
          },
        ],
      }),
    ).toThrow(/owner is not in scenario players/);
  });
});
