// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-08-20',

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
