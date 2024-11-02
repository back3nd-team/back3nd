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
      <LayoutMenuItems />
    </nav>

    <LayoutMenuSettings />
  </aside>
</template>
