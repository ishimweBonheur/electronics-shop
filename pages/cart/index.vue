<script setup lang="ts">
import CartEmpty from '~/components/cart/CartEmpty.vue'
definePageMeta({ path: '/cart', name: 'cart' })
useSeoMeta({ title: 'Your cart', robots: 'noindex, follow' })
</script>

<template>
  <CartEmpty />
</template>
