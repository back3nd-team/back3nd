import { createVuetify, type ThemeDefinition } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const back3nd: ThemeDefinition = {
  dark: true, // Tema definido como dark
  colors: {
    'background': '#111827', // Fundo
    'surface': '#1e293b', // Superfície
    'primary': '#1e3a8a', // Azul
    'primary-lighten-1': '#345dad', // Azul claro para contraste
    'secondary': '#fbbf24', // Amarelo vibrante
    'secondary-darken-1': '#c8871e', // Amarelo escuro
    'error': '#ef4444',
    'info': '#3b82f6',
    'success': '#10b981',
    'warning': '#f59e0b',
  },
}

export default createVuetify({
  defaults: {
    VTextField: {
      variant: 'solo-filled',
    },
    VSelect: {
      variant: 'solo-filled',
    },
    VCombobox: {
      variant: 'solo-filled',
    },
    VAutocomplete: {
      variant: 'solo-filled',
    },
    VTextarea: {
      variant: 'solo-filled',
    },
    VFileInput: {
      variant: 'solo-filled',
    },
    VBtn: {
      variant: 'tonal',
    },
  },
  theme: {
    defaultTheme: 'back3nd',
    themes: {
      back3nd,
    },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 1,
    },

  },
})
