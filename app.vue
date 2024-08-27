<script setup lang="ts">
useHead({
  title: 'Nuxt3 Boilerplate',
  meta: [{
    name: 'description',
    content: 'Nuxt3 Boilerplate',
  }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </NuxtLayout>
</template>

<style>
.p-dialog-mask {
  z-index: 450 !important;
}
</style>
