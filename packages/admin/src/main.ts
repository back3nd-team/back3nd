/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
// Composables
import { createApp } from 'vue'
import Vue3Toastify from 'vue3-toastify'
// Components
import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'

const app = createApp(App)
const head = createHead()
const pinia = createPinia()
registerPlugins(app)
app.use(Vue3Toastify, {
  autoClose: 3000,
  transition: 'flip',
  theme: 'colored',
})
app.use(head)
app.use(pinia)
app.use(router)
app.mount('#app')
