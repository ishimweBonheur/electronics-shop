# Header and homepage hero

The homepage has since received a reference-inspired dark restyle. See
[the current design notes](reference-restyle.md) for updated components and assets.
The shared layout, routing, accessibility, and SEO architecture described below
remains in use.

## Component flow

`app.vue` renders `NuxtLayout` around `NuxtPage`. `layouts/default.vue` owns the
single shared header, skip link, and main landmark. `pages/index.vue` owns home
metadata and renders `HomeHero`. Nuxt automatically registers nested components
as `LayoutAppHeader` and `HomeHero` using its filename prefix deduplication.

- `components/layout/AppHeader.vue`: original text logo, active NuxtLink
  navigation, search/cart destinations, and a mobile disclosure menu.
- `components/home/HomeHero.vue`: responsive copy and locally stored hero image;
  stacked below 1024px, two columns above it.
- `components/ui/AppIcon.vue`: small, typed collection of original inline SVG icons.
- `components/ui/BaseButton.vue`: extended with a typed `to` prop. Navigation renders
  a NuxtLink with native anchor semantics; actions remain native buttons. A loading
  or disabled destination renders a disabled button, so it cannot navigate.
- `components/ui/PagePlaceholder.vue`, `pages/products/{shop,search}.vue`,
  `pages/categories/index.vue`, and `pages/cart/index.vue`:
  intentionally minimal destinations. Search accepts a GET query and explains
  availability; it does not fabricate results. Placeholder pages are `noindex`.

The stores folder was empty, so the cart count is explicitly zero. Replace that
value with a computed getter from the real Pinia cart store when it is introduced.
No cart store, backend, product records, or checkout is added here.

## Accessibility and responsive decisions

Navigation uses links; the menu toggle uses a button with `aria-expanded` and
`aria-controls`. It is a disclosure, not an application menu or modal, so it uses
normal Tab navigation without menu roles or a focus trap. Hidden links are removed
from keyboard navigation. Escape closes the menu and restores toggle focus; route
changes close it and focus the main landmark. NuxtLink supplies `aria-current` for
the active page. Icons are decorative, with accessible labels on icon-only links.
Controls have at least 44px touch targets, and the shared focus styles remain active.

The header switches navigation at 768px; the hero switches to columns at 1024px.
The calls to action stack on narrow phones. The hero uses eager loading, a high
fetch priority, responsive Nuxt Image sources, and explicit 1254×1254 dimensions
with a square aspect ratio to reserve space before loading.

## SEO and configuration

The homepage uses `useSeoMeta()` for its exact title, description, and Open Graph
equivalents, and overrides the global title template to avoid duplicate branding.
Canonical and absolute Open Graph image URLs are emitted only with a valid,
configured site address; localhost and the `.example` fallback are excluded.

Set `NUXT_SITE_URL=https://your-production-domain.com` for the site module and
server runtime config. `NUXT_PUBLIC_SITE_URL` can also override the public runtime
address. The homepage serializes only the site address into hydration state, so
server-rendered and client metadata agree. Never set these to example domains
when deploying a real store.

## Image provenance

`public/images/voltix-hero.webp` is an original AI-generated studio image created
with the built-in imagegen tool for this project. It depicts fictional, unbranded
electronics; it does not claim to represent actual inventory. The generated PNG
was converted to WebP using the already installed Sharp dependency, without
changing composition. Final asset: 1254×1254 pixels, approximately 100 KB.

Prompt: “Photorealistic luxury studio still life of unbranded premium consumer
electronics. A dark graphite over-ear wireless headphone with soft ear cushions
is the main subject, accompanied by one slim silver tablet seen edge-on and a
small silver wireless earbud case. Objects rest naturally on a low pale stone
pedestal, light cool grey seamless studio background, softbox lighting, subtle
blue reflected light. Graphite, silver, off-white. Complete headphone silhouette,
square composition, no logos, words, UI, watermarks, or human figures.”

## Interview talking points

1. Layouts handle shared page structure; pages own route-specific content and SEO.
2. Typed props and small components keep presentation reusable without adding a
   state-management abstraction before there is real shared state.
3. Native links preserve open-in-new-tab and browser history; buttons handle actions.
4. SSR metadata and local image optimization improve discoverability and initial
   rendering; image dimensions reserve layout space.
5. Semantic tokens keep colors consistent; mobile-first breakpoints adapt content
   rather than maintaining separate desktop and mobile page implementations.
6. Honest placeholders provide working navigation while keeping commerce out of scope.

## Validation

TypeScript checking, ESLint, and the production build pass. Browser checks use
the production server and cover 320, 360, 390, 768, 1024, and 1440px viewports,
horizontal overflow, stacked/two-column layout, image decoding, sticky positioning,
single header rendering, mobile menu Tab/Escape behavior, focus after navigation,
all placeholder destinations, and search submission. SEO was checked both without
a configured URL and with a production URL supplied to the server at runtime.
No runtime errors or hydration warnings were observed. Desktop and mobile captures
are saved in `output/qa/`.
