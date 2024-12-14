<script setup lang="ts">
import { defineModel, defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpen = defineModel<boolean>('modelValue')

function closeDrawer() {
  isOpen.value = false
}
</script>

<template>
  <v-navigation-drawer v-model="isOpen" location="right" rail-width="400" :rail="true" temporary>
    <v-card variant="flat">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <v-btn icon="mdi-close" @click="closeDrawer" />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <slot name="form-content" />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>
