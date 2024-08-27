<script lang="ts" setup>
import { computed, toRaw, ref, watch, onMounted } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import Select from 'primevue/select'

import { useFlightQuota } from '@/composables/useFlightQuota'
import TextInput from '@/components/TextInput/TextInput.vue'

const { t } = useI18n()
const { getFlightQuota, updateFlightQuota } = useFlightQuota()

const emit = defineEmits<{
  (evt: 'toggle-modal'): void
}>()
const EVENT_TOGGLE_MODAL = 'toggle-modal'

const validationSchema = toTypedSchema(
  zod.object({
    quota: zod.number().min(0).max(3),
    reason: zod.number().min(0),
  }),
)

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    quota: -1,
  },
})

const { value: quota } = useField<number>('quota')
const { value: reason } = useField<number | undefined>('reason')

const onSubmit = handleSubmit(async (values) => {
  try {
    await updateFlightQuota({ ...values })
    emit(EVENT_TOGGLE_MODAL)
  } catch (error) {
    console.log('Error updating flight quota: ', error)
  }
})

// Options for the reason select dropdown based on quota action (add/remove)
const addOptions = [
  { value: 0, label: 'Subscriber canceled flight' },
  { value: 1, label: 'Airline canceled flight' },
  { value: 2, label: 'Customer compensation' },
  { value: 3, label: 'Other' },
]

const removeOptions = [
  { value: 5, label: 'Flight not redeposited after a flight cancellation' },
  { value: 6, label: 'Subscriber had log in or password issues' },
  { value: 7, label: 'Subscriber had issues when booking' },
  { value: 8, label: 'Subscription has not renewed correctly' },
  { value: 9, label: 'Other' },
]

const reasonOptions = ref()

// Form validation
const isFormValid = computed(() => {
  return quota.value >= 0 && (reason.value !== undefined && reason.value >= 0)
})

async function fetchInitialData() {
  try {
    const data = await getFlightQuota()
    quota.value = data.quota
  } catch (error) {
    console.log('Error fetching flight quota: ', error)
    emit(EVENT_TOGGLE_MODAL)
  }
}

function incrementQuota() {
  if (quota.value < 3) {
    quota.value++
  }
}

function decrementQuota() {
  if (quota.value > 0) {
    quota.value--
  }
}

onMounted(async () => {
  await fetchInitialData()
})

watch(quota, (newValue, oldValue) => {
  // prevent set the reason options before the quota is set
  if (oldValue === -1) {
    return
  }

  // Determine if the quota is increasing or decreasing
  const isIncreasing = newValue > oldValue

  // Determine the correct options based on the quota change
  const newOptions = isIncreasing ? addOptions : removeOptions

  // Update reason options only if they have changed
  if (toRaw(reasonOptions.value) !== newOptions) {
    reason.value = undefined // Reset reason value only when switching options
    reasonOptions.value = newOptions
  }
})
</script>

<template>
  <form
    class="flex flex-col"
    @submit.prevent="onSubmit"
    @keydown.enter="onSubmit"
  >
    <div class="mb-8 flex justify-between gap-4">
      <!-- Stepper Component -->
      <div class="quota-stepper rounded-lg bg-slate-300 p-10 py-4">
        <p class="mb-4 text-center font-bold">
          {{ t('editFlights.quotaLabel') }}
        </p>
        <div class="flex items-end rounded-md bg-white p-4 pt-2">
          <Button
            class="
              h-[50px]

              disabled:!cursor-not-allowed
            "
            label="-"
            severity="secondary"
            outlined
            :disabled="quota <= 0"
            @click="decrementQuota"
          />
          <TextInput
            id="quota"
            v-model="quota"
            name="quota"
            class="w-12"
            disabled
          />
          <Button
            class="
              h-[50px]

              disabled:!cursor-not-allowed
            "
            label="+"
            severity="secondary"
            outlined
            :disabled="quota >= 3"
            @click="incrementQuota"
          />
        </div>
      </div>

      <!-- Reason Select -->
      <label
        for="reason"
        class="flex w-full flex-col py-4 text-sm font-semibold text-gray-900"
      >
        {{ t('editFlights.reasonLabel') }}

        <Select
          v-model="reason"
          name:="reason"
          role="listbox"
          :options="reasonOptions"
          :placeholder="t('editFlights.reasonPlaceholder')"
          option-label="label"
          option-value="value"
          label="What is the reason?"
          class="rounded border-solid border-1 mt-4 border-gray-900 p-2"
        />
      </label>
    </div>

    <!-- Save Button -->
    <Button
      type="submit"
      label="Save Changes"
      class="self-center"
      :disabled="!isFormValid"
    />
  </form>
</template>
