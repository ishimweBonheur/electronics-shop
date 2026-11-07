# Header-only refinement

This pass changes the navigation and supporting destinations only. Existing hero,
benefit, category, product, footer and backend code is not extended or rebuilt.

## Files created or modified

| File | Purpose |
| --- | --- |
| `components/layout/AnnouncementBar.vue` | Near-black #050608 band. Full promotional message from 640px upward; “FREE SHIPPING OVER $99” on phones. A small Demo qualifier preserves the existing mock-store context. Both messages are configurable props. |
| `components/layout/AppHeader.vue` | Sticky #08090B header, original uppercase lightning logo, white controls, active blue navigation, zero cart badge and mutually exclusive mobile/search panels. The three-column mobile grid keeps the logo centered independently of the action widths. Desktop navigation starts at 1024px. |
| `components/layout/MobileNavigation.vue` | Full-width dark disclosure with separators, real category expansion, chevron state, accessible controls and links. Hidden content is inert. Panel height is bounded to the viewport and scrolls vertically. |
| `components/layout/HeaderSearch.vue` | Dark search interface with icon, white text and explicit focus styles. Opening focuses the field; submitting uses the existing local demo search. It makes no real-catalog or backend claims. |
| `utils/navigation.ts` | Single set of navigation labels and the five requested route paths, shared by desktop and mobile. |
| `components/AppIcon.vue` | Adds original inline SVG lightning and chevron paths to the existing icon component; no icon package is installed. |
| `layouts/default.vue` | Passes AnnouncementBar into AppHeader’s announcement slot so the layout owns integration and both elements are rendered once in the same sticky region. Existing skip link and main-focus handling are retained. |
| `tailwind.config.ts` | Adds only `announcement: '#050608'`. All existing tokens, including `navbar: '#08090B'` and `primary: '#1677FF'`, are preserved in Tailwind v3 configuration. |
| `pages/products.vue` | Minimal upcoming Shop route. |
| `pages/new-arrivals.vue` | Minimal upcoming New Arrivals route. |
| `pages/best-sellers.vue` | Minimal upcoming Best Sellers route without real sales-ranking claims. |
| `pages/deals.vue` | Minimal upcoming Deals route without active promotions. |
| `docs/header-navbar.md` | This file-by-file implementation and verification guide. |

The existing `/categories`, `/cart`, `/search` and `/shop` routes are preserved.
The four new upcoming routes use PagePlaceholder and `noindex, follow` metadata;
they do not implement product listings or commerce.

## Interaction and accessibility

- Desktop and mobile use NuxtLink, with active states based on the current path.
- The navigation toggle and category disclosure expose `aria-expanded` and
  `aria-controls`. Category navigation and category expansion are separate actions.
- Standard Tab navigation is retained. These are inline disclosures, not modals,
  so focus is not trapped. Escape closes the current panel and restores its toggle.
- Selecting a mobile link closes the menu; route changes close either panel.
  Opening search closes the menu and vice versa. Search submission focuses the
  main content, including when submitting the same query twice.
- Open/close transitions respect reduced-motion preferences. Main controls have
  44px touch targets and use existing visible keyboard focus styling.
- No Pinia cart store exists, so count zero is rendered identically on the server
  and client. No persisted storage is read and no cart implementation is added.
- Search continues to filter only the previously implemented local sample products.
  This pass does not add product data, APIs, dependencies or backend integration.

## Verification

`npm.cmd run typecheck`, `npm.cmd run lint` and `npm.cmd run build` all pass.
Production browser checks at 375, 768, 1024 and 1440px verify:

- One header and announcement; computed backgrounds #08090B and #050608.
- Precisely centered mobile logo, responsive announcement text, white icons and
  visible zero-item badge; no horizontal page overflow.
- All five requested routes and active electric-blue states; placeholders have
  `noindex, follow` metadata.
- Mobile category expansion, keyboard selection, panel closing, Escape and focus
  restoration; hidden content is not keyboard accessible.
- Black search panel and input, input focus, mutually exclusive panels, existing
  sample-only results and focus after repeated submissions of the same query.
- Working cart link, one shared header on every destination and sticky positioning.
- No runtime exceptions or hydration warnings.

Header-only screenshots are saved as `output/qa/header-{375,768,1024,1440}.png`,
`output/qa/header-mobile-expanded.png`, and `output/qa/header-mobile-search.png`.
