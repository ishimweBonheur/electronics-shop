<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { useScrollAnimation } from '~/composables/ui/useScrollAnimation'
import { ui } from '~/utils/ui'

const scrollRoot = ref<HTMLElement | null>(null)
useScrollAnimation(scrollRoot)

defineProps<{ eyebrow: string, title: string, description: string }>()
</script>

<template>
  <section ref="scrollRoot" :class="[ui.pageContainer, ui.section]" class="relative isolate min-h-[60vh] bg-background text-text-primary">
    <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-hover">{{ eyebrow }}</p>
    <h1 data-scroll="fade-up" class="max-w-2xl">{{ title }}</h1>
    <p data-scroll="fade-up" class="mt-5 max-w-lg text-text-secondary">{{ description }}</p>
    <div class="mt-8"><slot /></div>
    <BaseButton to="/" variant="light-outline" class="mt-8">Back to home</BaseButton>
  </section>
</template>
