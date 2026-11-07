<script setup lang="ts">
import { collections } from '~/utils/collections'

const route = useRoute()
const selected = computed(() => collections.find(category => category.slug === route.query.collection))
useSeoMeta({ title: 'Categories', robots: 'noindex, follow' })
</script>

<template>
  <PagePlaceholder
    :eyebrow="selected ? `Explore ${selected.name}` : 'Explore Voltix'"
    :title="selected ? `${selected.name} is coming soon.` : 'Find your next everyday essential.'"
    description="Our collections are being prepared. The homepage imagery previews our visual direction; products are not available to purchase yet."
  />
</template>
