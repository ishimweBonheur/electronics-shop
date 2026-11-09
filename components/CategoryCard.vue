<script setup lang="ts">
import type { Category } from '~/types/catalog'

defineProps<{ category: Category }>()
</script>

<template>
  <NuxtLink :to="`/categories?collection=${category.slug}`" class="group flex flex-col items-center rounded-card border border-border p-2 text-center text-text-primary motion-safe:transition-colors hover:border-primary/50 sm:p-4">
    <NuxtImg :src="`/images/collections/${category.image}.webp`" alt="" width="480" height="480" sizes="33vw sm:25vw lg:180px" loading="lazy" class="aspect-square w-full max-w-28 motion-safe:transition-transform motion-safe:group-hover:scale-105" />
    <span class="mt-2 flex min-h-10 items-center justify-center text-[11px] font-semibold leading-snug sm:text-xs">{{ category.name }}</span>
  </NuxtLink>
</template>
