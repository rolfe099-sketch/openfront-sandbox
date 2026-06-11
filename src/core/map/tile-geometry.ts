import { TileRef } from "../scenario/types";
import { createOpenFrontSourceReference } from "../source/source-reference";

export const TILE_GEOMETRY_SOURCES = {
  tileRefAndApi: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 3,
    lineEnd: 51,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes:
      "TileRef and the subset of GameMap geometry methods implemented by OpenFrontTileGeometry.",
  }),
  lookupTables: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 131,
    lineEnd: 143,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Row-major lookup table construction for ref/x/y conversion.",
  }),
  coordinateRefs: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 149,
    lineEnd: 180,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Coordinate/ref conversion, ref validity, and dimension accessors.",
  }),
  neighbors: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 333,
    lineEnd: 344,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Cardinal neighbor lookup and ordering.",
  }),
  distancesAndCircleSearch: createOpenFrontSourceReference({
    path: "src/core/game/GameMap.ts",
    lineStart: 352,
    lineEnd: 384,
    confidence: "source-code verified",
    exactness: "source-derived behavior",
    notes: "Manhattan distance, squared Euclidean distance, and bounded circle search.",
  }),
} as const;

export interface TileGeometryInput {
  readonly width: number;
  readonly height: number;
}

export interface CircleSearchFilter {
  (tile: TileRef, distanceSquared: number): boolean;
}

export class OpenFrontTileGeometry {
  private readonly refToX: number[];
  private readonly refToY: number[];
  private readonly yToRef: number[];
  private readonly width_: number;
  private readonly height_: number;

  constructor(input: TileGeometryInput) {
    this.width_ = input.width;
    this.height_ = input.height;

    let ref = 0;
    this.refToX = new Array(this.width_ * this.height_);
    this.refToY = new Array(this.width_ * this.height_);
    this.yToRef = new Array(this.height_);

    for (let y = 0; y < this.height_; y++) {
      this.yToRef[y] = ref;
      for (let x = 0; x < this.width_; x++) {
        this.refToX[ref] = x;
        this.refToY[ref] = y;
        ref++;
      }
    }
  }

  width(): number {
    return this.width_;
  }

  height(): number {
    return this.height_;
  }

  ref(x: number, y: number): TileRef {
    if (!this.isValidCoord(x, y)) {
      throw new Error(`Invalid coordinates: ${x},${y}`);
    }
    return this.yToRef[y] + x;
  }

  isValidRef(ref: TileRef): boolean {
    return ref >= 0 && ref < this.refToX.length;
  }

  x(ref: TileRef): number {
    return this.refToX[ref];
  }

  y(ref: TileRef): number {
    return this.refToY[ref];
  }

  isValidCoord(x: number, y: number): boolean {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      x < this.width_ &&
      y >= 0 &&
      y < this.height_
    );
  }

  neighbors(ref: TileRef): TileRef[] {
    const neighbors: TileRef[] = [];
    const w = this.width_;
    const x = this.refToX[ref];

    if (ref >= w) neighbors.push(ref - w);
    if (ref < (this.height_ - 1) * w) neighbors.push(ref + w);
    if (x !== 0) neighbors.push(ref - 1);
    if (x !== w - 1) neighbors.push(ref + 1);

    return neighbors;
  }

  manhattanDist(c1: TileRef, c2: TileRef): number {
    return Math.abs(this.x(c1) - this.x(c2)) + Math.abs(this.y(c1) - this.y(c2));
  }

  euclideanDistSquared(c1: TileRef, c2: TileRef): number {
    const x = this.x(c1) - this.x(c2);
    const y = this.y(c1) - this.y(c2);
    return x * x + y * y;
  }

  circleSearch(
    tile: TileRef,
    radius: number,
    filter?: CircleSearchFilter,
  ): Set<TileRef> {
    const center = { x: this.x(tile), y: this.y(tile) };
    const tiles: Set<TileRef> = new Set<TileRef>();
    const minX = Math.max(0, center.x - radius);
    const maxX = Math.min(this.width_ - 1, center.x + radius);
    const minY = Math.max(0, center.y - radius);
    const maxY = Math.min(this.height_ - 1, center.y + radius);

    for (let i = minX; i <= maxX; ++i) {
      for (let j = minY; j <= maxY; j++) {
        const t = this.yToRef[j] + i;
        const d2 = this.euclideanDistSquared(tile, t);
        if (d2 > radius * radius) continue;
        if (!filter || filter(t, d2)) {
          tiles.add(t);
        }
      }
    }

    return tiles;
  }
}

export function createOpenFrontTileGeometry(
  input: TileGeometryInput,
): OpenFrontTileGeometry {
  return new OpenFrontTileGeometry(input);
}
