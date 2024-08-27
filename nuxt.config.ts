import Aura from '@primevue/themes/aura'

import { DEFAULT_LOCALE, LOCALE_LABELS } from './i18n.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-27',

  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', type: 'image/png', href: 'favicon/180x180.png' },
        { rel: 'icon', type: 'image/png', href: 'favicon/32x32.png' },
        { rel: 'icon', type: 'image/png', href: 'favicon/192x192.png' },
      ],
    },
  },

  css: [
    'primeicons/primeicons.css',
    '~/assets/styles/base.css',
    'notivue/notification.css',
    'notivue/animations.css',
  ],

  devtools: {
    enabled: true,
  },

  modules: [
    '@vee-validate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    'notivue/nuxt',
  ],

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [LOCALE_LABELS.EN, LOCALE_LABELS.ES],
    vueI18n: './i18n.config.ts',
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'always-multiline',
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '',
        },
      },
    },
  },

  notivue: {
    position: 'bottom-right',
    limit: 4,
    enqueue: true,
    avoidDuplicates: false,
    notifications: {
      global: {
        duration: 5000,
      },
    },
  },
})
