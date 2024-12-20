<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const menu = ref(false) // Dropdown menu state
const router = useRouter()
const authStore = useAuthStore()
const betteAuth = import.meta.env.VITE_AUTH_API_URL
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
  }
  else {
    console.warn(`Navigating to internal route: ${route}`)
    router.push(route) // Navigates internally
  }
}

// Menu structure with dynamic groups
const menuGroups = ref([
  {
    title: 'Better Auth',
    items: [
      { title: 'Organizations', route: '/' },
      { title: 'Users', route: '/organization/users' },
      { title: 'Auth Specs', route: `${betteAuth}/auth/reference` },
    ],
  },
  {
    title: 'PostgRest',
    items: [
      { title: 'Collections', route: '/postgrest' },
      { title: 'Swagger API', route: '/postgrest/swagger' },
    ],
  },
  {
    title: 'Files',
    items: [
      { title: 'Files', route: '/files' },
    ],
  },
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
          <template #activator="{ props }">
            <v-btn icon="mdi-tooltip-account" variant="text" v-bind="props" />
          </template>
          <v-card min-width="250">
            <v-list>
              <v-list-item
                v-if="authStore.user"
                :prepend-avatar="user?.image"
                :subtitle="user.email"
                :title="user.name"
              />
            </v-list>

            <v-divider />

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
          <template v-for="group in menuGroups" :key="group.title">
            <v-list-subheader>{{ group.title }}</v-list-subheader>
            <v-list-item
              v-for="item in group.items"
              :key="item.title"
              @click="navigateTo(item.route)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-divider />
          </template>
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
