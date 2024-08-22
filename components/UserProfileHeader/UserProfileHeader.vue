<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits<{
  (evt: 'toggle-modal', data: string[]): void
}>()

function toggleModal() {
  emit('toggle-modal')
}
</script>

<template>
  <div
    class="
      mb-10 grid grid-cols-1 gap-8

      md:grid-cols-2
    "
  >
    <h1 class="text-2xl font-bold text-gray-900">
      {{ $t('profile.title') }}
    </h1>

    <div class="text-right">
      <Button
        class="flex w-auto"
        :label="$t('profile.editFlights')"
        severity="secondary"
        icon="pi pi-pencil"
        outlined
        @click="toggleModal"
      />
    </div>
  </div>
</template>
