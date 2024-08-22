// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-08-20',

	app: {
		head: {
			link: [
				{ rel: 'apple-touch-icon', type: 'image/png', href: 'favicon/180x180.png' },
				{ rel: 'icon', type: 'image/png', href: 'favicon/32x32.png' },
				{ rel: 'icon', type: 'image/png', href: 'favicon/192x192.png' },
			],
		},
	},

	css: ['~/assets/styles/base.css'],

	devtools: { enabled: true },

	modules: [
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@nuxt/test-utils/module',
	],

	eslint: {
		config: {
			stylistic: {
				commaDangle: 'always-multiline',
				indent: 'tab',
				quotes: 'single',
				semi: false,
			},
		},
	},
})
