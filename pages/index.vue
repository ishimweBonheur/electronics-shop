<script setup lang="ts">
const title = 'Voltix Store | Premium Electronics'
const description = 'Discover premium electronics, smart devices, and everyday tech essentials at Voltix Store.'
const config = useRuntimeConfig()
// Serialize the public site address so SSR and client hydration use the same URL.
const configuredSiteUrl = useState('production-site-url', () => config.public.siteUrl || (import.meta.server ? config.siteUrl : ''))
// Never publish a canonical for localhost or the example domain.
const siteUrl = computed(() => {
  try {
    const url = new URL(configuredSiteUrl.value)
    if (!['https:', 'http:'].includes(url.protocol) || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.hostname.endsWith('.example')) return undefined
    return url.origin
  }
  catch {
    return undefined
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage: () => siteUrl.value ? `${siteUrl.value}/images/voltix-dark-hero.webp` : undefined,
  ogImageAlt: 'Black headphones illuminated by electric blue studio lights for Voltix Store',
  ogImageWidth: 1536,
  ogImageHeight: 1024,
})

useHead(() => ({
  titleTemplate: null,
  link: siteUrl.value ? [{ rel: 'canonical', href: `${siteUrl.value}/` }] : [],
}))
</script>

<template>
  <div>
    <HomeHero />
    <HomeBenefits />
    <div class="bg-surface text-text-primary">
      <HomeCategories />
    </div>
    <div class="bg-background text-text-primary">
      <HomeBestSellers />
    </div>
  </div>
</template>
