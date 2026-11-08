
<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    mobileMessage?: string
  }>(),
  {
    message:
      'FREE EXPRESS SHIPPING ON ORDERS OVER $99 | 30-DAY EASY RETURNS',
    mobileMessage: 'FREE SHIPPING OVER $99',
  }
)
</script>

<template>
  <div
    role="region"
    aria-label="Store announcements"
    class="relative flex min-h-8 items-center overflow-hidden border-b border-dark-border bg-announcement py-2 font-medium uppercase text-text-muted"
  >
    <p class="sr-only">
      <span class="sm:hidden">{{ mobileMessage }}</span>
      <span class="hidden sm:inline">{{ message }}</span>
    </p>
    <div
      aria-hidden="true"
      class="flex w-max shrink-0 animate-marquee items-center will-change-transform"
    >
      <div
        v-for="index in 2"
        :key="index"
        class="flex shrink-0 items-center"
        :aria-hidden="index === 2 ? 'true' : undefined"
      >
        <template v-for="item in 4" :key="item">
          <span
            class="mx-8 whitespace-nowrap text-[10px] tracking-[0.12em] sm:mx-12 sm:text-xs"
          >
            <span class="sm:hidden">
              {{ mobileMessage }}
            </span>

            <span class="hidden sm:inline">
              {{ message }}
            </span>
          </span>

          <span class="text-primary" aria-hidden="true">
            ✦
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
