<script setup lang="ts">
import { demoProducts } from '~/utils/demo-products'

const route = useRoute()
const product = computed(() => demoProducts.find(item => item.slug === route.query.product))
const collectionTitles: Record<string, string> = {
  'new-arrivals': 'New arrivals are on the way.',
  'best-sellers': 'Explore the demo best sellers.',
  'deals': 'Deals are coming soon.',
}
const title = computed(() => product.value?.name || collectionTitles[String(route.query.collection)] || 'Good things are on the way.')
useSeoMeta({ title: 'Shop', robots: 'noindex, follow' })
</script>

<template>
  <PagePlaceholder eyebrow="Voltix demo collection" :title="title" description="This is a storefront design demonstration. Product names, prices, and promotions are illustrative; no orders can be placed.">
    <div v-if="product" class="max-w-sm rounded-card border border-border bg-surface p-5">
      <NuxtImg :src="product.image" :alt="`Illustrative ${product.name}`" width="480" height="480" sizes="100vw sm:320px" class="aspect-square w-full mix-blend-multiply" />
      <p class="mt-4 text-sm font-semibold">Sample price: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price) }} USD</p>
      <p class="mt-2 text-xs text-text-secondary">Demo product · Not available for purchase</p>
    </div>
    <BaseButton v-else to="/#best-sellers">Browse demo products</BaseButton>
  </PagePlaceholder>
</template>
