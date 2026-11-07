<script setup lang="ts">
import { ui } from '~/utils/ui'
import { demoProducts } from '~/utils/demo-products'

const route = useRoute()
const query = computed(() => typeof route.query.q === 'string' ? route.query.q : '')
const matches = computed(() => {
  const term = query.value.trim().toLowerCase()
  return term ? demoProducts.filter(product => product.name.toLowerCase().includes(term)) : []
})
useSeoMeta({ title: 'Search', robots: 'noindex, follow' })
</script>

<template>
  <PagePlaceholder eyebrow="Discover Voltix" title="Find your next everyday essential." description="Search our demonstration collection. Product details and USD prices are samples; no purchases can be made.">
    <form role="search" aria-label="Demo product search" action="/search" method="get" class="max-w-lg">
      <label for="product-search" :class="ui.label">Search demo products</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input id="product-search" name="q" type="search" :value="query" :class="ui.input" placeholder="Headphones, devices, and more" maxlength="200">
        <BaseButton type="submit">Search</BaseButton>
      </div>
    </form>
    <div v-if="query" class="mt-6">
      <p role="status" class="text-description text-text-secondary">
        {{ matches.length }} demo {{ matches.length === 1 ? 'product' : 'products' }} found for “{{ query }}”.
      </p>
      <div v-if="matches.length" class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <ProductCard v-for="product in matches" :key="product.slug" :product="product" />
      </div>
      <p v-else class="mt-3 text-sm text-text-secondary">Try “headphones”, “charger”, or “camera”.</p>
    </div>
  </PagePlaceholder>
</template>
