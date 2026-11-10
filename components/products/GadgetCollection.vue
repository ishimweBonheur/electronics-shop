<script setup lang="ts">
import PagePlaceholder from '~/components/ui/PagePlaceholder.vue'
import ProductCard from '~/components/products/ProductCard.vue'
import { demoProducts } from '~/utils/products/demo-products'

defineProps<{ eyebrow: string, title: string, description: string }>()
</script>

<template>
  <PagePlaceholder :eyebrow="eyebrow" :title="title" :description="description">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
      <p class="text-xs text-text-secondary">{{ demoProducts.length }} demo gadgets · Sample USD prices</p>
      <NuxtLink to="/categories" class="text-sm font-semibold text-primary-hover hover:underline">Explore categories →</NuxtLink>
    </div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-5">
      <ProductCard v-for="product in demoProducts" :key="product.slug" :product="product" data-scroll="fade-up" data-scroll-stagger />
    </div>
  </PagePlaceholder>
</template>
