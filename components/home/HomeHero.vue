<script setup lang="ts">
import { ui } from '~/utils/ui'
</script>

<template>
  <section aria-labelledby="hero-heading" class="relative isolate overflow-hidden bg-hero text-text-white">
    <div :class="ui.pageContainer" class="relative pb-0 pt-10 md:py-16 lg:py-20">
      <div class="relative z-10 max-w-xl">
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
            <template #icon-right><AppIcon name="arrow-right" /></template>
          </BaseButton>
          <BaseButton to="/categories" variant="dark-outline" size="small" class="uppercase tracking-wide">
            Explore Collections
          </BaseButton>
        </div>
      </div>
      <div class="relative -mx-4 mt-3 h-56 overflow-hidden sm:-mx-6 sm:h-72 md:absolute md:inset-y-0 md:right-0 md:-z-10 md:mx-0 md:mt-0 md:h-auto md:w-[72%]">
        <NuxtImg
          src="/images/voltix-dark-hero.webp"
          alt="Black over-ear headphones on a graphite pedestal with electric blue studio light beams"
          width="1536"
          height="1024"
          sizes="100vw sm:768px md:75vw xl:1000px"
          loading="eager"
          quality="85"
          preload
          fetchpriority="high"
          class="absolute right-0 h-full w-full object-cover object-right md:object-contain"
        />
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-b from-hero via-transparent to-transparent md:bg-gradient-to-r md:via-hero/40" />
      </div>
    </div>
  </section>
</template>
