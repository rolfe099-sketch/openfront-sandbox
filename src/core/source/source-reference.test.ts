import { describe, expect, it } from "vitest";
import {
  OPENFRONT_SOURCE_BASELINE,
  createOpenFrontSourceReference,
  formatSourceReference,
  hasReviewableSource,
  isOpenFrontCommitHash,
} from "./source-reference";

describe("OpenFront source references", () => {
  it("stores the pinned OpenFront inspection baseline", () => {
    expect(OPENFRONT_SOURCE_BASELINE.repoUrl).toBe(
      "https://github.com/openfrontio/OpenFrontIO",
    );
    expect(isOpenFrontCommitHash(OPENFRONT_SOURCE_BASELINE.commitHash)).toBe(
      true,
    );
  });

  it("creates a validated repository-relative source reference", () => {
    const reference = createOpenFrontSourceReference({
      path: "src/core/game/Game.ts",
      lineStart: 25,
      lineEnd: 27,
      confidence: "source-located",
      exactness: "source-aligned model",
    });

    expect(reference.branch).toBe("main");
    expect(formatSourceReference(reference)).toBe(
      "src/core/game/Game.ts:25-27@af2849a2d71a",
    );
    expect(hasReviewableSource(reference)).toBe(true);
  });

  it("rejects non-pinned or non-repository source references", () => {
    expect(() =>
      createOpenFrontSourceReference({
        path: "../outside.ts",
        confidence: "source-located",
        exactness: "source-aligned model",
      }),
    ).toThrow(/repository-relative/);

    expect(() =>
      createOpenFrontSourceReference({
        path: "src/core/game/Game.ts",
        commitHash: "not-a-commit",
        confidence: "source-located",
        exactness: "source-aligned model",
      }),
    ).toThrow(/40-character commit hash/);
  });

  it("does not treat not-implemented references as reviewable behavior", () => {
    const reference = createOpenFrontSourceReference({
      path: "src/core/execution/ConstructionExecution.ts",
      confidence: "source-located",
      exactness: "not implemented",
    });

    expect(hasReviewableSource(reference)).toBe(false);
  });
});
