import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent } from '@testing-library/vue'

import TextInput from './TextInput.vue'
import { render } from '@/test/testUtils'

describe('Given the TextInput component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('When a placeholder is provided', () => {
    it('Then it should render the input with the provided placeholder', () => {
      const placeholder = 'Enter your name'
      const { getByPlaceholderText } = render(TextInput, {
        props: {
          placeholder,
        },
      })

      const input = getByPlaceholderText(placeholder)

      // Assert that the input element has the correct placeholder
      expect(input).toBeTruthy()
    })
  })

  describe('When the input value changes', () => {
    it('Then it should update the model value', async () => {
      const placeholder = 'Enter your name'
      const { emitted, getByPlaceholderText } = render(TextInput, {
        props: {
          placeholder,
        },
      })

      const input = getByPlaceholderText(placeholder)
      const newValue = 'New Value'

      // Set the input value
      await fireEvent.update(input, newValue)

      // Assert that the model value is updated correctly
      expect(emitted<string>()['update:modelValue'][0][0]).toBe(newValue)
    })
  })

  describe('When a label is provided', () => {
    it('Then it should render the input with the provided label', async () => {
      const label = 'input label'
      const { getByLabelText } = render(TextInput, {
        props: {
          id: 'input-id',
          label,
        },
      })

      const input = getByLabelText(label)

      expect(input).toBeInTheDocument()
    })
  })
})
