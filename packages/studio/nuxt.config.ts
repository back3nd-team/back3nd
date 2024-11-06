// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  future: {
    compatibilityVersion: 4,
  },
  hooks: {
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', 'nuxt-og-image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production'
        ? 'http://localhost/api'
        : process.env.NUXT_APP_API_URL || 'http://localhost:3737',
    },
  },
})
