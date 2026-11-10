<script setup lang="ts">
import GadgetCollection from '~/components/products/GadgetCollection.vue'
definePageMeta({ path: '/new-arrivals', name: 'new-arrivals' })
useSeoMeta({ title: 'New Arrivals', robots: 'noindex, follow' })
</script>

<template>
  <GadgetCollection eyebrow="Discover the collection" title="Meet your next everyday essential." description="Preview our sample gadgets while the new arrivals collection is prepared. No live inventory is connected." />
</template>
