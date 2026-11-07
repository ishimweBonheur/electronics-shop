<script setup lang="ts">
withDefaults(defineProps<{ message?: string, mobileMessage?: string }>(), {
  message: 'FREE EXPRESS SHIPPING ON ORDERS OVER $99 | 30-DAY EASY RETURNS',
  mobileMessage: 'FREE SHIPPING OVER $99',
})
</script>

<template>
  <div class="flex min-h-8 items-center justify-center gap-3 border-b border-dark-border bg-announcement px-4 py-1.5 text-center font-medium uppercase text-text-muted">
    <p class="text-[9px] leading-relaxed tracking-[0.08em] sm:text-[10px] sm:tracking-[0.12em]">
      <span class="sm:hidden">{{ mobileMessage }}</span>
      <span class="hidden sm:inline">{{ message }}</span>
    </p>
    <span class="shrink-0 rounded-sm border border-dark-border px-1 py-0.5 text-[7px] tracking-wider" title="Illustrative demo offer only">Demo<span class="sr-only"> offer only</span></span>
  </div>
</template>
