<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'

import UserProfileHeader from '@/components/UserProfileHeader/UserProfileHeader.vue'
import UserProfileForm from '@/components/UserProfileForm/UserProfileForm.vue'

const isModalVisible = ref(false)

function toggleModal() {
  isModalVisible.value = !isModalVisible.value
}
</script>

<template>
  <div class="mx-auto my-10 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
    <UserProfileHeader @toggle-modal="toggleModal" />
    <UserProfileForm />

    <Dialog
      v-model:visible="isModalVisible"
      modal
      header="Edit Profile"
      dismissable-mask
      :style="{ width: '25rem' }"
    >
      <p>bla bla bla</p>
    </Dialog>
  </div>
</template>
