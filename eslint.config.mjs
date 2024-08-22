// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

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
			'style/brace-style': 'off',
			/**
			 *typescript-eslint
				*/
			'@typescript-eslint/brace-style': 'off',
			/**
			 * test
			 */
			'test/prefer-lowercase-title': 'off',
			/**
			 * vue
			 */
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
		},
	},
);
