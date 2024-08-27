<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import TextInput from '@/components/TextInput/TextInput.vue'

const { t } = useI18n()

const mockForm = {
  name: 'John',
  surname: 'Doe',
  email: 'biel@frontconde.com',
  address: '1234 Main St',
  city: 'Barcelona',
  birthdate: '1987-02-23',
  repository: 'github.com/condebiel',
}
</script>

<template>
  <div
    class="
      grid grid-cols-1 gap-8

      md:grid-cols-2
    "
  >
    <TextInput
      id="name"
      v-model="mockForm.name"
      :label="t('profile.name')"
      disabled
    />

    <TextInput
      id="surname"
      v-model="mockForm.surname"
      :label="t('profile.surname')"
      disabled
    />

    <TextInput
      id="surname"
      v-model="mockForm.email"
      :label="t('profile.email')"
      disabled
    />

    <TextInput
      id="address"
      v-model="mockForm.address"
      :label="t('profile.address')"
      disabled
    />

    <TextInput
      id="city"
      v-model="mockForm.city"
      :label="t('profile.city')"
      disabled
    />

    <TextInput
      id="birthdate"
      v-model="mockForm.birthdate"
      :label="t('profile.birthdate')"
      disabled
    />

    <TextInput
      id="repository"
      v-model="mockForm.repository"
      :label="t('profile.repository')"
      disabled
    />
  </div>
</template>
