# Scroll-linked animation

Minimal working example: this heading follows scrollY from 0 to 400px in either
direction. At 200px it has opacity 0.5 and translateY 30px. Stopping scrolling
stops the animation; there is no independent playback.

```vue
<script setup lang="ts">
const section = ref<HTMLElement | null>(null)
useScrollAnimation(section, { start: 0, end: 400 })
</script>

<template>
  <section ref="section">
    <h1 data-scroll="fade-up" data-scroll-from-y="60">
      Engineered for performance
    </h1>
  </section>
</template>
```

`progress = clamp((window.scrollY - start) / (end - start), 0, 1)`.
Each value interpolates linearly as `from + (to - from) * progress`.
Scrolling back to any position restores exactly the same values. No durations,
delays, IntersectionObserver triggers, Web Animation playback, or inertial easing
are involved. Grid staggering offsets scroll ranges by 16px per card in the
rendered row; it does not introduce time delays.

Mark descendants with `data-scroll="fade-up|fade-left|fade-right|zoom-in"`.
By default they progress from 0 to 1 while their layout top moves from 95% to
55% down the viewport. Ranges clamp to the page's maximum scroll so the last
row can finish. Per-element `data-scroll-start` and `data-scroll-end` override
absolute scroll positions; composable options provide shared defaults.

Customize any endpoint with `data-scroll-from-opacity`, `data-scroll-to-opacity`,
`data-scroll-from-x`, `data-scroll-to-x`, `data-scroll-from-y`,
`data-scroll-to-y`, `data-scroll-from-scale`, `data-scroll-to-scale`.
Distances are pixels. Opacity and scale are unitless.

The hero starts fully visible and subtly recedes over the first 400px of scroll;
scrolling upward restores it. `data-scroll="hero"` defaults to opacity 1 to 0.7
and Y 0 to -20px. `data-scroll="parallax"` moves a noninteractive decorative
background 0 to 24px with constant 1.08 scale to cover its edges. The background
uses a faint white highlight over the existing hero color. Product image hover/switch interactions remain on
descendants, separate from the scroll transform.

All sections share one passive scroll listener and one requestAnimationFrame
queue. Frames are requested only for scroll, geometry changes, focus, or component
updates. Layout offsets are cached and measured separately from transform writes;
they do not include transforms, preventing feedback drift. ResizeObserver,
viewport resizing, and image loading invalidate geometry. Only opacity and
transform animate; no layout dimensions change and no dependencies were added.

SSR renders visible content with no animation styles. DOM access starts on mount.
Reduced motion restores the original styles, including when toggled at runtime.
Keyboard focus makes the focused element immediately readable and restores the
scroll state after blur. Cleanup restores original inline styles, removes listeners,
disconnects ResizeObserver, and cancels the final pending shared frame.

The full-width page container retains responsive side padding. Header and mobile
navigation also use the available width. Text measures and product preview sizes
remain constrained for readability.
