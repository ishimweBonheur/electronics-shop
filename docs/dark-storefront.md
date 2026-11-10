# Dark storefront and demo catalog

The current design uses Tailwind CSS 3.4.19. All color values remain in
`tailwind.config.ts`; CSS-first Tailwind v4 syntax is not used. The theme now uses
primary #1677FF, primary-hover #005FE8, navbar #08090B, night #0B0D12,
night-surface #171A21, border-inverse #292D36, text-inverse #FFFFFF,
text-on-dark #A1A1AA, surface #F8F9FA and text-primary #111827. `navbar` is shared
by desktop navigation, mobile navigation, announcement and search panels, with
no breakpoint overrides to white backgrounds.

## Components and data

- `components/layout/AnnouncementBar.vue`: exact requested offer text with a
  persistent demo qualifier. It sits inside the shared sticky header.
- `components/layout/AppHeader.vue`: Shop, Categories, New Arrivals, Best Sellers,
  Deals; dark mobile disclosure and dark inline search panel. Transitions respect
  reduced-motion preferences; Escape restores the appropriate toggle's focus.
  Opening one panel closes the other, and navigation closes both. Header search
  uses the demo search route; this is a disclosure, not a modal.
- `components/home/HomeHero.vue`: original local headphone artwork, electric-blue
  type and BaseButton links. Images retain explicit dimensions and responsive sizes.
- `components/home/HomeBenefits.vue`: four specified delivery/returns/warranty/
  support examples. Visible text explicitly identifies them as demonstration offers.
- `components/home/HomeCategories.vue` and `components/categories/CategoryCard.vue`: six
  reusable local category cards in a responsive grid.
- `components/home/HomeBestSellers.vue` and `components/products/ProductCard.vue`: five
  typed example products with sample USD prices and preview links. “Best sellers”
  is a demo section name, not a real sales ranking. No ratings or review counts
  are supplied. Optional ratings in ProductCard would be explicitly labeled demo.
- `types/categories/index.ts`, `types/products/index.ts`, `utils/categories/collections.ts`, `utils/products/demo-products.ts`: separate
  presentation data and TypeScript interfaces, ready to replace with real data later.
- `pages/shop.vue`: acknowledges the selected product/collection and shows a
  non-purchasable product preview. New Arrivals and Deals have meaningful placeholders.
- `pages/search.vue`: client-side filtering of the five example products, with no API.

The previous `HomeHighlights` and `HomeCollections` components were replaced by
the focused section components above. Shared layouts, existing canonical/SEO
rules, and existing route destinations are retained. BaseButton now has a
`dark-outline` variant, and hover colors work for both native buttons and NuxtLinks.

The cart store is still absent, so the cart badge remains zero and no Add to Cart
action is shown. No authentication, payments, backend, or dependencies were added.

## Assets and provenance

Existing original hero and category WebP images are reused. Three additional
original fictional product images were generated using the built-in imagegen tool
and saved as `public/images/products/headphones.webp`, `charger.webp`, and
`action-camera.webp` (480×480 each). Sharp, already installed, extracted the
three-cell sheet and encoded WebP assets. No other store's images were copied.

Prompt: “Original ecommerce product photography contact sheet, exactly three
equal square columns in one row on seamless white backgrounds. Left: black
over-ear noise-cancelling headphones with complete headband and soft cushions.
Center: black circular magnetic wireless charging puck on an angled desktop stand.
Right: black rugged action camera with round lens and blank front screen. Center
each product with white margins, realistic materials, soft contact shadows,
neutral studio lighting. Original unbranded fictional products for a labeled demo
store. No words, numerals, logos, labels, watermarks, or grid lines.”

## Verification

- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed without warnings.
- `npm.cmd run build`: passed.
- Production browser checks passed at 375, 768, 1024 and 1440px. Header, expanded
  mobile menu and header search use computed rgb(8, 9, 11); hero uses rgb(11, 13, 18);
  benefits use rgb(23, 26, 33). Search/cart icons are white when idle.
- All images decoded successfully, only one hero image element is rendered, and
  no horizontal page overflow was found. Mobile panels close with Escape and restore
  focus. Opening search closes navigation. Demo search returns matching local data.
- Product previews, collection links, New Arrivals, Deals, the Best Sellers anchor,
  and the zero-item cart were verified. Anchor scrolling clears the sticky header.
  Primary NuxtLink hover resolves to #005FE8. SEO title and conditional canonical
  behavior remain intact. No runtime errors or hydration warnings were observed.

Screenshots: `output/qa/dark-storefront-{375,768,1024,1440}.png` and
`output/qa/dark-storefront-search.png`.
