<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import PagePlaceholder from '~/components/ui/PagePlaceholder.vue'
import ProductCard from '~/components/products/ProductCard.vue'
import type { DemoProduct } from '~/types/products'
import { demoProducts } from '~/utils/products/demo-products'
defineProps<{ title: string, product?: DemoProduct }>()
</script>

<template>
  <PagePlaceholder eyebrow="Voltix demo collection" :title="title" description="This is a storefront design demonstration. Product names, prices, and promotions are illustrative; no orders can be placed.">
    <div v-if="product" class="grid items-center gap-6 rounded-card border border-border p-5 sm:p-8 md:grid-cols-2 md:gap-10">
      <NuxtImg data-scroll="zoom-in" :src="product.image" :alt="`Illustrative ${product.name}`" width="480" height="480" sizes="100vw md:50vw" class="mx-auto aspect-square w-full object-contain max-w-lg" />
      <div>
      <p data-scroll="fade-up" class="text-xl font-semibold">Sample price: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price) }} USD</p>
      <p data-scroll="fade-up" class="mt-2 text-xs text-text-secondary">Demo product · Not available for purchase</p>
      <BaseButton to="/shop" variant="light-outline" class="mt-6">Browse all gadgets</BaseButton>
      </div>
    </div>
    <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-5">
      <ProductCard v-for="item in demoProducts" :key="item.slug" :product="item" data-scroll="fade-up" data-scroll-stagger />
    </div>
  </PagePlaceholder>
</template>
