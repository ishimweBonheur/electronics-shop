<script setup lang="ts">
import { headerLinks } from '~/utils/navigation'

const route = useRoute()

const menuOpen = ref(false)
const searchOpen = ref(false)

const menuButton = ref<HTMLButtonElement | null>(null)
const searchButton = ref<HTMLButtonElement | null>(null)

const cartCount = 0


const isMenuActive = computed(() => menuOpen.value)
const isSearchActive = computed(() => searchOpen.value)

watch(() => route.fullPath, () => {
  menuOpen.value = false
  searchOpen.value = false
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}

function toggleMenu() {
  searchOpen.value = false
  menuOpen.value = !menuOpen.value
}

function toggleSearch() {
  menuOpen.value = false
  searchOpen.value = !searchOpen.value
}

function selectMobileLink() {
  menuOpen.value = false
  menuButton.value?.focus()
}

function closePanels() {
  if (searchOpen.value) {
    searchOpen.value = false
    searchButton.value?.focus()
    return
  }
  if (menuOpen.value) {
    menuOpen.value = false
    menuButton.value?.focus()
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-navbar text-text-white"
    @keydown.esc="closePanels"
  >
    <slot name="announcement" />

    <!-- Main bar -->
    <div
      class="
        mx-auto grid h-16 max-w-none grid-cols-[1fr_auto_1fr] items-center gap-2
        px-page-mobile sm:gap-4 sm:px-page-tablet
        lg:flex lg:justify-between lg:px-page-desktop
      "
    >   
      <!-- Mobile menu toggle -->
      <button
        ref="menuButton"
        type="button"
        :aria-expanded="isMenuActive"
        aria-controls="mobile-navigation"
        :aria-label="isMenuActive ? 'Close navigation menu' : 'Open navigation menu'"
        class="
          inline-flex size-11 items-center justify-center justify-self-start
          rounded-control text-text-white
          hover:bg-dark-hover hover:text-accent
          lg:hidden
        "
        @click="toggleMenu"
      >
        <AppIcon :name="isMenuActive ? 'close' : 'menu'" class="size-5" />
      </button>

      <!-- Brand -->
      <NuxtLink
        to="/"
        aria-label="Voltix Store home"
        class="
          inline-flex shrink-0 items-center justify-self-center gap-1
          rounded-sm text-text-white sm:gap-1.5
        "
      >
        <AppIcon name="bolt" class="size-4 shrink-0 text-primary sm:size-5" />
        <span class="text-lg font-extrabold tracking-[0.04em] sm:text-xl">
          VOLTIX
        </span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav aria-label="Main navigation" class="hidden h-full lg:block">
        <ul class="flex h-full items-center gap-5 xl:gap-8">
          <li v-for="link in headerLinks" :key="link.to" class="h-full">
            <NuxtLink
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : 'false'"
              :class="[
                'inline-flex h-full items-center border-b-2 px-1 text-navigation uppercase',
                'motion-safe:transition-colors hover:text-accent',
                isActive(link.to)
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-white',
              ]"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Actions -->
      <div class="flex items-center justify-self-end gap-1 sm:gap-2">
        <button
          ref="searchButton"
          type="button"
          :aria-label="isSearchActive ? 'Close product search' : 'Open product search'"
          :aria-expanded="isSearchActive"
          aria-controls="header-search"
          class="
            inline-flex size-11 items-center justify-center
            rounded-control text-text-white
            hover:bg-dark-hover hover:text-accent
          "
          @click="toggleSearch"
        >
          <AppIcon :name="isSearchActive ? 'close' : 'search'" class="size-5" />
        </button>

        <NuxtLink
          :aria-label="`Shopping cart, ${cartCount} items`"
          to="/cart"
          class="
            relative inline-flex size-11 items-center justify-center
            rounded-control text-text-white
            hover:bg-dark-hover hover:text-accent
          "
        >
          <AppIcon name="cart" class="size-5" />
          <span
            class="
              absolute right-0.5 top-0.5 flex size-4 items-center justify-center
              rounded-full bg-primary text-[9px] font-bold tabular-nums text-navbar
            "
          >
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Overlay panels -->
    <LayoutMobileNavigation :open="menuOpen" @navigate="selectMobileLink" />
    <LayoutHeaderSearch :open="searchOpen" @close="searchOpen = false" />
  </header>
</template>