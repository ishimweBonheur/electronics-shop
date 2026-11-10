# Voltix Store

Nuxt 3, Vue 3, TypeScript, and Tailwind CSS storefront. The project root remains
the Nuxt source directory; `nuxt.config.ts` keeps its existing configuration.

```text
components/
  cart/           Cart presentation
  categories/     Category cards and collection view
  home/           Homepage sections
  layout/         Header, announcement bar, navigation, and search overlay
  products/       Product cards, collections, shop, and search views
  ui/             Shared buttons, icons, and page shell
pages/
  index.vue
  cart/index.vue
  categories/index.vue
  products/
    index.vue
    shop.vue
    search.vue
    best-sellers.vue
    new-arrivals.vue
    deals.vue
composables/ui/    Shared scroll animation lifecycle
stores/           Pinia stores (currently empty)
services/         API integrations (currently empty)
types/
  categories/     Category contracts
  products/       Demo product contracts
utils/
  categories/     Editorial collection data
  layout/         Shared navigation destinations
  products/       Demo product data
  ui/             Style recipes and pure animation math
layouts/          Shared page layout
assets/css/       Tailwind styles and global CSS
public/           Static images, favicon, and robots.txt
server/           Nitro server configuration and future server code
tests/            Animation regression tests
docs/             Implementation documentation
```

Pages own routing, query-based data selection, and SEO; feature components own
presentation. Route metadata preserves the original public paths and route names,
including `/shop`, `/search`, `/deals`, `/best-sellers`, and `/new-arrivals`.

Use explicit imports for shared UI components and nested composables, for example:

```ts
import BaseButton from '~/components/ui/BaseButton.vue'
import { useScrollAnimation } from '~/composables/ui/useScrollAnimation'
```

Keep future stores and services under their feature folders and explicitly import
nested stores when needed. There is currently no checkout, footer, live service,
or store implementation; add feature folders when those implementations exist.
Empty directories contain no placeholder files and are not tracked by Git.

Validation:

```sh
npm run typecheck
npm run lint
node --test tests/scroll-animation.test.mjs
npm run build
```
