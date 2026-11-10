<script setup lang="ts">
import GadgetCollection from '~/components/products/GadgetCollection.vue'
definePageMeta({ path: '/deals', name: 'deals' })
useSeoMeta({ title: 'Deals', robots: 'noindex, follow' })
</script>

<template>
  <GadgetCollection eyebrow="Explore more" title="Good tech. More possibilities." description="Browse sample products while future offers are prepared. No discounts or promotions are currently active." />
</template>
