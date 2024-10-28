<script setup lang="ts">
import { computed } from 'vue'

type AlertColor = 'blue' | 'orange' | 'red'

interface AlertSettings {
  color: AlertColor
  icon: string
  title: string
}

const props = defineProps<{
  type?: 'info' | 'warning' | 'error'
  icon?: string
  title?: string
}>()

const defaultSettings: Record<'info' | 'warning' | 'error', AlertSettings> = {
  info: {
    color: 'blue',
    icon: 'streamline:information-circle-solid',
    title: 'Info',
  },
  warning: {
    color: 'orange',
    icon: 'streamline:alert-warning-solid',
    title: 'Warning!',
  },
  error: {
    color: 'red',
    icon: 'streamline:circle-close-solid',
    title: 'Error!',
  },
}

const alertSettings = computed<AlertSettings>(() => {
  const type = props.type || 'info'
  return {
    color: defaultSettings[type].color,
    icon: props.icon || defaultSettings[type].icon,
    title: props.title || defaultSettings[type].title,
  }
})
</script>

<template>
  <UAlert
    :color="alertSettings.color"
    :icon="alertSettings.icon"
    variant="outline"
    :title="alertSettings.title"
  >
    <slot />
  </UAlert>
</template>
