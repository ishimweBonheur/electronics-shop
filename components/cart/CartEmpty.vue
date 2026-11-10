<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import PagePlaceholder from '~/components/ui/PagePlaceholder.vue'
</script>

<template>
  <PagePlaceholder eyebrow="Your cart" title="Your cart is empty." description="Shopping is not available yet. Once the collection launches, your selected items will appear here.">
    <BaseButton to="/shop">Visit the shop</BaseButton>
  </PagePlaceholder>
</template>
