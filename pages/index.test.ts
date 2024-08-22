import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'

import Index from './index.vue'
import { render } from '@/test/testUtils'

describe('Given the Index page component', () => {
  describe('When it\'s mounted', () => {
    it('Then renders H1 text properly', () => {
      const { getByText } = render(Index)

      expect(getByText('Client Profile')).toBeInTheDocument()
    })
  })

  describe('When user click Edit Flight button', () => {
    it('Then modal title is visible', async () => {
      const { getByRole, getByText } = render(Index)

      const button = getByRole('button', { name: 'Edit Flights' })
      await fireEvent.click(button)

      expect(getByText('bla bla bla')).toBeInTheDocument()
    })
  })
})
