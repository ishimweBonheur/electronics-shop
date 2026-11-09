<script setup lang="ts">
import { collections } from '~/utils/collections'

const route = useRoute()
const selected = computed(() => collections.find(category => category.slug === route.query.collection))
useSeoMeta({ title: 'Categories', robots: 'noindex, follow' })
</script>

<template>
  <PagePlaceholder
    :eyebrow="selected ? `Explore ${selected.name}` : 'Explore Voltix'"
    :title="selected ? `Explore ${selected.name}.` : 'Find your next everyday essential.'"
    description="Our collections are being prepared. The homepage imagery previews our visual direction; products are not available to purchase yet."
  >
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-6">
      <CategoryCard v-for="category in collections" :key="category.slug" :category="category" data-scroll="zoom-in" data-scroll-stagger :class="selected?.slug === category.slug ? 'border-primary ring-1 ring-primary' : ''" />
    </div>
    <BaseButton to="/shop" class="mt-8">Explore demo gadgets</BaseButton>
  </PagePlaceholder>
</template>
