import { render as VTLrender } from '@testing-library/vue'
import type { RenderOptions } from '@testing-library/vue'
import { vi } from 'vitest'
import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE } from '@/i18n.config'
import localesEN from '@/locales/en'
import localesES from '@/locales/es'

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  messages: {
    en: localesEN,
    es: localesES,
  },
})

// Mocking $fetch to prevent warnings
vi.stubGlobal('$fetch', () => vi.fn())

export function render(component: unknown, options?: RenderOptions<unknown>) {
  const defaultOptions = {
    props: {
      ...options?.props,
    },
    slots: {
      ...options?.slots,
    },
  }

  return VTLrender(component, {
    global: {
      ...(options?.global?.stubs && {
        stubs: options?.global?.stubs,
      }),
      plugins: [
        i18n,
        ...(options?.global?.plugins || []),
      ],
    },
    ...defaultOptions,
  })
}
