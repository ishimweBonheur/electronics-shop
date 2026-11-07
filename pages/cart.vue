<script setup lang="ts">
useSeoMeta({ title: 'Your cart', robots: 'noindex, follow' })
</script>

<template>
  <PagePlaceholder eyebrow="Your cart" title="Your cart is empty." description="Shopping is not available yet. Once the collection launches, your selected items will appear here.">
    <BaseButton to="/shop">Visit the shop</BaseButton>
  </PagePlaceholder>
</template>
