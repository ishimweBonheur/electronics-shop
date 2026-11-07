<script setup lang="ts">
import { demoProducts } from '~/utils/demo-products'
import { ui } from '~/utils/ui'
</script>

<template>
  <section id="best-sellers" aria-labelledby="best-sellers-heading" aria-describedby="demo-products-note" :class="ui.pageContainer" class="scroll-mt-48 pb-12 sm:pb-16">
    <div class="mb-1 flex flex-wrap items-center justify-between gap-x-4">
      <h2 id="best-sellers-heading" class="text-section-heading uppercase">Best sellers</h2>
      <NuxtLink to="/shop?collection=best-sellers" class="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-wide hover:text-primary-hover">View all best sellers <AppIcon name="arrow-right" class="size-3" /></NuxtLink>
    </div>
    <p id="demo-products-note" class="mb-5 text-xs leading-relaxed text-text-secondary">Demo collection · Sample USD prices · Not ranked by sales or available for purchase.</p>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <ProductCard v-for="product in demoProducts" :key="product.slug" :product="product" />
    </div>
  </section>
</template>
