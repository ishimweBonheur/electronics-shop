<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import PagePlaceholder from '~/components/ui/PagePlaceholder.vue'
import CategoryCard from '~/components/categories/CategoryCard.vue'
import type { Category } from '~/types/categories'
import { collections } from '~/utils/categories/collections'
defineProps<{ selected?: Category }>()
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
