import { describe, expect, it } from "vitest";
import {
  OpenFrontTileGeometry,
  TILE_GEOMETRY_SOURCES,
  createOpenFrontTileGeometry,
} from "./tile-geometry";

describe("OpenFront tile geometry", () => {
  const geometry = new OpenFrontTileGeometry({ width: 4, height: 3 });

  it("records source-derived GameMap references", () => {
    expect(TILE_GEOMETRY_SOURCES.tileRefAndApi.path).toBe(
      "src/core/game/GameMap.ts",
    );
    expect(TILE_GEOMETRY_SOURCES.distancesAndCircleSearch.confidence).toBe(
      "source-code verified",
    );
  });

  it("round-trips coordinates and tile refs in row-major order", () => {
    for (let y = 0; y < geometry.height(); y++) {
      for (let x = 0; x < geometry.width(); x++) {
        const ref = geometry.ref(x, y);
        expect(geometry.x(ref)).toBe(x);
        expect(geometry.y(ref)).toBe(y);
      }
    }

    expect(geometry.ref(0, 0)).toBe(0);
    expect(geometry.ref(3, 0)).toBe(3);
    expect(geometry.ref(0, 1)).toBe(4);
    expect(geometry.ref(3, 2)).toBe(11);
  });

  it("rejects invalid coordinates through ref", () => {
    expect(() => geometry.ref(-1, 0)).toThrow("Invalid coordinates: -1,0");
    expect(() => geometry.ref(4, 0)).toThrow("Invalid coordinates: 4,0");
    expect(() => geometry.ref(0, -1)).toThrow("Invalid coordinates: 0,-1");
    expect(() => geometry.ref(0, 3)).toThrow("Invalid coordinates: 0,3");
    expect(() => geometry.ref(1.5, 1)).toThrow("Invalid coordinates: 1.5,1");
  });

  it("matches valid coordinate checks", () => {
    expect(geometry.isValidCoord(0, 0)).toBe(true);
    expect(geometry.isValidCoord(3, 2)).toBe(true);
    expect(geometry.isValidCoord(4, 2)).toBe(false);
    expect(geometry.isValidCoord(3, 3)).toBe(false);
    expect(geometry.isValidCoord(1.5, 1)).toBe(false);
  });

  it("matches OpenFront ref bounds behavior", () => {
    expect(geometry.isValidRef(-1)).toBe(false);
    expect(geometry.isValidRef(0)).toBe(true);
    expect(geometry.isValidRef(11)).toBe(true);
    expect(geometry.isValidRef(12)).toBe(false);

    expect(geometry.isValidRef(1.5)).toBe(true);
  });

  it("returns cardinal neighbors in OpenFront order", () => {
    expect(geometry.neighbors(0)).toEqual([4, 1]);
    expect(geometry.neighbors(1)).toEqual([5, 0, 2]);
    expect(geometry.neighbors(4)).toEqual([0, 8, 5]);
    expect(geometry.neighbors(5)).toEqual([1, 9, 4, 6]);
    expect(geometry.neighbors(11)).toEqual([7, 10]);
  });

  it("computes Manhattan distance", () => {
    expect(geometry.manhattanDist(0, 11)).toBe(5);
    expect(geometry.manhattanDist(5, 6)).toBe(1);
    expect(geometry.manhattanDist(5, 5)).toBe(0);
  });

  it("computes squared Euclidean distance", () => {
    expect(geometry.euclideanDistSquared(0, 11)).toBe(13);
    expect(geometry.euclideanDistSquared(5, 6)).toBe(1);
    expect(geometry.euclideanDistSquared(5, 5)).toBe(0);
  });

  it("searches circle tiles within map bounds", () => {
    expect(Array.from(geometry.circleSearch(5, 1))).toEqual([4, 1, 5, 9, 6]);
    expect(Array.from(geometry.circleSearch(0, 2))).toEqual([0, 4, 8, 1, 5, 2]);
  });

  it("applies circle search filters to tile refs and squared distances", () => {
    const filtered = geometry.circleSearch(0, 2, (_tile, d2) => d2 === 4);

    expect(Array.from(filtered)).toEqual([8, 2]);
  });

  it("creates geometry through the factory helper", () => {
    const created = createOpenFrontTileGeometry({ width: 2, height: 2 });

    expect(created.ref(1, 1)).toBe(3);
  });
});
