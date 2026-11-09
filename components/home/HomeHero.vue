<script setup lang="ts">
import { ui } from '~/utils/ui'

const scrollRoot = ref<HTMLElement | null>(null)
useScrollAnimation(scrollRoot)

const products = [
  {
    name: ' Voltix Headphones',
    image: '/images/voltix-headphones-cutout.webp',
    position: { left: '74%', top: '13%' },
  },
  {
    name: ' Voltix Earbuds',
    image: '/images/voltix-earbuds-cutout.webp',
    position: { left: '89%', top: '34%' },
  },
  {
    name: ' Voltix Action Camera',
    image: '/images/products/action-camera-cutout.png',
    position: { left: '91%', top: '66%' },
  },
] as const

const activeIndex = ref(0)
</script>

<template>
  <section
    ref="scrollRoot"
    aria-labelledby="hero-heading"
    class="relative isolate overflow-hidden bg-hero text-text-white"
  >
    <div
      aria-hidden="true"
      data-scroll="parallax"
      class="pointer-events-none absolute inset-0 -z-10
             bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,255,255,0.04),transparent_60%)]"
    />

    <div
      :class="ui.pageContainer"
      class="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-8 md:py-14 lg:py-16"
    >
      <div class="max-w-xl">
        <p
          data-scroll="hero"
          class="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs"
        >
          Next-level tech. Elevated.
        </p>

        <h1
          id="hero-heading"
          data-scroll="hero"
          class="text-promo uppercase text-text-white"
        >
          Engineered<br>
          for performance.<br>
          <span class="text-primary">Built for you.</span>
        </h1>

        <p
          data-scroll="hero"
          class="mt-5 max-w-sm text-sm leading-relaxed text-text-muted sm:text-base"
        >
          Premium gadgets. Cutting-edge technology.<br class="hidden sm:block">
          Designed to enhance the way you live, work, and play.
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
          <BaseButton
            data-scroll="hero"
            to="/shop"
            size="small"
            class="min-w-36 uppercase tracking-wide"
          >
            Shop Now
          </BaseButton>

          <BaseButton
            data-scroll="hero"
            to="/categories"
            variant="dark-outline"
            size="small"
            class="uppercase tracking-wide"
          >
            Explore Collections
          </BaseButton>
        </div>
      </div>

      <figure class="mx-auto w-4/5 min-w-0 max-w-[520px] md:w-full">
        <div class="relative isolate aspect-square w-full">
          <!-- Transparent outer circle -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute left-[40%] top-[53%]
                   size-[105%] -translate-x-1/2 -translate-y-1/2
                   rounded-full border border-primary/30"
          />

          <!-- Larger product image with its own scroll animation layer -->
          <div
            data-scroll="hero"
            data-scroll-to-y="-12"
            data-scroll-to-scale="0.97"
            class="pointer-events-none absolute -left-[2%] top-[2%]
                   z-10 size-[80%]"
          >
            <NuxtImg
              v-for="(product, index) in products"
              :key="product.image"
              :src="product.image"
              :alt="index === activeIndex ? product.name : ''"
              :aria-hidden="index !== activeIndex"
              width="1024"
              height="1024"
              sizes="65vw md:40vw xl:416px"
              :preload="index === 0"
              :fetchpriority="index === 0 ? 'high' : 'low'"
              quality="85"
              class="absolute inset-0 size-full object-contain
                     transition-[transform,scale,opacity] duration-500 ease-out
                     motion-reduce:transition-none"
              :class="index === activeIndex
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0'"
            />
          </div>

          <!-- Product thumbnails along the circle -->
          <div role="group" aria-label="Choose a gadget">
            <button
              v-for="(product, index) in products"
              :key="`thumbnail-${product.image}`"
              type="button"
              :aria-label="`Show ${product.name}`"
              :aria-pressed="index === activeIndex"
              :style="product.position"
              class="absolute z-20 grid size-[10%] min-h-10 min-w-10
                     -translate-x-1/2 -translate-y-1/2 place-items-center
                     rounded-full border bg-hero motion-safe:transition-colors
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-primary focus-visible:ring-offset-4
                     focus-visible:ring-offset-hero"
              :class="index === activeIndex
                ? 'border-primary ring-1 ring-primary/50 ring-offset-4 ring-offset-hero'
                : 'border-primary/40 hover:border-primary'"
              @click="activeIndex = index"
            >
              <NuxtImg
                :src="product.image"
                alt=""
                width="96"
                height="96"
                class="size-[78%] object-contain"
              />
            </button>
          </div>
        </div>

    
      </figure>
    </div>
  </section>
</template>