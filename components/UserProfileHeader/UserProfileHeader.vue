<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import EditFlightQuotaForm from '@/components/EditFlightQuotaForm/EditFlightQuotaForm.vue'

const { t } = useI18n()

const isModalVisible = ref(false)

function toggleModal() {
  isModalVisible.value = !isModalVisible.value
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
      {{ t('profile.title') }}
    </h1>

    <div class="text-right">
      <Button
        class="flex w-auto"
        :label="t('profile.editFlights')"
        severity="secondary"
        icon="pi pi-pencil"
        outlined
        @click="toggleModal"
      />
    </div>

    <Dialog
      v-model:visible="isModalVisible"
      modal
      :header="t('editFlights.title')"
      dismissable-mask
      :style="{ width: '50rem' }"
    >
      <EditFlightQuotaForm @toggle-modal="toggleModal" />
    </Dialog>
  </div>
</template>
