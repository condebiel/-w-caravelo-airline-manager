import { describe, it, expect } from 'vitest'

import UserProfileHeader from './UserProfileHeader.vue'
import { render } from '@/test/testUtils'

describe('Given the UserProfileHeader page component', () => {
  describe('When it\'s mounted', () => {
    it('Then renders H1 text properly', () => {
      const { getByText } = render(UserProfileHeader)

      expect(getByText('Client Profile')).toBeInTheDocument()
    })
  })

  describe('When user click Edit Flight button', () => {
    it('Then toggle-modal event is emmited', () => {
      const { getByText, emitted } = render(UserProfileHeader)

      getByText('Edit Flights').click()

      expect(emitted()).toHaveProperty('toggle-modal')
    })
  })
})
