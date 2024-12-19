<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const route = useRoute()
const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
