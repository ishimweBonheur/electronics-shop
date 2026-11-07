<script setup lang="ts">
import { ui } from '~/utils/ui'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const input = ref<HTMLInputElement | null>(null)

watch(() => props.open, async (open) => {
  if (!open) return
  await nextTick()
  input.value?.focus()
})

async function submitSearch() {
  const term = query.value.trim()
  await navigateTo({ path: '/search', query: term ? { q: term } : {} })
  emit('close')
  await nextTick()
  document.getElementById('main-content')?.focus({ preventScroll: true })
}
</script>

<template>
  <Transition enter-active-class="motion-safe:transition motion-safe:duration-200" enter-from-class="-translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="motion-safe:transition motion-safe:duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-show="open" id="header-search" :inert="!open" class="border-t border-dark-border bg-navbar">
      <form role="search" aria-label="Header product search" class="mx-auto max-w-2xl px-4 py-5 sm:px-6" @submit.prevent="submitSearch">
        <label for="header-search-input" class="mb-2 block text-xs font-medium text-text-white">Search the demo collection</label>
        <div class="flex gap-2">
          <div class="relative min-w-0 flex-1">
            <AppIcon name="search" class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <input id="header-search-input" ref="input" v-model="query" name="q" type="search" maxlength="200" placeholder="Search products…" :class="ui.darkSearchInput">
          </div>
          <BaseButton type="submit">Search</BaseButton>
        </div>
        <p class="mt-2 text-[11px] leading-relaxed text-text-muted">Searches sample products only. Live catalog search is not connected yet.</p>
      </form>
    </div>
  </Transition>
</template>
