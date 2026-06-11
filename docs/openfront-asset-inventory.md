# OpenFront Asset Inventory

This inventory tracks OpenFront assets considered for OpenFront Sandbox. It is intentionally conservative: no OpenFront assets are copied into this repository during this phase.

## Source Baseline

| Field | Value |
| --- | --- |
| OpenFront repository | https://github.com/openfrontio/OpenFrontIO |
| Branch | `main` |
| Checked commit | `af2849a2d71a7700a72c077a9e5616e990e584f6` |
| Last checked | 2026-06-11 |
| Local inspection path | `.external/openfront` |
| Asset import status | No assets imported |
| Git ignore verification | `.gitignore:4:.external/` |

## Inventory Status Labels

- `allowed`: Asset is confirmed under upstream `resources/` and may be used if attribution and ShareAlike handling are recorded.
- `forbidden`: Asset source is proprietary, external, premium, unknown-license, or otherwise not approved for use.
- `needs review`: More source or license review is required before use.

## Initial Asset Inventory

| Asset path | Category | License status | Use status | Importance to training simulator | Replacement plan if forbidden |
| --- | --- | --- | --- | --- | --- |
| `resources/maps/**` | Map binary data, lower-resolution map data, map manifests, and thumbnails | CC BY-SA 4.0 candidate, subject to per-file review | needs review | High for future source-faithful map training | Use reviewed `resources` map assets only, or create original simplified training maps if map reuse is not approved. |
| `resources/maps/*/manifest.json` | Map metadata and nation spawn metadata | CC BY-SA 4.0 candidate, subject to per-file review | needs review | High for source-faithful map study | Use reviewed manifests only, or write original training scenarios if map metadata reuse is not approved. |
| `resources/maps/*/map.bin`, `map4x.bin`, `map16x.bin` | Map terrain/geometry binaries | CC BY-SA 4.0 candidate, subject to per-file review | needs review | High for source-faithful terrain practice | Use reviewed binaries only, or provide original practice maps. |
| `resources/maps/*/thumbnail.webp` | Map thumbnails | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Medium for map selection UI | Generate original thumbnails from approved map data or omit thumbnails. |
| `resources/atlases/**` | Emoji, FX, icon, status, unit, and font atlas files | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Medium for source-faithful visuals | Use reviewed atlases, create original training-focused SVG/icons, or omit non-essential visuals. |
| `resources/flags/**` | Nation, region, and custom flag SVGs | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Medium for map/nation study | Use reviewed flags, generate neutral labels, or omit flags in early training UI. |
| `resources/fonts/**` | Open resource font files | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for mechanics training | Use system fonts or clearly licensed third-party fonts. |
| `resources/icons/**` | Open resource icons | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Medium for UI parity | Use reviewed icons or original OpenFront Sandbox icons. |
| `resources/images/**` | Open resource images | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low to medium depending on use | Use reviewed images, original images, or omit decorative imagery. |
| `resources/lang/**` | Localization strings | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for early simulator work | Write original OpenFront Sandbox interface text. |
| `resources/sounds/**` | Open resource sound files | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for fair-play training | Omit sound or use clearly licensed original/third-party sounds. |
| `resources/sprites/**` | Open resource sprite files | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Medium for visual fidelity | Use reviewed sprites, original SVG/icons, or simplified visual markers. |
| `resources/countries.json` | Country and flag metadata | CC BY-SA 4.0 candidate, subject to per-file review; includes restricted-country fields | needs review | Medium for nation/map study | Use reviewed metadata only, or create original scenario metadata. |
| `resources/QuickChat.json` | Game text/data resource | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for offline planning | Omit unless needed for source-derived UI context. |
| `resources/changelog.md`, `resources/news.json`, `resources/version.txt`, `resources/manifest.json`, `resources/ads.txt`, `resources/robots.txt` | Site metadata and public web resources | CC BY-SA 4.0 candidate or non-simulator data, subject to per-file review | needs review | Low for simulator behavior | Link to upstream or omit unless a specific training need is documented. |
| `resources/terms-of-service.html` | Policy document | Not a simulator asset | needs review | Not needed for simulator behavior | Link to current OpenFront terms instead of copying. |
| `resources/privacy-policy.html` | Policy document | Not a simulator asset | needs review | Not needed for simulator behavior | Link to current OpenFront privacy policy instead of copying. |
| `proprietary/fonts/**` | Restricted font assets | Proprietary/restricted | forbidden | Not required for fair-play training | Use system fonts or clearly licensed third-party fonts. |
| `proprietary/images/**` | Restricted logos and image assets | Proprietary/restricted | forbidden | Not required for fair-play training | Use original OpenFront Sandbox branding and original training-focused icons. |
| `proprietary/sounds/**` | Restricted music assets | Proprietary/restricted | forbidden | Not required for fair-play training | Omit music or use clearly licensed original/third-party audio. |
| External/CDN/API/database-hosted OpenFront assets | External or premium assets | Not covered by open repository asset license | forbidden | Not required for fair-play training | Use documented `resources` equivalents, original assets, clearly licensed third-party assets, or omit. |

## Local Category Counts

These counts summarize the inspected local clone at the checked commit. They are not import approvals.

| Category | File count | Initial status |
| --- | ---: | --- |
| `resources/` root files | 11 | needs review |
| `resources/atlases/**` | 10 | needs review |
| `resources/flags/**` | 694 | needs review |
| `resources/fonts/**` | 4 | needs review |
| `resources/icons/**` | 7 | needs review |
| `resources/images/**` | 189 | needs review |
| `resources/lang/**` | 39 | needs review |
| `resources/maps/**` | 465 | needs review |
| `resources/sounds/**` | 20 | needs review |
| `resources/sprites/**` | 23 | needs review |
| `proprietary/` root files | 1 | forbidden |
| `proprietary/fonts/**` | 1 | forbidden |
| `proprietary/images/**` | 8 | forbidden |
| `proprietary/sounds/**` | 6 | forbidden |

## Per-File Import Requirement

Before any asset file is copied into OpenFront Sandbox, add a specific inventory row for that file with its source path, checked commit, license status, attribution, intended use, and replacement plan if later removed.
