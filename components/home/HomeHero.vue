<script setup lang="ts">
import { ui } from '~/utils/ui'

const products = [
  { name: 'Over-ear Headphones', image: '/images/voltix-headphones-cutout.webp' },
  { name: 'Wireless Earbuds', image: '/images/voltix-earbuds-cutout.webp' },
] as const
const activeIndex = ref(0)
const currentProduct = computed(() => products[activeIndex.value] ?? products[0])
const nextProduct = computed(() => products[(activeIndex.value + 1) % products.length] ?? products[0])

function switchProduct() {
  activeIndex.value = (activeIndex.value + 1) % products.length
}
</script>

<template>
  <section aria-labelledby="hero-heading" class="relative isolate overflow-hidden bg-hero text-text-white">
    <div :class="ui.pageContainer" class="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-6 md:py-14 lg:py-16">
      <div class="max-w-xl">
        <p class="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">Next-level tech. Elevated.</p>
        <h1 id="hero-heading" class="text-promo uppercase text-text-white">
          Engineered<br>for performance.<br><span class="text-primary">Built for you.</span>
        </h1>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-text-muted sm:text-base">
          Premium gadgets. Cutting-edge technology.<br class="hidden sm:block">
          Designed to enhance the way you live, work, and play.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <BaseButton to="/shop" size="small" class="min-w-36 uppercase tracking-wide">
            Shop Now
            <template #icon-right></template>
          </BaseButton>
          <BaseButton to="/categories" variant="dark-outline" size="small" class="uppercase tracking-wide">
            Explore Collections
          </BaseButton>
        </div>
      </div>
      <figure class="mx-auto w-full max-w-md min-w-0 md:max-w-none">
        <button
          type="button"
          :aria-label="`${currentProduct.name}. Show ${nextProduct.name}.`"
          aria-describedby="hero-image-help"
          class="relative block aspect-square w-full cursor-pointer rounded-card border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hero motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.035] motion-safe:focus-visible:scale-[1.035] motion-safe:active:scale-[0.98]"
          @click="switchProduct"
        >
          <NuxtImg
            v-for="(product, index) in products"
            :key="product.image"
            :src="product.image"
            alt=""
            aria-hidden="true"
            width="1024"
            height="1024"
            sizes="100vw sm:448px md:50vw xl:600px"
            loading="eager"
            :preload="index === 0"
            :fetchpriority="index === 0 ? 'high' : 'low'"
            quality="85"
            :class="index === activeIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
            class="pointer-events-none absolute inset-0 h-full w-full object-contain p-3 motion-safe:transition-[opacity,transform] motion-safe:duration-300 sm:p-5"
          />
        </button>
        <figcaption class="mt-3 flex min-h-6 items-center justify-between gap-4 text-xs text-text-muted">
          <span aria-live="polite" aria-atomic="true" class="font-medium text-text-white">{{ currentProduct.name }}</span>
          <span aria-hidden="true" class="flex gap-2">
            <span v-for="(product, index) in products" :key="product.image" class="size-1.5 rounded-full" :class="index === activeIndex ? 'bg-primary' : 'bg-dark-outline'" />
          </span>
        </figcaption>
        <p id="hero-image-help" class="mt-1 text-[11px] text-text-muted">Click, tap, or press Enter to switch images.</p>
      </figure>
    </div>
  </section>
</template>
