<script setup lang="ts">
/**
 * @todo Show a loading indicator until hydration is complete.
 */
import type { BreadcrumbLink } from '#ui/types'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const pageTitle = computed(() => {
  const metaTitle = route.meta.title
  return metaTitle || 'Default Title'
})
const breadcrumb = computed<BreadcrumbLink[]>(() => {
  return route.meta.breadcrumb as BreadcrumbLink[] || []
})
useHead({
  title: pageTitle,
})
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br-primary from-gray-900 to-gray-800 text-white">
    <LayoutMenuDesktop />

    <main class="flex-1 p-10">
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-4xl font-bold">
          <slot name="header">
            {{ pageTitle }}
          </slot>
        </h1>
        <UBreadcrumb :links="breadcrumb" />

        <UButton class="lg:hidden" @click="isMobileMenuOpen = true">
          <UIcon name="material-symbols:menu-rounded" class="h-6 w-6 text-white" />
        </UButton>
      </header>

      <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
        <p class="text-xl">
          <slot />
        </p>
      </div>
    </main>

    <!-- Menu Mobile -->
    <LayoutMenuMobile :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
  </div>
</template>
