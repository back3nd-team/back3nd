<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Softagon Sistemas',
  meta: [
    { name: 'description', content: 'Softagon Sistemas - Soluções inovadoras para gestão pública e privada.' },
    { name: 'keywords', content: 'Softagon, Sistemas, Gestão, Pública, Privada, Inovação, Tecnologia' },
    { name: 'author', content: 'Softagon Sistemas' },
    { property: 'og:title', content: 'Softagon Sistemas' },
    { property: 'og:description', content: 'Softagon Sistemas - Soluções inovadoras para gestão pública e privada.' },
    { property: 'og:image', content: 'https://softagon.com.br/images/logos/softagon-sistemas-logo.svg' },
    { property: 'og:url', content: 'https://softagon.com.br' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Softagon Sistemas' },
    { name: 'twitter:description', content: 'Softagon Sistemas - Soluções inovadoras para gestão pública e privada.' },
    { name: 'twitter:image', content: 'https://softagon.com.br/images/logos/softagon-sistemas-logo.svg' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'apple-touch-icon', href: '/softagon.svg' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
})
</script>

<template>
  <v-app>
    <v-main>
      <AppLayout />
    </v-main>
  </v-app>
</template>
