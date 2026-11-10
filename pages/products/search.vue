<script setup lang="ts">
import ProductSearch from '~/components/products/ProductSearch.vue'
import { demoProducts } from '~/utils/products/demo-products'

definePageMeta({ path: '/search', name: 'search' })

const route = useRoute()
const query = computed(() => typeof route.query.q === 'string' ? route.query.q : '')
const matches = computed(() => {
  const term = query.value.trim().toLowerCase()
  return term ? demoProducts.filter(product => product.name.toLowerCase().includes(term)) : []
})
useSeoMeta({ title: 'Search', robots: 'noindex, follow' })
</script>

<template>
  <ProductSearch :query="query" :matches="matches" />
</template>
