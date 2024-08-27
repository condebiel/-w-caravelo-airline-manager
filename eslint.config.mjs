// @ts-check
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import vuea11y from 'eslint-plugin-vuejs-accessibility'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      /*
       * base
       */
      'no-mixed-operators': 'off',
      'no-console': 'warn',
      'curly': 'off',
      /**
       * style
       */
      '@stylistic/brace-style': 'off',
      /**
       * typescript-eslint
       */
      '@typescript-eslint/brace-style': 'off',
      /**
       * test
       */
      'test/prefer-lowercase-title': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    plugins: {
      'vuejs-accessibility': vuea11y,
      'readable-tailwind': eslintPluginReadableTailwind,
    },
    rules: {
      /*
       * vue
       */
      ...eslintPluginReadableTailwind.configs.warning.rules,
      // enable all recommended rules to error
      ...eslintPluginReadableTailwind.configs.error.rules,
      ...vuea11y.configs.recommended.rules,
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/max-len': [
        'error',
        {
          code: 90,
          template: 120,
          ignoreComments: true,
          ignoreHTMLAttributeValues: true,
          ignoreStrings: true,
          ignoreHTMLTextContents: true,
          ignorePattern: '^import .*',
        },
      ],

      /**
       * vuejs-accessibility
       */
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: ['VLabel'],
          controlComponents: ['VInput'],
          required: {
            every: ['nesting', 'id'],
          },
          allowChildren: false,
        },
      ],
      'vuejs-accessibility/no-static-element-interactions': 'off',
    },
  },
)
