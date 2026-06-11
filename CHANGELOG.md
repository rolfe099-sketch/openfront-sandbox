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

### Notes

- The project now has a website app scaffold, package setup, build scripts, and a minimal test.
- OpenFront-related mechanics have not been implemented yet.
- Major features, external integrations, new dependencies, and expanded browser permissions require approval before implementation.
- Upstream watch reports are informational only and must not automatically change gameplay formulas, fair-play rules, or browser permissions.
- Phase 1A intentionally does not implement mechanics, scoring, saved scenarios, storage, browser extension runtime behavior, content scripts, OpenFront integration, backend services, or analytics.
- No commits or tags should be created automatically; both require explicit approval.
