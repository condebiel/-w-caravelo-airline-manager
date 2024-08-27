<script lang="ts" setup>
import { useAttrs } from 'vue'

interface TextInputProps {
  id?: string
  label?: string
  disabled?: boolean
  placeholder?: string
}

const {
  id, label, disabled = false, placeholder,
} = defineProps<TextInputProps>()

const attrs = useAttrs()
const modelValue = defineModel<string | number>()
</script>

<template>
  <label
    :for="id"
    class="flex flex-col font-medium text-gray-700"
  >
    {{ label }}

    <input
      :id="id"
      v-bind="attrs"
      v-model="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      class="
        mt-2 rounded-lg border border-gray-300 p-3

        disabled:cursor-not-allowed disabled:bg-gray-100

        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
  </label>
</template>
