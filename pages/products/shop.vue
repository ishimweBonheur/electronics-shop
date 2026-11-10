<script setup lang="ts">
import ProductShop from '~/components/products/ProductShop.vue'
import { demoProducts } from '~/utils/products/demo-products'

definePageMeta({ path: '/shop', name: 'shop' })

const route = useRoute()
const product = computed(() => demoProducts.find(item => item.slug === route.query.product))
const collectionTitles: Record<string, string> = {
  'new-arrivals': 'New arrivals are on the way.',
  'best-sellers': 'Explore the demo best sellers.',
  'deals': 'Deals are coming soon.',
}
const title = computed(() => product.value?.name || collectionTitles[String(route.query.collection)] || 'Discover your next everyday essential.')
useSeoMeta({ title: 'Shop', robots: 'noindex, follow' })
</script>

<template>
  <ProductShop :title="title" :product="product" />
</template>
