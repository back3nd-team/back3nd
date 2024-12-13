<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const drawer = ref(false)
const menu = ref(false) // Dropdown menu state
const router = useRouter()
const authStore = useAuthStore()

// Get the logged-in user from the store
const user = computed(() => authStore?.user)

function logout() {
  console.warn('User logged out')
  authStore.logout()  
  router.replace('/auth/')  
}

// Checks if the link is external
function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

// Dynamic navigation
function navigateTo(route: string) {
  if (isExternalLink(route)) {
    console.warn(`Opening external link: ${route}`)
    window.open(route, '_blank') // Opens in a new window
  } else {
    console.warn(`Navigating to internal route: ${route}`)
    router.push(route) // Navigates internally
  }
}

const items = ref([
  { title: 'Organizations', icon: 'mdi-home', route: '/' },
  { title: 'Auth Specs', icon: 'mdi-information', route: 'http://localhost:3737/auth/reference' },
  { title: 'Postgrest', icon: 'mdi-phone', route: '/postgrest' },
])
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Back3nd Control Panel</v-toolbar-title>
        <v-spacer />

        <v-menu v-model="menu" location="end">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-tooltip-account" variant="text" v-bind="props" />
          </template>
          <v-card min-width="250">
            <v-list>
              <v-list-item
               v-if="authStore.user"
                :prepend-avatar="user?.image"
                :subtitle="user.email"
                :title="user.name"
              ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item @click="logout">
                <template #prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="navigateTo(item.route)"
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <v-layout>
            <slot />
          </v-layout>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
