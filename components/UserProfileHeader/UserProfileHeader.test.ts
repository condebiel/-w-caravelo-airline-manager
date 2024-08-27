import { describe, it, expect } from 'vitest'

import { fireEvent } from '@testing-library/vue'
import UserProfileHeader from './UserProfileHeader.vue'

import { render } from '@/test/testUtils'

describe('Given the UserProfileHeader page component', () => {
  describe('When it\'s mounted', () => {
    it('Then renders H1 text properly', () => {
      const { getByText } = render(UserProfileHeader)

      expect(getByText('Client Profile')).toBeInTheDocument()
    })
  })

  describe('When user click on Edit Flight button', () => {
    it('Then modal is rendered and user can see the modal title', async () => {
      const { getByText } = render(UserProfileHeader)

      await fireEvent.click(getByText('Edit Flights'))

      expect(getByText('Edit Profile')).toBeInTheDocument()
    })
  })
})
