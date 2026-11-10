<script setup lang="ts">
import GadgetCollection from '~/components/products/GadgetCollection.vue'
definePageMeta({ path: '/best-sellers', name: 'best-sellers' })
useSeoMeta({ title: 'Best Sellers', robots: 'noindex, follow' })
</script>

<template>
  <GadgetCollection eyebrow="The demo edit" title="Future favourites, all in one place." description="Explore our sample gadget selection. These products are not ranked by sales and cannot be purchased." />
</template>
