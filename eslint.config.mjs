// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    'node_modules',
    '**/dist',
  ],
  rules: {
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
})
