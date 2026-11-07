<script setup lang="ts">
import { ui } from '~/utils/ui'

defineProps<{ eyebrow: string, title: string, description: string }>()
</script>

<template>
  <section :class="[ui.pageContainer, ui.section]" class="min-h-[60vh] bg-background text-text-primary">
    <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-hover">{{ eyebrow }}</p>
    <h1 class="max-w-2xl">{{ title }}</h1>
    <p class="mt-5 max-w-lg text-text-secondary">{{ description }}</p>
    <div class="mt-8"><slot /></div>
    <BaseButton to="/" variant="light-outline" class="mt-8">Back to home</BaseButton>
  </section>
</template>
