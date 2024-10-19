<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()
const router = useRouter()

const showSettings = ref(false)

function toggleSettings() {
  showSettings.value = !showSettings.value
}
const accountLinks = [
  {
    label: 'Profile',
    icon: 'lets-icons:user-duotone-line',
    to: '/admin/profile',
  },
  {
    label: 'Logout',
    icon: 'lets-icons:sign-out-circle',
    action: logout,
  },
]

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <UButton
    icon="lets-icons:setting-vert"
    size="sm"
    color="primary"
    variant="outline"
    label="Settings"
    :trailing="false"
    @click="toggleSettings"
  />
  <transition name="expand" mode="out-in">
    <UVerticalNavigation v-if="showSettings" :links="accountLinks" class="mt-2" />
  </transition>
</template>

<style>
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter, .expand-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>
