<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon-48x48.png', type: 'image/png' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  titleTemplate: '%s - Back3nd: Power and Speed for Your Backend',
  ogImage: '/apple-touch-icon.png',
  twitterImage: '/apple-touch-icon.png',
  twitterCard: 'summary_large_image',
  ogTitle: 'Back3nd: Power and Speed for Your Backend',
  ogDescription: 'A cutting-edge platform delivering simplicity, speed, and flexibility for backend development.',
  twitterTitle: 'Back3nd: Power and Speed for Your Backend',
  twitterDescription: 'Experience the next generation of backend management with Back3nd.',
})
</script>

<template>
  <div class="bg-gradient-to-br-primary">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
