import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1e3a8a',
        secondary: '#111827',
      },
      backgroundImage: {
        'gradient-to-br-primary': 'linear-gradient(to bottom right, #1e3a8a, #111827)',
      },
    },
  },
}
