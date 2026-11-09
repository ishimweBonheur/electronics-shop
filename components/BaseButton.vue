<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { NuxtLink } from '#components'

type Variant = 'primary' | 'secondary' | 'outline' | 'dark-outline' | 'light-outline' | 'ghost' | 'danger'
type Size = 'small' | 'medium' | 'large'

withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  loadingLabel?: string
  to?: RouteLocationRaw
}>(), {
  variant: 'primary',
  size: 'medium',
  type: 'button',
  loading: false,
  disabled: false,
  loadingLabel: 'Loading',
  to: undefined,
})

const darkOutline = ' bg-transparent text-text-white hover:bg-dark-surface disabled:hover:bg-transparent'
const variants: Record<Variant, string> = {
  primary: ' bg-primary text-text-white hover:bg-primary-hover disabled:hover:bg-primary',
  secondary: ' bg-secondary text-text-white hover:bg-secondary-hover disabled:hover:bg-secondary',
  outline: darkOutline,
  'dark-outline': darkOutline,
  'light-outline': 'bg-transparent text-text-primary hover:bg-surface-hover disabled:hover:bg-transparent',
  ghost: ' bg-transparent text-inherit hover:bg-primary/10 disabled:hover:bg-transparent',
  danger: ' bg-error text-text-white hover:bg-error-hover disabled:hover:bg-error',
}

const sizes: Record<Size, string> = {
  small: 'min-h-11 gap-1.5 px-3 py-2 text-button',
  medium: 'min-h-12 gap-2 px-4 py-2.5 text-button',
  large: 'min-h-[3.25rem] gap-2.5 px-6 py-3 text-button-lg',
}
</script>

<template>
  <component
    :is="to && !disabled && !loading ? NuxtLink : 'button'"
    :to="to && !disabled && !loading ? to : undefined"
    :type="to && !disabled && !loading ? undefined : type"
    :disabled="to && !disabled && !loading ? undefined : disabled || loading"
    :aria-busy="loading || undefined"
    :class="[variants[variant], sizes[size]]"
    class="inline-flex max-w-full items-center justify-center rounded-control font-bold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50"
  >
    <svg
      v-if="loading"
      aria-hidden="true"
      class="size-4 shrink-0 motion-safe:animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle class="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" />
      <path class="opacity-75" d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-else-if="$slots['icon-left']" aria-hidden="true" class="inline-flex shrink-0 [&>svg]:size-4">
      <slot name="icon-left" />
    </span>
    <slot />
    <span v-if="loading" class="sr-only" role="status">{{ loadingLabel }}</span>
    <span v-if="$slots['icon-right']" aria-hidden="true" class="inline-flex shrink-0 [&>svg]:size-4">
      <slot name="icon-right" />
    </span>
  </component>
</template>
