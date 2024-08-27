import { afterEach, describe, it, expect, vi } from 'vitest'

import { flushPromises } from '@vue/test-utils'
import { fireEvent } from '@testing-library/vue'

import EditFlightQuotaForm from './EditFlightQuotaForm.vue'

import { render } from '@/test/testUtils'

// Mocking the composable useFlightQuota
vi.mock('@/composables/useFlightQuota', () => ({
  useFlightQuota: () => ({
    getFlightQuota: vi.fn().mockResolvedValue({ quota: 2 }),
    updateFlightQuota: vi.fn(),
  }),
}))

describe('Given the EditFlightForm component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('When the form is mounted', () => {
    it('Then the quota stepper should render with initial value', () => {
      const { getByRole } = render(EditFlightQuotaForm)
      const quotaInput = getByRole('textbox') as HTMLInputElement

      expect(quotaInput.value).toBe('-1')
    })

    it('Then the reason dropdown should be empty initially', async () => {
      const { getAllByRole } = render(EditFlightQuotaForm)
      const reasonDropdown = getAllByRole('combobox')[0] as HTMLSelectElement
      expect(reasonDropdown.value).toBe(undefined)
    })
  })

  describe('When the quota is incremented', () => {
    it('Then the quota should be incremented by one', async () => {
      const { getByLabelText, getByRole } = render(EditFlightQuotaForm)

      const quotaInput = getByRole('textbox') as HTMLInputElement

      await flushPromises()

      // initial value
      expect(quotaInput).toHaveValue('2')

      const incrementButton = getByLabelText('+')
      await fireEvent.click(incrementButton)

      expect(quotaInput).toHaveValue('3')
    })

    it('Then it should not allow quota to go above 3', async () => {
      const { getByLabelText, getByRole } = render(EditFlightQuotaForm)

      const quotaInput = getByRole('textbox') as HTMLInputElement

      await flushPromises()

      // initial value
      expect(quotaInput).toHaveValue('2')

      const incrementButton = getByLabelText('+')

      // Click increment button multiple times
      await fireEvent.click(incrementButton)
      await fireEvent.click(incrementButton)
      await fireEvent.click(incrementButton)

      await flushPromises()

      expect(quotaInput).toHaveValue('3')
      expect(incrementButton).toBeDisabled()
    })

    it('Then the reason options should update to "addOptions"', async () => {
      const { getByText, getByLabelText, getAllByRole } = render(EditFlightQuotaForm)

      const incrementButton = getByLabelText('+')
      await fireEvent.click(incrementButton)

      const reasonDropdown = getAllByRole('combobox')[0] as HTMLSelectElement

      // open the dropdown
      await fireEvent.click(reasonDropdown)

      // Verify that the addOptions are displayed
      expect(getByText('Customer compensation')).toBeInTheDocument()
    })
  })

  describe('When the quota is decremented', () => {
    it('Then the quota should be decremented by one', async () => {
      const { getByLabelText, getByRole } = render(EditFlightQuotaForm)

      const quotaInput = getByRole('textbox') as HTMLInputElement

      await flushPromises()

      // initial value
      expect(quotaInput).toHaveValue('2')

      const decrementButton = getByLabelText('-')
      await fireEvent.click(decrementButton)

      expect(quotaInput).toHaveValue('1')
    })

    it('Then it should not allow quota to go below 0', async () => {
      const { getByLabelText, getByRole } = render(EditFlightQuotaForm)

      const quotaInput = getByRole('textbox') as HTMLInputElement

      await flushPromises()

      // initial value
      expect(quotaInput).toHaveValue('2')

      const decrementButton = getByLabelText('-')

      // Click increment button multiple times
      await fireEvent.click(decrementButton)
      await fireEvent.click(decrementButton)
      await fireEvent.click(decrementButton)

      await flushPromises()

      expect(quotaInput).toHaveValue('0')
      expect(decrementButton).toBeDisabled()
    })

    it('Then the reason options should update to "removeOptions"', async () => {
      const { getByText, getByLabelText, getAllByRole } = render(EditFlightQuotaForm)

      await flushPromises()

      const decrementButton = getByLabelText('-')
      await fireEvent.click(decrementButton)

      const reasonDropdown = getAllByRole('combobox')[0] as HTMLSelectElement

      // open the dropdown
      await fireEvent.click(reasonDropdown)
      expect(getByText('Subscriber had issues when booking')).toBeInTheDocument()
    })
  })

  describe('When a reason is selected and quota is changed', () => {
    it('Then the save button should be enabled', async () => {
      const { getByText, getByLabelText, getAllByRole, getByRole } = render(EditFlightQuotaForm)

      const saveButton = getByRole('button', { name: 'Save Changes' })
      expect(saveButton).toBeDisabled()

      const incrementButton = getByLabelText('+')
      await fireEvent.click(incrementButton)

      expect(saveButton).toBeDisabled()

      const reasonDropdown = getAllByRole('combobox')[0] as HTMLSelectElement

      // open the dropdown
      await fireEvent.click(reasonDropdown)

      await fireEvent.click(getByText('Customer compensation'))

      expect(saveButton).not.toBeDisabled()
    })
  })
})
