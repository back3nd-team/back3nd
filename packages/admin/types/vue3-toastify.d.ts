import 'vue3-toastify'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    toast: typeof import('vue3-toastify').toast
  }
}

declare global {
  const toast: typeof import('vue3-toastify').toast
}

export {}
