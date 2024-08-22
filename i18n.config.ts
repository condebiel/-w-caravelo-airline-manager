import localesEN from './locales/en'
import localesES from './locales/es'

export const DEFAULT_LOCALE = 'en'

export const LOCALE_LABELS = {
	EN: 'en',
	ES: 'es',
}

export default {
	legacy: false,
	strategy: 'prefix_except_default',
	messages: {
		en: localesEN,
		es: localesES,
	},
}
