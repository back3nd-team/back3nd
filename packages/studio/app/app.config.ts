function getApiBase() {
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost'
    return isLocalhost ? 'http://localhost:3737/api/' : `${window.location.origin}/api/`
  }
  return '/api/'
}
export default defineAppConfig({
  apiBase: getApiBase(),
  ui: {
    primary: 'blue',
    secondary: 'green',
    gray: 'cool',
    button: {
      rounded: 'rounded-lg',
      default: {
        size: 'md',
        color: 'yellow',
      },

    },
    input: {
      default: {
        size: 'md',
      },
    },
    card: {
      rounded: 'rounded-xl',
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16',
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
      },
    },
    page: {
      hero: {
        wrapper: 'lg:py-24',
      },
    },
    notifications: {
      position: 'top-0 bottom-[unset]',
    },
  },
})
