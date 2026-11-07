<script setup lang="ts">
import { headerLinks } from '~/utils/navigation'
import { collections } from '~/utils/collections'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
const categoriesOpen = ref(false)

watch(() => props.open, (open) => {
  if (!open) categoriesOpen.value = false
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <Transition enter-active-class="motion-safe:transition motion-safe:duration-200" enter-from-class="-translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="motion-safe:transition motion-safe:duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <nav v-show="open" id="mobile-navigation" :inert="!open" aria-label="Mobile navigation" class="max-h-[calc(100dvh-6rem)] overflow-y-auto overflow-x-hidden border-t border-dark-border bg-navbar px-4 lg:hidden">
      <ul class="mx-auto max-w-content divide-y divide-dark-border py-2">
        <li v-for="link in headerLinks" :key="link.to">
          <div class="flex items-center">
            <NuxtLink :to="link.to" :aria-current="isActive(link.to) ? 'page' : 'false'" :class="isActive(link.to) ? 'text-primary' : 'text-text-white'" class="min-w-0 flex-1 rounded-control px-3 py-3.5 text-navigation uppercase hover:bg-dark-hover hover:text-accent" @click="emit('navigate')">
              {{ link.label }}
            </NuxtLink>
            <button v-if="link.to === '/categories'" type="button" :aria-expanded="categoriesOpen" aria-controls="mobile-categories" :aria-label="categoriesOpen ? 'Collapse categories' : 'Expand categories'" class="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-text-white hover:bg-dark-hover hover:text-accent" @click="categoriesOpen = !categoriesOpen">
              <AppIcon name="chevron-down" class="size-4 motion-safe:transition-transform" :class="categoriesOpen ? 'rotate-180' : ''" />
            </button>
          </div>
          <ul v-if="link.to === '/categories'" v-show="categoriesOpen" id="mobile-categories" :inert="!categoriesOpen" class="mb-3 ml-3 border-l border-dark-border pl-3">
            <li v-for="category in collections" :key="category.slug">
              <NuxtLink :to="`/categories?collection=${category.slug}`" :aria-current="route.path === '/categories' && route.query.collection === category.slug ? 'page' : 'false'" :class="route.path === '/categories' && route.query.collection === category.slug ? 'text-primary' : 'text-text-muted'" class="block rounded-control px-3 py-3 text-xs hover:bg-dark-hover hover:text-accent" @click="emit('navigate')">
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </Transition>
</template>
