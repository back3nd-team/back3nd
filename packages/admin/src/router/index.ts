/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from '@/stores/AuthStore'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes as originalRoutes } from 'vue-router/auto-routes'

// Add layout metadata to routes
const routes = originalRoutes.map((route) => {
  if (route.path.startsWith('/auth')) {
    route.meta = { ...(route.meta || {}), layout: 'auth' }
  }
  else {
    route.meta = { ...(route.meta || {}), layout: 'default' }
  }
  return route
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Ensure to use the list of routes with updated metadata
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.warn('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
    else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  }
  else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if the user is not authenticated
  if (!authStore.isAuthenticated) {
    // Allow access to /auth route without redirecting repeatedly
    if (to.path === '/auth' || to.path === '/auth/') {
      next() // Allow navigation to the authentication route
    }
    else {
      next('/auth') // Redirect to the authentication page
    }
  }
  // Prevent authenticated users from accessing authentication routes
  else if (to.path.startsWith('/auth')) {
    next('/') // Redirect to the home page
  }
  // Allow navigation to other routes
  else {
    next()
  }
})

export default router
