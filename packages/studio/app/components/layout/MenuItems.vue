<script setup lang="ts">
const apiBase = useApiClient.getBaseURL()
</script>

<template>
  <ul class="space-y-4">
    <li>
      <NuxtLink to="/admin/users/" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
        <i class="fas fa-users mr-2" /> Users
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/admin/collections/" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
        <i class="fas fa-table mr-2" /> Collections
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/admin/editor/" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
        <i class="fas fa-table mr-2" /> Schema Prisma
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="`${apiBase}docs/swagger`" target="_blank" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
        <i class="fas fa-table mr-2" /> API Doc´s
      </NuxtLink>
    </li>
  </ul>
</template>
