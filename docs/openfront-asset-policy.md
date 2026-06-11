# OpenFront Asset Policy

OpenFront Sandbox may use OpenFront open assets only when the asset is legally allowed, technically useful, and tracked. No OpenFront assets are copied into this repository during this phase.

## Allowed Asset Sources

Assets may be considered for later import when they are confirmed to be under OpenFront's upstream `resources/` directory and covered by the checked CC BY-SA 4.0 asset license, unless a specific file states different terms.

Before importing an allowed asset, record:

- Upstream path.
- Upstream commit hash.
- Asset category.
- License status.
- Attribution text.
- ShareAlike handling.
- Whether the asset is necessary for source-faithful training.

## Forbidden Asset Sources

OpenFront Sandbox must not use:

- Upstream `proprietary/` assets.
- External/CDN/API/database-hosted OpenFront assets.
- Premium skins, premium models, premium textures, or premium cosmetic assets.
- Assets not explicitly included under the open repository asset license.
- Unknown-license assets.

Forbidden assets must not be copied, extracted, modified, redistributed, transformed, or used as derivative inputs unless explicit written permission is obtained and documented.

## Replacement Plan for Forbidden Assets

When a forbidden asset would otherwise be useful:

- Use an equivalent open asset from upstream `resources/` if one exists and is documented.
- Create original training-focused SVGs, icons, or diagrams for OpenFront Sandbox.
- Use clearly licensed third-party assets only when their license is documented and compatible with the project.
- Omit non-essential premium or cosmetic assets.

## Review Gate

Every asset import requires an inventory entry before release. If the license status is unclear, mark the asset as `needs review` and do not import it.
