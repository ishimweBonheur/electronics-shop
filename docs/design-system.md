# Voltix Store global design system

The installed Tailwind version is **3.4.19**. `tailwind.config.ts` is the single
palette and theme source. `assets/css/main.css` retains Tailwind v3 directives and
global element defaults. No v4 `@theme` rules, new dependencies, or sections are
introduced by this update.

## Colors

The `palette` object holds canonical values. `theme.extend.colors` exposes these
through normal Tailwind utilities; nested keys create hyphenated names.

| Token | Value | Utility example |
| --- | --- | --- |
| primary | #1677FF | `bg-primary` |
| primary-hover | #005FE8 | `hover:bg-primary-hover` |
| primary-light | #E8F2FF | `bg-primary-light` |
| secondary | #111827 | `bg-secondary` |
| secondary-hover | #1F2937 | `hover:bg-secondary-hover` |
| announcement | #050608 | `bg-announcement` |
| navbar | #08090B | `bg-navbar` |
| hero | #0B0D12 | `bg-hero` |
| dark-surface | #171A21 | `bg-dark-surface` |
| dark-border | #292D36 | `border-dark-border` |
| dark-hover | #222630 | `hover:bg-dark-hover` |
| dark-outline | #41454E | `border-dark-outline` |
| background | #FFFFFF | `bg-background` |
| surface | #F8F9FA | `bg-surface` |
| surface-hover | #F1F3F5 | `hover:bg-surface-hover` |
| border | #E5E7EB | `border-border` |
| text-primary | #111827 | `text-text-primary` |
| text-secondary | #64748B | `text-text-secondary` |
| text-muted | #A1A1AA | `text-text-muted` |
| text-white | #FFFFFF | `text-text-white` |
| success | #16A34A | `bg-success/10` |
| error | #DC2626 | `text-error` |
| error-hover | #B91C1C | `hover:bg-error-hover` |
| warning | #F59E0B | `bg-warning/15` |
| info | primary value | `border-info` |
| accent | #60A5FA | `hover:text-accent` |

Compatibility names reference the canonical object directly: `night` → `hero`,
`night-surface` → `dark-surface`, `border-inverse` → `dark-border`,
`text-inverse` → `text-white`, `text-on-dark` → `text-muted`. `info` references
`primary.DEFAULT`. These aliases keep existing sections working without a second
set of independently maintained color values. Prefer canonical names for new code.

The existing Vue components now use the canonical names directly: header/menu,
announcement, hero gradients, benefits, cards and placeholder pages. Categories
have an explicit `surface` section background, while best sellers and product
areas use `background`; foreground colors are explicit on reusable light cards
so they also remain readable when reused inside a dark parent.

```vue
<div class="border border-dark-border bg-dark-surface text-text-white">
  <p class="text-text-muted">Supporting text on a dark surface.</p>
</div>
<div class="rounded-card border border-border bg-surface text-text-primary">
  <span class="bg-primary-light text-primary-hover">A light blue highlight</span>
</div>
```

Do not construct class names such as `bg-${color}` at runtime. Use complete static
class strings or typed maps, so Tailwind can detect them. The Nuxt module scans
components and pages; the configuration explicitly includes shared `utils` files.

## Section color rules

Announcement, navigation, mobile disclosure, search and hero surfaces are chosen
explicitly. Navigation/search use `bg-navbar`; benefits and generic dark cards use
`bg-dark-surface`; hero uses `bg-hero` (or its compatibility alias). Shopping
sections stay `bg-background` or `bg-surface`.

There is no OS-driven appearance switch. Tailwind dark variants require an explicit
class, and no switch or `dark:` rules are added. The native baseline is
`color-scheme: light`; dark input recipes explicitly opt into `color-scheme: dark`
for native input affordances. Neither choice depends on device width or OS settings.

## Typography

Inter is already loaded in `nuxt.config.ts` at weights 400/500/600/700/800 with
`display=swap` and system sans-serif fallbacks. No font dependency is installed.

| Role | Utility | Size and behavior |
| --- | --- | --- |
| Promotional heading | `text-promo uppercase` | 32–52px fluid, weight 800, line height 1.08 |
| Main heading | `text-heading-1` | 32–56px fluid |
| Section heading | `text-section-heading uppercase` | 14–16px fluid, weight 700 |
| Content heading | `text-heading-2`, `text-heading-3`, `text-heading-4` | Existing heading hierarchy preserved |
| Product name | `text-product-name` | 12–14px fluid, weight 600 |
| Price | `text-price tabular-nums` | 14px, weight 600 |
| Body | `text-body` | 16px, line height 1.65 |
| Navigation | `text-navigation` | 11px, weight 600, tracked |
| Button | `text-button`, `text-button-lg` | 19px / 20px, weight 700 |
| Label / description | `text-label`, `text-description` | 14px, consistent line heights |

Base element defaults remain in `main.css`; existing components use typography
utilities where visual size differs from semantic heading level. The existing
hero and section headings only receive shared styles; no section is rebuilt.

## Buttons

Explicitly import `BaseButton` from `~/components/ui/BaseButton.vue`. It supports native buttons or typed
NuxtLink destinations, three sizes, disabled/loading states, and `icon-left` /
`icon-right` slots. Disabled/loading links become disabled buttons, preserving the
existing no-navigation behavior. Loading adds an `aria-busy` state and status text.

| Variant | Resting style | Hover |
| --- | --- | --- |
| primary | primary blue, white text, no border | primary-hover |
| secondary | secondary dark, white text, no border | secondary-hover |
| outline | transparent, white text, dark-outline border | dark-surface |
| dark-outline | compatibility alias for outline | dark-surface |
| light-outline | transparent, dark text, light border | surface-hover |
| ghost | transparent, inherits text color | primary at 10% opacity |
| danger | error red, white text, no border | error-hover |

