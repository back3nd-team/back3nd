<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => {
  const metaTitle = route.meta.title
  return metaTitle || 'Studio'
})

useHead({
  title: pageTitle,
})
</script>

<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>
