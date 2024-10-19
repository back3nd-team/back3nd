<script setup lang="ts">
definePageMeta({
  layout: 'nolayout',
  title: 'Back3nd',
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
    <div class="absolute inset-0 opacity-50" />
    <div class="relative z-10 bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
      <!-- Logotipo -->
      <div class="flex justify-center mb-6">
        <img src="/big-back3nd-logo.png" alt="Back3nd Logo" class="  animate-bounce">
      </div>

      <!-- Título da página -->
      <h1 class="text-white text-4xl font-bold mb-4">
        Back3nd
      </h1>

      <!-- Frase de efeito -->
      <p class="text-gray-300 text-xl mb-8">
        Speed and Simplicity for Your Backend
      </p>

      <!-- Botões de ação -->
      <div class="flex space-x-4">
        <UButton
          to="/auth/"
          size="xl"
          class="flex-1"
          variant="solid"
          color="primary"
        >
          Enter
        </UButton>
        <UButton color="white" variant="solid" size="xl" to="/auth/register" class="flex-1">
          Register
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Gradiente de fundo */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #1e3a8a, #111827);
}

/* Animação para o logo */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
