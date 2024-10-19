<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Estado para o menu mobile
const isMobileMenuOpen = ref(false)

// Instância de store e router
const authStore = useAuthStore()
const router = useRouter()

// Função para logout
function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <!-- Menu lateral (Desktop) -->
    <aside class="hidden lg:flex flex-col w-72 bg-gray-800 p-6 space-y-8 shadow-lg">
      <!-- Logotipo e título do dashboard -->
      <div class="flex items-center space-x-4">
        <img src="/big-back3nd-logo.png" alt="Back3nd Logo" class="h-10">
        <h2 class="text-2xl font-bold">
          Back3nd
        </h2>
      </div>

      <!-- Navegação lateral -->
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

      <!-- Botão de logout -->
      <UButton class="mt-auto w-full" size="md" color="red" @click="logout">
        <i class="fas fa-sign-out-alt mr-2" /> Logout
      </UButton>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="flex-1 p-10">
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-4xl font-bold">
          Dashboard
        </h1>

        <!-- Botão para abrir o menu no mobile -->
        <UButton class="lg:hidden" icon="i-heroicons-menu" @click="isMobileMenuOpen = true" />
      </header>

      <!-- Área de Conteúdo -->
      <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
        <p class="text-xl">
          Select a menu item to start managing users and tables.
        </p>
      </div>
    </main>

    <!-- Menu Mobile -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center lg:hidden">
        <div class="bg-gray-800 p-6 rounded-lg w-64 space-y-8 shadow-lg">
          <h2 class="text-2xl font-bold">
            Menu
          </h2>
          <nav>
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
          <UButton block class="w-full bg-red-500 hover:bg-red-600 transition-all duration-300" @click="logout">
            <i class="fas fa-sign-out-alt mr-2" /> Logout
          </UButton>
          <UButton block color="gray" class="w-full bg-gray-600 hover:bg-gray-700 transition-all duration-300" @click="isMobileMenuOpen = false">
            <i class="fas fa-times mr-2" /> Close
          </UButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #1e3a8a, #111827);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
