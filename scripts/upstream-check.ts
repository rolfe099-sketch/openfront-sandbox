#!/usr/bin/env node
/**
 * OpenFront Sandbox upstream watch.
 *
 * Package setup does not exist yet, so this TypeScript source is not wired to
 * npm. After package setup exists, add an npm script such as:
 *
 *   "upstream:check": "tsx scripts/upstream-check.ts"
 *
 * or compile this file with the project's TypeScript build and run the
 * generated JavaScript. Configure the app tsconfig to either include Node
 * types for scripts or exclude scripts from the browser app build.
 *
 * This script intentionally uses only Node built-ins.
 *
 * The script detects upstream changes and writes human-review reports. It must
 * not update gameplay formulas, fair-play policy, extension permissions, host
 * permissions, OpenFront integration behavior, or content script behavior.
 *
 * Phase 0 boundary: keep this as a safe placeholder/source file until package
 * setup is explicitly approved. Do not add dependencies just to run it.
 *
 * Project vocabulary:
 * - Long-term north star: fair offline training for OpenFront-style decision
 *   reasoning.
 * - Fair-play sandbox boundary: no live integration, automation, hidden-state
 *   reading, client modification, or host permissions without approval.
 * - "Optimal" means optimal under stated assumptions, not guaranteed exact
 *   OpenFront play.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

type Nullable<T> = T | null;

type ReleaseMetadata = {
  source: "release" | "tag" | "none";
  tagName: Nullable<string>;
  name: Nullable<string>;
  publishedAt: Nullable<string>;
  url: Nullable<string>;
  body: Nullable<string>;
};

type CommitMetadata = {
  sha: string;
  date: Nullable<string>;
  message: Nullable<string>;
  url: Nullable<string>;
};

type TrackedPageStatus = {
  url: string;
  lastHash: Nullable<string>;
  lastCheckedAt: Nullable<string>;
};

type UpstreamStatus = {
  lastCheckedAt: Nullable<string>;
  openFrontRepo: {
    url: string;
    latestRelease: Nullable<ReleaseMetadata>;
    latestCommit: Nullable<CommitMetadata>;
  };
  trackedPages: {
    termsOfService: TrackedPageStatus;
    privacyPolicy: TrackedPageStatus;
  };
  lastReportPath: Nullable<string>;
  reviewRequired: boolean;
  notes: string[];
};

type PageCheck = {
  url: string;
  hash: string;
  byteLength: number;
};

const ROOT = process.cwd();
const STATUS_PATH = path.join(ROOT, "docs", "upstream-status.json");
const REPORTS_DIR = path.join(ROOT, "docs", "upstream-checks");
const OPENFRONT_REPO_API = "https://api.github.com/repos/openfrontio/OpenFrontIO";
const USER_AGENT = "OpenFront-Sandbox-Upstream-Watch";

const KEYWORDS = [
  "sam",
  "nuke",
  "mirv",
  "port",
  "trade",
  "factory",
  "city",
  "gold",
  "alliance",
  "betrayal",
  "modifier",
  "disabled",
  "water",
  "ship",
  "warship",
];

async function main(): Promise<void> {
  const checkedAt = new Date();
  const status = await readStatus();

  try {
    const [release, commit, terms, privacy] = await Promise.all([
      fetchLatestReleaseOrTag(),
      fetchLatestCommit(),
      fetchTrackedPage(status.trackedPages.termsOfService.url),
      fetchTrackedPage(status.trackedPages.privacyPolicy.url),
    ]);

    const releaseChanged = didReleaseChange(status.openFrontRepo.latestRelease, release);
    const commitChanged = didCommitChange(status.openFrontRepo.latestCommit, commit);
    const termsChanged = didHashChange(status.trackedPages.termsOfService.lastHash, terms.hash);
    const privacyChanged = didHashChange(status.trackedPages.privacyPolicy.lastHash, privacy.hash);
    const baselineMissing = [
      status.openFrontRepo.latestRelease,
      status.openFrontRepo.latestCommit,
      status.trackedPages.termsOfService.lastHash,
      status.trackedPages.privacyPolicy.lastHash,
    ].some((value) => value === null);

    const keywordHits = findKeywordHits(release);
    const reviewItems = buildReviewItems({
      baselineMissing,
      releaseChanged,
      commitChanged,
      termsChanged,
      privacyChanged,
      keywordHits,
    });

    const reviewRequired = reviewItems.length > 0;
    const reportPath = path.join(REPORTS_DIR, `${formatReportStamp(checkedAt)}.md`);
    const reportRelativePath = toProjectPath(reportPath);
    const checkedAtIso = checkedAt.toISOString();

    const nextStatus: UpstreamStatus = {
      lastCheckedAt: checkedAtIso,
      openFrontRepo: {
        url: status.openFrontRepo.url,
        latestRelease: release,
        latestCommit: commit,
      },
      trackedPages: {
        termsOfService: {
          url: status.trackedPages.termsOfService.url,
          lastHash: terms.hash,
          lastCheckedAt: checkedAtIso,
        },
        privacyPolicy: {
          url: status.trackedPages.privacyPolicy.url,
          lastHash: privacy.hash,
          lastCheckedAt: checkedAtIso,
        },
      },
      lastReportPath: reportRelativePath,
      reviewRequired,
      notes: reviewItems,
    };

    const report = buildReport({
      checkedAtIso,
      release,
      commit,
      terms,
      privacy,
      termsChanged,
      privacyChanged,
      releaseChanged,
      commitChanged,
      baselineMissing,
      keywordHits,
      reviewItems,
    });

    await mkdir(REPORTS_DIR, { recursive: true });
    await writeFile(reportPath, report, "utf8");
    await writeJsonAtomic(STATUS_PATH, nextStatus);

    console.log(`Upstream watch report written: ${reportRelativePath}`);
    console.log(`Review required: ${reviewRequired ? "yes" : "no"}`);
    console.log("No gameplay formulas were updated automatically.");
  } catch (error) {
    console.error("Upstream check could not complete.");
    console.error(error instanceof Error ? error.message : String(error));
    console.error("docs/upstream-status.json was not updated.");
    console.error("Manual review is needed before changing mechanics or compliance-sensitive behavior.");
    process.exitCode = 1;
  }
}

async function readStatus(): Promise<UpstreamStatus> {
  const raw = await readFile(STATUS_PATH, "utf8");
  return JSON.parse(raw) as UpstreamStatus;
}

async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
}

async function fetchLatestReleaseOrTag(): Promise<ReleaseMetadata> {
  const releaseResponse = await fetch(`${OPENFRONT_REPO_API}/releases/latest`, {
    headers: githubHeaders(),
  });

  if (releaseResponse.ok) {
    const release = (await releaseResponse.json()) as Record<string, unknown>;
    return {
      source: "release",
      tagName: stringOrNull(release.tag_name),
      name: stringOrNull(release.name),
      publishedAt: stringOrNull(release.published_at),
      url: stringOrNull(release.html_url),
      body: stringOrNull(release.body),
    };
  }

  if (releaseResponse.status !== 404) {
    throw new Error(`GitHub latest release request failed with HTTP ${releaseResponse.status}.`);
  }

  const tags = (await fetchJson(`${OPENFRONT_REPO_API}/tags?per_page=1`)) as Array<Record<string, unknown>>;
  const latestTag = tags[0];

  if (!latestTag) {
    return {
      source: "none",
      tagName: null,
      name: null,
      publishedAt: null,
      url: null,
      body: null,
    };
  }

  return {
    source: "tag",
    tagName: stringOrNull(latestTag.name),
    name: stringOrNull(latestTag.name),
    publishedAt: null,
    url: stringOrNull(latestTag.zipball_url),
    body: null,
  };
}

async function fetchLatestCommit(): Promise<CommitMetadata> {
  const commits = (await fetchJson(`${OPENFRONT_REPO_API}/commits?per_page=1`)) as Array<Record<string, unknown>>;
  const latest = commits[0];

  if (!latest) {
    throw new Error("GitHub commit request returned no commits.");
  }

  const commit = latest.commit as Record<string, unknown> | undefined;
  const author = commit?.author as Record<string, unknown> | undefined;

  return {
    sha: requiredString(latest.sha, "commit sha"),
    date: stringOrNull(author?.date),
    message: stringOrNull(commit?.message),
    url: stringOrNull(latest.html_url),
  };
}

async function fetchTrackedPage(url: string): Promise<PageCheck> {
  const text = await fetchText(url, {
    Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
    "User-Agent": USER_AGENT,
  });

  return {
    url,
    hash: sha256(text),
    byteLength: Buffer.byteLength(text, "utf8"),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, { headers: githubHeaders() });

  if (!response.ok) {
    throw new Error(`${url} failed with HTTP ${response.status}.`);
  }

  return response.json();
}

async function fetchText(url: string, headers: Record<string, string>): Promise<string> {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`${url} failed with HTTP ${response.status}.`);
  }

  return response.text();
}

function githubHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": USER_AGENT,
  };
}

function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function didHashChange(previous: Nullable<string>, next: string): boolean {
  return previous !== null && previous !== next;
}

function didReleaseChange(previous: Nullable<ReleaseMetadata>, next: ReleaseMetadata): boolean {
  return previous !== null && previous.tagName !== next.tagName;
}

function didCommitChange(previous: Nullable<CommitMetadata>, next: CommitMetadata): boolean {
  return previous !== null && previous.sha !== next.sha;
}

function findKeywordHits(release: ReleaseMetadata): string[] {
  const searchableText = [release.tagName, release.name, release.body]
    .filter((value): value is string => Boolean(value))
    .join("\n");

  return KEYWORDS.filter((keyword) => containsKeyword(searchableText, keyword));
}

function containsKeyword(text: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
  return pattern.test(text);
}

function buildReviewItems(input: {
  baselineMissing: boolean;
  releaseChanged: boolean;
  commitChanged: boolean;
  termsChanged: boolean;
  privacyChanged: boolean;
  keywordHits: string[];
}): string[] {
  const items: string[] = [];

  if (input.baselineMissing) {
    items.push("Initial upstream baseline was missing; review and accept the first report before relying on it.");
  }

  if (input.releaseChanged) {
    items.push("OpenFront release or tag changed; review release notes before changing mechanics.");
  }

  if (input.commitChanged) {
    items.push("OpenFront source commit changed; review relevant source changes before changing mechanics.");
  }

  if (input.termsChanged) {
    items.push("OpenFront Terms of Service hash changed; review terms before compliance-sensitive work.");
  }

  if (input.privacyChanged) {
    items.push("OpenFront Privacy Policy hash changed; review policy before compliance-sensitive work.");
  }

  if (input.keywordHits.length > 0) {
    items.push(`Release text matched watched keywords: ${input.keywordHits.join(", ")}.`);
  }

  return items;
}

function buildReport(input: {
  checkedAtIso: string;
  release: ReleaseMetadata;
  commit: CommitMetadata;
  terms: PageCheck;
  privacy: PageCheck;
  termsChanged: boolean;
  privacyChanged: boolean;
  releaseChanged: boolean;
  commitChanged: boolean;
  baselineMissing: boolean;
  keywordHits: string[];
  reviewItems: string[];
}): string {
  const reviewItems =
    input.reviewItems.length > 0
      ? input.reviewItems.map((item) => `- ${item}`).join("\n")
      : "- No automatic review triggers detected.";

  const keywordHits =
    input.keywordHits.length > 0
      ? input.keywordHits.map((keyword) => `- ${keyword}`).join("\n")
      : "- None";

  return `# Upstream Watch Report

Generated: ${input.checkedAtIso}

## Summary

- Latest release/tag found: ${formatRelease(input.release)}
- Latest commit found: ${input.commit.sha}${input.commit.date ? ` (${input.commit.date})` : ""}
- Release/tag changed: ${yesNo(input.releaseChanged)}
- Latest commit changed: ${yesNo(input.commitChanged)}
- Initial baseline missing: ${yesNo(input.baselineMissing)}
- Terms changed: ${yesNo(input.termsChanged)}
- Privacy Policy changed: ${yesNo(input.privacyChanged)}
- No gameplay formulas were updated automatically.

## Tracked Pages

| Page | URL | SHA-256 | Bytes |
| --- | --- | --- | --- |
| Terms of Service | ${input.terms.url} | \`${input.terms.hash}\` | ${input.terms.byteLength} |
| Privacy Policy | ${input.privacy.url} | \`${input.privacy.hash}\` | ${input.privacy.byteLength} |

## Keyword Hits

${keywordHits}

Watched keywords: ${KEYWORDS.join(", ")}

## Recommended Human Review Items

${reviewItems}

## Guardrail

This report is informational only. It does not approve or apply changes to mechanic constants, scoring formulas, fair-play rules, browser permissions, OpenFront integration behavior, extension host permissions, content script behavior, or planner formulas.
`;
}

function formatRelease(release: ReleaseMetadata): string {
  if (release.source === "none") {
    return "No release or tag found";
  }

  const label = release.tagName ?? release.name ?? "unknown";
  const date = release.publishedAt ? `, published ${release.publishedAt}` : "";
  return `${release.source} ${label}${date}`;
}

function formatReportStamp(date: Date): string {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hour = pad2(date.getHours());
  const minute = pad2(date.getMinutes());
  return `${year}-${month}-${day}-${hour}${minute}`;
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

function toProjectPath(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function stringOrNull(value: unknown): Nullable<string> {
  return typeof value === "string" ? value : null;
}

function requiredString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing ${label}.`);
  }

  return value;
}

void main();