`outline` now means the specified dark outline. Existing light-background callers
have been migrated to `light-outline`. Use the matching variant for the surrounding
section; no device-based or automatic theme detection is involved.

Small/medium/large sizes use 12/16/24px horizontal padding and minimum heights
44/48/52px. All have 8px corners and a visible blue focus ring with a transparent
offset, avoiding a white halo on dark surfaces. Hover states work for links and
native buttons; disabled states retain their resting fill.

```vue
<BaseButton to="/products">Shop now</BaseButton>
<BaseButton variant="secondary">Continue</BaseButton>
<BaseButton variant="outline">Dark section action</BaseButton>
<BaseButton variant="light-outline">Light section action</BaseButton>
<BaseButton variant="ghost">Inherited text color</BaseButton>
<BaseButton variant="danger" :loading="saving">Delete</BaseButton>
```

## Contrast decisions

White on the exact primary blue is **4.104:1**, below the normal-text 4.5:1
threshold. To preserve both requested colors, button text is at least **19px,
weight 700** and uses the large-text 3:1 threshold. This is why the small button
size changes padding rather than shrinking labels below 19px. See
[WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Use primary-hover for small blue text on white/light blue. Small navigation hover
text uses the existing brighter `accent` on `dark-hover`; resting active primary
text on navbar is 4.854:1. The cart count uses navbar-colored text on blue at the
same ratio; the cart icon remains white. Status badges use dark text on pale fills,
and error badges use error-hover so their small labels retain sufficient contrast.
The secondary text/surface pair is 4.515:1 and muted text/dark-surface is 6.793:1.
Disabled controls have different contrast requirements; their disabled behavior
and opacity are retained. These checks cover configured text/focus combinations,
not a claim of a complete WCAG audit of the website.

## Layout and shared UI recipes

`utils/ui/index.ts` exports static class recipes rather than custom CSS components:

```vue
<script setup lang="ts">
import { ui } from '~/utils/ui'
</script>

<template>
  <section :class="[ui.pageContainer, ui.section]">
    <label for="query" :class="ui.label">Search</label>
    <input id="query" :class="ui.searchInput" type="search">
    <span :class="[ui.badge, ui.badgeTone.info]">Information</span>
  </section>
</template>
```

- `max-w-content`: 1280px. `px-page-mobile`, `sm:px-page-tablet`,
  `lg:px-page-desktop`: 16/24/32px. These live in the theme; header and shared
  containers consume them.
- `rounded-card`: 12px. `rounded-control`: 8px for buttons and inputs.
- `shadow-card` / `shadow-card-hover`: restrained, shared card shadows.
- `ui.input`, `ui.searchInput`: light inputs; `ui.darkInput`: generic dark input;
  `ui.darkSearchInput`: black header search field with icon padding.
- Focus rings use the solid primary color; invalid input focus uses error. Connect
  error messages using `aria-describedby` and set `aria-invalid="true"`.
- `ui.badgeTone`: neutral, primary, info, success, error and warning. Include visible
  status labels instead of relying on color alone.
- Default transitions are 150ms with a shared easing curve. Animation/transition
  classes remain wrapped in `motion-safe:` to respect reduced-motion preferences.

No new homepage sections, data sources, authentication, cart implementation, or
dependencies are added by this design-system change.

## Modified files and validation

- `tailwind.config.ts`: canonical palette, compatibility aliases, layout/radius,
  typography and transition tokens.
- `assets/css/main.css`: stable native color-scheme baseline; existing element
  defaults consume the updated typography tokens.
- `components/ui/BaseButton.vue`: exact variant/hover colors, dark and light outlines,
  inherited ghost text, contrast-sized labels, state/focus styling and sizes.
- `utils/ui/index.ts`: shared light/dark inputs, focus rings, status badges and container
  spacing. Error badges use the darker error tone for small-text contrast.
- `components/products/ProductCard.vue`, `components/categories/CategoryCard.vue`: 12px card radii,
  shared shadows, product typography and surface hover.
- `components/ui/PagePlaceholder.vue`: light-outline variant migration and darker
  small blue text on white.
- `components/layout/HeaderSearch.vue`: shared dark input recipe.
- `components/layout/AppHeader.vue`, `components/layout/MobileNavigation.vue`:
  typography/spacing tokens and contrasting dark hover/count styling; navigation
  behavior and component structure are preserved.
- `components/home/HomeHero.vue`, `components/home/HomeCategories.vue`,
  `components/home/HomeBestSellers.vue`: replace existing heading style literals
  with the shared typography tokens; section content and structure are preserved.
- `docs/design-system.md`: current authoritative palette and component usage guide.

TypeScript checking, linting (without warnings), and production build pass. A
Tailwind/PostCSS check compiles every requested palette utility and browser checks
confirm their computed values. The real BaseButton SFC is compiled into a temporary
test fixture to check all variants/sizes, exact hover fills, inherited ghost text,
focus rings, loading/disabled states, and disabled navigation fallback. Tests check
badge contrast and respect for reduced motion, 1280px containers, 16/24/32px side
padding, 12px cards and 8px inputs, no overflow at 375/768/1024/1440px, black mobile
navigation and search, and existing sample search behavior. OS light/dark
preferences leave the section colors unchanged. No runtime exceptions or hydration
warnings were observed. Sample resting button contrast measurements are saved in
`output/qa/design-system-contrast.json`; these do not replace a full site audit.
