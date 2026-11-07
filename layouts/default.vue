<script setup lang="ts">
const route = useRoute()

watch(() => route.fullPath, async () => {
  await nextTick()
  document.getElementById('main-content')?.focus({ preventScroll: true })
})
</script>

<template>
  <div class="min-h-screen bg-background text-text-primary">
    <a href="#main-content" class="sr-only z-50 rounded-control bg-secondary px-4 py-3 text-text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
    <LayoutAppHeader>
      <template #announcement>
        <LayoutAnnouncementBar />
      </template>
    </LayoutAppHeader>
    <main id="main-content" tabindex="-1" class="focus:outline-none">
      <slot />
    </main>
  </div>
</template>
