<script setup lang="ts">
import type { DemoProduct } from '~/types/catalog'

const props = defineProps<{ product: DemoProduct }>()
const formattedPrice = computed(() => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: props.product.currency,
}).format(props.product.price))
</script>

<template>
  <article class="group h-full overflow-hidden rounded-card border border-border bg-background text-text-primary shadow-card motion-safe:transition-shadow hover:shadow-card-hover">
    <NuxtLink :to="`/shop?product=${product.slug}`" class="flex h-full flex-col rounded-card">
      <div class="relative bg-surface px-4 py-5 sm:px-5">
        <NuxtImg :src="product.image" alt="" width="480" height="480" sizes="50vw sm:33vw lg:240px" loading="lazy" class="aspect-square w-full mix-blend-multiply motion-safe:transition-transform motion-safe:group-hover:scale-105" />
        <span class="absolute left-3 top-3 rounded-sm bg-background/95 px-1.5 py-1 text-[9px] font-medium uppercase tracking-wide text-text-secondary">Demo</span>
      </div>
      <div class="flex flex-1 flex-col p-3 sm:p-4">
        <h3 class="text-product-name">{{ product.name }}</h3>
        <p class="mt-2 text-price tabular-nums text-text-primary">{{ formattedPrice }} <span class="text-[9px] font-normal text-text-secondary">USD · Sample</span></p>
        <p v-if="product.rating !== undefined" class="mt-2 text-xs text-text-secondary" :aria-label="`Demo rating ${product.rating} out of 5; illustrative only`">{{ product.rating }} / 5 · Demo rating</p>
        <span class="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-[11px] font-semibold text-primary-hover">Preview product <AppIcon name="arrow-right" class="size-3.5" /></span>
      </div>
    </NuxtLink>
  </article>
</template>
