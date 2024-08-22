import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'

import Index from './index.vue'

describe('Given an Index component tested with vue-test-utils', () => {
	describe('When it\'s mounted', () => {
		it('Then renders H1 text properly', () => {
			const wrapper = mount(Index)
			expect(wrapper.text()).toContain('Nuxt3 Boilerplate')
		})
	})
})

describe('Given an Index component tested with testing-library', () => {
	describe('When it\'s mounted', () => {
		it('Then renders H1 text properly', () => {
			const { getByText } = render(Index)
			expect(getByText('This is a simple Nuxt3 Boilerplate')).toBeInTheDocument()
		})
	})
})
