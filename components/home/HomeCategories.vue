<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import CategoryCard from '~/components/categories/CategoryCard.vue'
import { useScrollAnimation } from '~/composables/ui/useScrollAnimation'
import { collections } from '~/utils/categories/collections'
import { ui } from '~/utils/ui'

const scrollRoot = ref<HTMLElement | null>(null)
useScrollAnimation(scrollRoot)
</script>

<template>
  <section ref="scrollRoot" aria-labelledby="categories-heading" :class="ui.pageContainer" class="pb-6 pt-7 sm:pb-8 sm:pt-9">
    <div class="mb-4 flex items-center justify-between gap-4">
      <h2 id="categories-heading" data-scroll="fade-up" class="text-section-heading uppercase">Shop by category</h2>
      <NuxtLink to="/categories" class="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-wide hover:text-primary-hover sm:text-xs">
        View all <AppIcon name="arrow-right" class="size-3.5" />
      </NuxtLink>
    </div>
    <div class="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-6">
      <CategoryCard v-for="category in collections" :key="category.slug" data-scroll="zoom-in" data-scroll-stagger :category="category" />
    </div>
    <div class="mt-3 text-center">
      <NuxtLink to="/categories" class="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-wide hover:text-primary-hover">View all collections <AppIcon name="arrow-right" class="size-3" /></NuxtLink>
    </div>
  </section>
</template>
