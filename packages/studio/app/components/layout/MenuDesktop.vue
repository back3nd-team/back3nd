<script setup lang="ts">

</script>

<template>
  <aside class="hidden lg:flex flex-col w-72 bg-gray-800 p-6 space-y-8 shadow-lg">
    <div class="flex items-center space-x-4">
      <img src="/big-back3nd-logo.png" alt="Back3nd Logo" class="h-10">
      <h2 class="text-2xl font-bold">
        Back3nd
      </h2>
    </div>

    <nav class="flex-1">
      <ul class="space-y-4">
        <li>
          <NuxtLink to="/admin/users" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
            <i class="fas fa-users mr-2" /> Users
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/tables" class="block py-3 px-5 rounded bg-gray-700 hover:bg-yellow-500 transition-all duration-300">
            <i class="fas fa-table mr-2" /> Tables
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <LayoutMenuSettings />
  </aside>
</template>
