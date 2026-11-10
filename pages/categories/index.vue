<script setup lang="ts">
import CategoryCollection from '~/components/categories/CategoryCollection.vue'
import { collections } from '~/utils/categories/collections'

definePageMeta({ path: '/categories', name: 'categories' })

const route = useRoute()
const selected = computed(() => collections.find(category => category.slug === route.query.collection))
useSeoMeta({ title: 'Categories', robots: 'noindex, follow' })
</script>

<template>
  <CategoryCollection :selected="selected" />
</template>
