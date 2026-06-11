# Upstream Watch

OpenFront Sandbox needs a lightweight way to stay aware of upstream OpenFront changes without silently changing training behavior, formulas, fair-play policy, or browser permissions.

The Upstream Watch system detects source, release, and policy changes, then writes a human-review report. It does not update gameplay logic automatically.

## Long-Term North Star

The long-term north star is a fair, offline training sandbox that helps players reason about OpenFront-style decisions under stated assumptions. Upstream Watch supports that goal by making upstream changes visible without changing mechanics or compliance-sensitive behavior automatically.

## Changelog-First Rule

Read `CHANGELOG.md` before running or acting on upstream checks. After meaningful upstream-watch changes, update `CHANGELOG.md` so the repo remains easy to resume after context compaction.

## Optimal Under Stated Assumptions

If upstream information later affects recommendations, the UI and code must frame those recommendations as `optimal under stated assumptions` unless all relevant mechanics are verified and documented. Upstream Watch only reports possible changes; it does not approve exactness claims.

## Tracked Sources

- OpenFront source repository: `https://github.com/openfrontio/OpenFrontIO`
- OpenFront releases and tags from GitHub
- OpenFront Terms of Service: `https://openfront.io/terms-of-service.html`
- OpenFront Privacy Policy: `https://openfront.io/privacy-policy.html`
- Local mechanics register: `docs/openfront-mechanics-sources.md`
- Local project rules: `docs/project-discipline.md`
- Local architecture decisions: `docs/architecture-decisions.md`

## Why This Matters

OpenFront may change mechanics, balance, rules, terms, or implementation details over time. OpenFront Sandbox should remain accurate and fair-play compliant, but upstream changes require judgment before they affect local behavior.

Automatic updates to mechanics or policy could introduce wrong formulas, stale assumptions, or compliance risk. Reports keep the project informed while preserving human review.

## What Is Automatic

The upstream check script is allowed to:

- Fetch GitHub release or tag metadata.
- Fetch the latest source commit metadata.
- Fetch Terms of Service and Privacy Policy HTML/text.
- Compute hashes for tracked pages.
- Compare fetched values with `docs/upstream-status.json`.
- Search release text for watched mechanic or rule keywords.
- Generate a markdown report in `docs/upstream-checks/`.
- Update `docs/upstream-status.json` after a successful check.
- Mark `reviewRequired` when a change or review trigger is detected.

## What Requires Human Approval

Detected upstream changes must be reviewed before changing any of the following:

- Mechanic constants
- Scoring formulas
- Fair-play rules
- Browser permissions
- OpenFront integration behavior
- Extension host permissions
- Content script behavior
- Planner formulas
- Any feature that could create live gameplay advantage, automation, hidden-state reading, client modification, or cheat-adjacent behavior

Every detected upstream change should be treated as `needs review` until explicitly accepted.

This preserves the fair-play sandbox boundary: no live OpenFront page integration, content scripts, live overlays, gameplay automation, hidden-state reading, client modification, host permissions, or exact-mechanic claims without documented review.

## How To Run Checks

There is not yet a package/app scaffold, so `scripts/upstream-check.ts` is currently a documented TypeScript script source and is not wired to npm.

Once package setup exists, add an npm script such as:

```json
{
  "scripts": {
    "upstream:check": "tsx scripts/upstream-check.ts"
  }
}
```

If the project later avoids a TypeScript runtime dependency, compile the script with the normal project TypeScript build and run the generated JavaScript instead.

The intended command will be:

```bash
npm run upstream:check
```

## How To Interpret Results

Each report is written to:

```text
docs/upstream-checks/YYYY-MM-DD-HHMM.md
```

Read the newest report before changing mechanics or compliance-sensitive behavior.

Important report fields:

- `Terms changed`: `Yes` means the page hash differs from the previous stored hash.
- `Privacy Policy changed`: `Yes` means the page hash differs from the previous stored hash.
- `Latest release/tag`: Shows the newest release or tag found through GitHub metadata.
- `Latest commit`: Shows the newest source commit found through GitHub metadata.
- `Keyword hits`: Shows watched words found in release text.
- `Recommended human review items`: Lists what should be reviewed before making changes.
- `No gameplay formulas were updated automatically.`: Confirms the watch process did not change gameplay logic.

If `docs/upstream-status.json` has `"reviewRequired": true`, stop before changing game-related or compliance-sensitive logic and ask for approval.

## Network Failures

If network access is unavailable, the script should:

- Print a helpful error message.
- Leave `docs/upstream-status.json` unchanged.
- Avoid writing partial reports.
- Explain that manual review is needed.

The upstream check is not part of normal build/test gates unless deliberately added later, so network failures should not prevent local build or test commands from working.
