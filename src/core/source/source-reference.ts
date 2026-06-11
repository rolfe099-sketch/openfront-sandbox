export const OPENFRONT_REPO_URL =
  "https://github.com/openfrontio/OpenFrontIO";

export const OPENFRONT_SOURCE_BASELINE = {
  repoUrl: OPENFRONT_REPO_URL,
  branch: "main",
  commitHash: "af2849a2d71a7700a72c077a9e5616e990e584f6",
  checkedDate: "2026-06-11",
} as const;

export type SourceConfidence =
  | "unknown"
  | "source-located"
  | "needs review"
  | "source-code verified";

export type SourceExactness =
  | "not implemented"
  | "source-aligned model"
  | "source-derived behavior";

export interface SourceReference {
  readonly repoUrl: string;
  readonly branch: string;
  readonly commitHash: string;
  readonly checkedDate: string;
  readonly path: string;
  readonly lineStart?: number;
  readonly lineEnd?: number;
  readonly confidence: SourceConfidence;
  readonly exactness: SourceExactness;
  readonly notes?: string;
}

export interface OpenFrontSourceReferenceInput {
  readonly path: string;
  readonly lineStart?: number;
  readonly lineEnd?: number;
  readonly confidence: SourceConfidence;
  readonly exactness: SourceExactness;
  readonly notes?: string;
  readonly repoUrl?: string;
  readonly branch?: string;
  readonly commitHash?: string;
  readonly checkedDate?: string;
}

const COMMIT_HASH_PATTERN = /^[0-9a-f]{40}$/;
const CHECKED_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isOpenFrontCommitHash(value: string): boolean {
  return COMMIT_HASH_PATTERN.test(value);
}

export function createOpenFrontSourceReference(
  input: OpenFrontSourceReferenceInput,
): SourceReference {
  const reference: SourceReference = {
    repoUrl: input.repoUrl ?? OPENFRONT_SOURCE_BASELINE.repoUrl,
    branch: input.branch ?? OPENFRONT_SOURCE_BASELINE.branch,
    commitHash: input.commitHash ?? OPENFRONT_SOURCE_BASELINE.commitHash,
    checkedDate: input.checkedDate ?? OPENFRONT_SOURCE_BASELINE.checkedDate,
    path: input.path,
    lineStart: input.lineStart,
    lineEnd: input.lineEnd,
    confidence: input.confidence,
    exactness: input.exactness,
    notes: input.notes,
  };

  assertValidSourceReference(reference);
  return reference;
}

export function assertValidSourceReference(
  reference: SourceReference,
): asserts reference is SourceReference {
  if (reference.repoUrl !== OPENFRONT_REPO_URL) {
    throw new Error("OpenFront source references must use the approved repo URL.");
  }

  if (!isOpenFrontCommitHash(reference.commitHash)) {
    throw new Error("OpenFront source references must include a 40-character commit hash.");
  }

  if (!CHECKED_DATE_PATTERN.test(reference.checkedDate)) {
    throw new Error("OpenFront source references must include a YYYY-MM-DD checked date.");
  }

  if (!isRepositoryRelativePath(reference.path)) {
    throw new Error("OpenFront source references must use repository-relative paths.");
  }

  if (reference.lineStart !== undefined && !isPositiveInteger(reference.lineStart)) {
    throw new Error("OpenFront source lineStart must be a positive integer.");
  }

  if (reference.lineEnd !== undefined && !isPositiveInteger(reference.lineEnd)) {
    throw new Error("OpenFront source lineEnd must be a positive integer.");
  }

  if (
    reference.lineStart !== undefined &&
    reference.lineEnd !== undefined &&
    reference.lineEnd < reference.lineStart
  ) {
    throw new Error("OpenFront source lineEnd cannot be before lineStart.");
  }
}

export function formatSourceReference(reference: SourceReference): string {
  assertValidSourceReference(reference);
  const linePart =
    reference.lineStart === undefined
      ? ""
      : reference.lineEnd === undefined || reference.lineEnd === reference.lineStart
        ? `:${reference.lineStart}`
        : `:${reference.lineStart}-${reference.lineEnd}`;

  return `${reference.path}${linePart}@${reference.commitHash.slice(0, 12)}`;
}

export function hasReviewableSource(reference: SourceReference): boolean {
  return (
    reference.confidence !== "unknown" &&
    reference.exactness !== "not implemented" &&
    isOpenFrontCommitHash(reference.commitHash) &&
    isRepositoryRelativePath(reference.path)
  );
}

function isRepositoryRelativePath(path: string): boolean {
  return (
    path.length > 0 &&
    !path.startsWith("/") &&
    !path.startsWith("\\") &&
    !path.includes("\\") &&
    !path.split("/").includes("..")
  );
}

function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}
