import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom/matchers'
import { config } from '@vue/test-utils'
import { defaultOptions } from 'primevue/config'

// Mocking PrimeVue
config.global.mocks['$primevue'] = {
  config: defaultOptions,
}

expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
