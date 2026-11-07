<script setup lang="ts">
import { ui } from '~/utils/ui'

const benefits = [
  { icon: 'truck', title: 'Free Express Delivery', description: 'On orders over $99' },
  { icon: 'returns', title: '30-Day Easy Returns', description: 'A little more peace of mind' },
  { icon: 'shield', title: '2-Year Warranty', description: 'Coverage for your everyday tech' },
  { icon: 'support', title: '24/7 Expert Support', description: 'Help whenever you need it' },
] as const
</script>

<template>
  <section aria-label="Illustrative store benefits" class="border-y border-dark-border bg-dark-surface text-text-white">
    <div :class="ui.pageContainer" class="py-4 lg:py-5">
      <ul class="grid divide-y divide-dark-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        <li v-for="benefit in benefits" :key="benefit.title" class="flex items-center gap-4 py-4 sm:px-3 lg:border-r lg:border-dark-border lg:py-1 lg:last:border-r-0">
          <AppIcon :name="benefit.icon" class="size-7 shrink-0 text-text-muted" />
          <div>
            <h2 class="text-[10px] font-bold uppercase leading-normal tracking-wide">{{ benefit.title }}</h2>
            <p class="mt-1 text-[11px] leading-normal text-text-muted">{{ benefit.description }}</p>
          </div>
        </li>
      </ul>
      <p class="mt-3 text-center text-[9px] tracking-wide text-text-muted">Demo store benefits for design preview only. These are not active business offers.</p>
    </div>
  </section>
</template>
