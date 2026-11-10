<script setup lang="ts">
import GadgetCollection from '~/components/products/GadgetCollection.vue'
definePageMeta({ path: '/products', name: 'products' })
useSeoMeta({ title: 'Shop', robots: 'noindex, follow' })
</script>

<template>
  <GadgetCollection eyebrow="Explore Voltix"  
  title="Made for your everyday."
   description="" />
</template>
