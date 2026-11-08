# Standalone hero images

`components/home/HomeHero.vue` now uses a real two-column layout on tablet/desktop
and a stacked mobile layout. Product images are foreground Nuxt Image elements,
not a background layer. The old pedestal, beams, backdrop and gradient overlay
are removed from the hero image presentation; the section keeps its theme color.

The image is a native button. Clicking or tapping cycles between the headphones
and wireless earbuds; Enter and Space work through native button behavior.
The product lifts slightly on hover or keyboard focus and crossfades on selection.
`motion-safe:` gates all movement and transitions. The caption announces the
selected product with `aria-live`, and the button name describes both the current
product and the next action. Focus remains on the button after switching.

Both images are eagerly loaded, with only the initial headphones preloaded at
high priority. Their shared 1024×1024 dimensions and fixed square display area
reserve layout space, so clicking does not shift the hero or surrounding sections.
Homepage Open Graph metadata references the new headphone asset and dimensions.

## Assets

- `public/images/voltix-headphones-cutout.webp`
- `public/images/voltix-earbuds-cutout.webp`

Both are edits of the existing original product artwork, made with the built-in
imagegen tool. PNG outputs were encoded as 1024px WebP using the existing Sharp
dependency with alpha preserved. Background transparency was verified from the
pixel data: approximately 59% and 61% fully transparent pixels, respectively.
The previous artwork remains available and is not overwritten.

Headphone prompt: “Remove the black studio background, light beams, haze, pedestal,
floor and cast shadows. Keep only the existing black/graphite over-ear headphones,
preserving design, camera angle, cushions, headband and brushed metal details.
Retain subtle blue reflections on the product, with no exterior glow. Actual alpha
transparency around the product and through gaps. Center on a square canvas with
transparent padding. No logos, labels, new objects or baked checkerboard.”

Earbuds prompt: “Remove the white background and contact shadow, preserving the
existing black earbuds, open graphite case, materials, positions and viewing angle.
Actual alpha transparency outside the product and through visible gaps. Square
canvas with transparent padding. No new objects, backdrop, floor, pedestal, logos,
text, external glow or baked checkerboard.”

## Verification

TypeScript checking, lint and production build pass. Browser checks at 375, 768,
1024 and 1440px verify click cycling, native Enter/Space activation, retained
keyboard focus and visible focus styling, caption updates, hover scaling and
reduced-motion behavior. Hero height and the next section’s document position
remain unchanged on selection; no horizontal overflow was found. Optimized Nuxt
Image responses were decoded with Sharp to confirm that alpha transparency and
transparent corner pixels survive optimization. No runtime errors or hydration
warnings were observed.

Full homepage previews are saved in `output/qa/foreground-home-1440.png` and
`output/qa/foreground-home-375.png`. Product-state previews are in
`output/qa/foreground-hero-desktop.png` and `output/qa/foreground-hero-earbuds.png`.
