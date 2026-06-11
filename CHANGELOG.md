# Changelog

This file is the live project memory for OpenFront Sandbox.

Before making project updates, read this file first. After making meaningful changes, add a short entry under `Unreleased` so future work can quickly recover the current state after context compaction.

## Unreleased

### Added

- Created repository documentation for architecture decisions, OpenFront mechanics source tracking, and project discipline.
- Added this live changelog as the first place to check before project updates.
- Added an upstream watch framework for OpenFront source, release, terms, privacy, and mechanics-assumption review.
- Added Phase 0 README roadmap and project vocabulary for the long-term north star, fair-play sandbox boundary, upstream watch process, changelog-first rule, and `optimal under stated assumptions`.
- Added Phase 1A Vite, React, and TypeScript website scaffold with quality gates.
- Added shared app config, initial OpenFront Sandbox shell UI, support button placeholder, fair-play messaging, and `optimal under stated assumptions` messaging.
- Added reserved extension folders for popup, options, background, and manifest work without runtime behavior or permissions.
- Added version-control checkpoint workflow documentation with quality gates, changelog/ADR updates, git status review, proposed commit messages, optional phase tags, and approval-before-commit rules.
- Added Phase 1B licensing and attribution inspection documentation for OpenFront source, open assets, proprietary assets, and future attribution expectations.
- Added an OpenFront source map and source-intake process using an ignored local `.external/openfront` clone.
- Updated the mechanics source register to require source-faithful implementation by default and to record located upstream source paths without implementing mechanics.
- Excluded the ignored `.external/` source-inspection directory from ESLint project scans.
- Excluded the ignored `.external/` source-inspection directory from Vitest project scans.
- Added AGPL-3.0-only project licensing, root `LICENSE`, root `NOTICE`, and package license metadata.
- Added an OpenFront asset policy and initial asset inventory for future compliant use of open `resources` assets.
- Updated public docs to support compliance-first, source-derived architecture without copying OpenFront source or assets yet.
- Added Phase 1C local OpenFront clone verification, source-area mapping, and expanded high-level asset inventory at a pinned upstream commit.
- Added root `AGENTS.md` as the standing development contract for AI and coding assistants.
- Updated the README contributor process to point coding assistants to `AGENTS.md` before making changes.
- Added benchmark policy, support and coordination, simulation evaluation, and replay-review architecture boundaries for future offline coaching work.

### Notes

- The project now has a website app scaffold, package setup, build scripts, and a minimal test.
- OpenFront-related mechanics have not been implemented yet.
- Major features, external integrations, new dependencies, and expanded browser permissions require approval before implementation.
- Upstream watch reports are informational only and must not automatically change gameplay formulas, fair-play rules, or browser permissions.
- Phase 1A intentionally does not implement mechanics, scoring, saved scenarios, storage, browser extension runtime behavior, content scripts, OpenFront integration, backend services, or analytics.
- Phase 1B intentionally does not implement mechanics, formulas, scoring, maps, canvas UI, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, or analytics.
- Future mechanics work is source-faithful by default; temporary educational placeholders require explicit approval and visible labeling.
- Future source and asset intake must track upstream paths, commit hashes, license status, attribution, and review notes before release.
- Phase 1C intentionally does not implement mechanics, formulas, scoring, map data, canvas UI, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Benchmark policy, support and coordination actions, simulation evaluation, and replay-style review are not implemented and must remain offline or post-game only.
- No commits or tags should be created automatically; both require explicit approval.
