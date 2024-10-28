<script setup lang="ts">
import { computed } from 'vue'

type AlertColor = 'blue' | 'orange' | 'red'

interface AlertSettings {
  color?: AlertColor
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
    icon: 'streamline:information-circle-solid',
    title: 'Info',
  },
  warning: {
    color: 'orange',
    icon: 'iconoir:bubble-warning',
    title: 'Warning!',
  },
  error: {
    color: 'red',
    icon: 'icon-park-outline:error',
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
