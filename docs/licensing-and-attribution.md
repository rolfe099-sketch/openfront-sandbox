# Licensing and Attribution

This is a project compliance note, not legal advice. It summarizes the licensing posture OpenFront Sandbox uses when preparing for source-derived, fair-play, offline training work.

## Project Licensing Posture

OpenFront Sandbox code is licensed under AGPL-3.0-only. This keeps the project compatible with the intended reuse or adaptation of OpenFront public source code, which is published under AGPL-3.0 in the checked upstream materials.

OpenFront Sandbox may later reuse or adapt OpenFront source-derived logic where legally and technically practical. Any copied or adapted source must be tracked before release with:

- Upstream file path.
- Upstream commit hash.
- License status.
- Summary of changes.
- Tests or verification notes.
- Attribution requirements.

No OpenFront source code has been copied into OpenFront Sandbox during this phase.

## Checked Upstream Materials

| Source | Upstream location | Checked commit | Last checked |
| --- | --- | --- | --- |
| README license section | `README.md` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Source license | `LICENSE` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Asset license | `LICENSE-ASSETS` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Open resource license | `resources/LICENSE` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Licensing history and notices | `LICENSING.md` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Contribution terms | `CONTRIBUTING.md` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |
| Proprietary asset notice | `proprietary/LICENSE` | `af2849a2d71a7700a72c077a9e5616e990e584f6` | 2026-06-11 |

Source repository: https://github.com/openfrontio/OpenFrontIO

## OpenFront Source Code

The checked OpenFront license materials state that current OpenFront source code is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). The upstream README also identifies visible copyright notices and states that modified versions must preserve those notices in reasonably visible locations.

For OpenFront Sandbox, this means source-derived work should remain AGPL-compatible and should preserve clear attribution. If source code is copied or closely adapted later, the project must document the upstream path, checked commit, modifications, and any attribution notices before release.

## OpenFront Open Assets

The checked OpenFront asset license materials state that open assets under `resources/` are licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0), unless otherwise indicated. The upstream `LICENSE-ASSETS` file states that attribution to "OpenFront" or "OpenFront Inc." is required for open assets.

For OpenFront Sandbox, this means assets under upstream `resources/` may be candidates for later use if they are useful to the training simulator and are tracked in the asset inventory. Any imported open asset must preserve attribution, license status, source path, checked commit, and ShareAlike handling.

No OpenFront assets have been copied into OpenFront Sandbox during this phase.

## Forbidden OpenFront Assets

OpenFront assets are forbidden for OpenFront Sandbox unless explicit written permission is obtained and documented when they are:

- Under upstream `proprietary/`.
- Hosted externally on OpenFront CDN, API, server, or database systems.
- Premium skins, premium models, premium textures, or premium cosmetic assets.
- Not explicitly included under the open repository asset license.
- Unknown-license assets.

OpenFront Sandbox must not extract, copy, modify, redistribute, or derive from forbidden assets.

## Attribution Display

OpenFront Sandbox should preserve visible attribution in a dedicated notice, credits, or about area as source-derived work is added. The root `NOTICE` file is the baseline public attribution record.

Baseline display language:

> OpenFront Sandbox is an independent fair-play training sandbox. Portions may be derived from OpenFront. OpenFront is © OpenFront and Contributors. OpenFront source code is licensed under AGPL-3.0. OpenFront open assets under `/resources` are licensed under CC BY-SA 4.0 unless otherwise indicated. OpenFront Sandbox is not affiliated with or endorsed by OpenFront unless otherwise stated. Proprietary OpenFront assets are not used.

If copied or adapted OpenFront code/assets are later approved, update this document, `NOTICE`, and the relevant source or asset registers before release.
