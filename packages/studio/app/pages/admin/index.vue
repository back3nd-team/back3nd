<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
})
</script>

<template>
  <UContainer class="p-6 bg-gray-100 rounded-lg shadow-md">
    <div class="flex items-center space-x-4 mb-6">
      <UIcon name="i-heroicons-light-bulb" class="w-16 h-16 text-yellow-500" />
      <span class="text-lg font-semibold text-gray-700">
        Back3nd is designed to combine robust backend architecture with the flexibility of third-party integrations. The "3" in the name is a nod to the essential role of third-party services in modern systems.
      </span>
    </div>
    <div class="flex items-center space-x-4">
      <UIcon name="i-heroicons-cube" class="h-16 w-16 text-blue-500" />
      <span class="text-lg font-semibold text-gray-700">
        Bun, Hono, Prisma, and Nuxt 4 are the four main components of Back3nd. Each component is designed to work together seamlessly, but can also be used independently.
      </span>
    </div>
  </UContainer>
</template>
