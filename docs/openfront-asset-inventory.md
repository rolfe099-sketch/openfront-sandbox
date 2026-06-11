# OpenFront Asset Inventory

This inventory tracks OpenFront assets considered for OpenFront Sandbox. It is intentionally conservative: no OpenFront assets are copied into this repository during this phase.

## Source Baseline

| Field | Value |
| --- | --- |
| OpenFront repository | https://github.com/openfrontio/OpenFrontIO |
| Checked commit | `af2849a2d71a7700a72c077a9e5616e990e584f6` |
| Last checked | 2026-06-11 |
| Local inspection path | `.external/openfront` |
| Asset import status | No assets imported |

## Inventory Status Labels

- `allowed`: Asset is confirmed under upstream `resources/` and may be used if attribution and ShareAlike handling are recorded.
- `forbidden`: Asset source is proprietary, external, premium, unknown-license, or otherwise not approved for use.
- `needs review`: More source or license review is required before use.

## Initial Asset Inventory

| Asset path | Category | License status | Use status | Importance to training simulator | Replacement plan if forbidden |
| --- | --- | --- | --- | --- | --- |
| `resources/maps/**` | Map data and map thumbnails | CC BY-SA 4.0 candidate, subject to per-file review | needs review | High for future source-faithful map training | Use reviewed `resources` map assets only, or create original simplified training maps if map reuse is not approved. |
| `resources/lang/**` | Localization strings | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for early simulator work | Write original OpenFront Sandbox interface text. |
| `resources/QuickChat.json` | Game text/data resource | CC BY-SA 4.0 candidate, subject to per-file review | needs review | Low for offline planning | Omit unless needed for source-derived UI context. |
| `resources/terms-of-service.html` | Policy document | Not a simulator asset | needs review | Not needed for simulator behavior | Link to current OpenFront terms instead of copying. |
| `resources/privacy-policy.html` | Policy document | Not a simulator asset | needs review | Not needed for simulator behavior | Link to current OpenFront privacy policy instead of copying. |
| `proprietary/**` | Logos, fonts, music, and other restricted assets | Proprietary/restricted | forbidden | Not required for fair-play training | Use original OpenFront Sandbox branding and original training-focused icons. |
| External/CDN/API/database-hosted OpenFront assets | External or premium assets | Not covered by open repository asset license | forbidden | Not required for fair-play training | Use documented `resources` equivalents, original assets, clearly licensed third-party assets, or omit. |

## Per-File Import Requirement

Before any asset file is copied into OpenFront Sandbox, add a specific inventory row for that file with its source path, checked commit, license status, attribution, intended use, and replacement plan if later removed.
