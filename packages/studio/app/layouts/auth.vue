<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="relative z-10 bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg sm:max-w-md lg:max-w-lg">
      <div class="flex justify-center mb-6">
        <img src="/big-back3nd-logo.png" alt="Back3nd Logo" class="h-36">
      </div>

      <h2 class="text-white text-2xl font-bold text-center mb-6">
        Bem-vindo ao Back3nd
      </h2>

      <slot />
    </div>
  </div>
</template>
