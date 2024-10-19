<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUserData()
  }
})
</script>

<template>
  <div>
    {{ authStore }}
    <h1>Dashboard</h1>
    <p>Welcome, {{ authStore.user?.name }}</p>
    <p>Email: {{ authStore.user?.email }}</p>
  </div>
</template>
