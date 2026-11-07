# Reference-inspired storefront

This records the earlier visual restyle. The newer [dark storefront notes](dark-storefront.md)
describe the current all-black navigation, demonstration offers and typed sample products.

The current homepage follows the supplied desktop/mobile reference: slim black
announcement band, compact navigation, dark headphone hero with electric-blue
lighting, a dark editorial feature strip, light category tiles, and a second row
of collection previews. The mobile header switches to dark colors, with a left
menu toggle. All navigation remains accessible through the existing disclosure
menu and shared layout.

The image's prices, review counts, best-seller labels, free delivery, returns,
warranty, and 24/7 support promises are not backed by store data. The corresponding
visual areas therefore use editorial content and clearly labeled previews.
There are no accounts, product records, backend requests, or checkout changes.
Category tiles link to a placeholder that acknowledges the selected category.

## Files

- `components/layout/AppHeader.vue`: announcement bar and compact responsive header.
- `components/home/HomeHero.vue`: new headline, dark responsive hero and existing BaseButton links.
- `components/home/HomeHighlights.vue`: four descriptive editorial highlights.
- `components/home/HomeCollections.vue`: six category links and five collection preview cards.
- `utils/collections.ts`: shared category labels, slugs and image names, not inventory.
- `pages/categories.vue`: selected-category placeholder content.
- `pages/index.vue`: section assembly and updated Open Graph image.
- `tailwind.config.ts`: additive semantic dark-surface and inverse-text tokens.

Existing primary blue and light-page tokens are retained. The new tokens are
`night`, `night-surface`, `text-inverse`, `text-on-dark`, `border-inverse`, and
`accent`. Fonts, buttons, image optimization and layouts reuse the existing setup.

## Original imagery

Generated with the built-in imagegen tool and saved locally:

- `public/images/voltix-dark-hero.webp` (1536×1024, approximately 100 KB).
- `public/images/collections/{audio,wearables,mobile,gaming,smart-home,drones}.webp`
  (480×480 each), extracted from a generated six-cell contact sheet.

Hero prompt: “Original photorealistic studio advertising image, landscape 3:2.
Premium unbranded black over-ear headphones, three-quarter angle, brushed metallic
ear cups, standing upright on a low graphite pedestal. Headphones in the right
half, left half near-black negative space. Two diagonal electric-blue and white
light beams behind the headphones. High-contrast rim lighting, realistic polished
materials, complete silhouette. No words, logos, watermarks, people, or UI.”

Category prompt: “Original ecommerce contact sheet, exact three-column by two-row
grid, equal square white cells, centered separate unbranded black electronics:
wireless earbuds and open case; rectangular smartwatch; two slim smartphones;
game controller; smart home camera; folded drone. Photorealistic neutral studio
lighting and soft contact shadows. No labels, logos, grid lines, or overlap.”

The earlier light hero image is retained but is no longer used on the homepage.

## Verification

Lint, TypeScript checking, and production build pass. Production browser checks
cover widths 320, 390, 768, 1024 and 1440px, all image decoding, no page overflow,
the three-line desktop headline, mobile category scrolling, disclosure menu and
Escape focus restoration, selected-category navigation, and a single shared
header. No runtime errors or hydration warnings were observed. Updated screenshots
are in `output/qa/reference-desktop.png` and `output/qa/reference-mobile.png`.
