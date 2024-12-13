// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  extends: [
    'plugin:vuetify/base', 
  ],
  plugins: [
    'vuetify', 
  ],
  rules: {
    'node/prefer-global/process': 'off',
    'vue/valid-v-slot': 'off',

    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-deprecated-classes': 'warn',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vuetify/no-deprecated-classes': 'error',
      },
    },
  ],
})
