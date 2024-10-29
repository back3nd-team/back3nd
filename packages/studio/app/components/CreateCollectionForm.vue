<script setup lang="ts">
import type { CreateCollectionData } from '../composables/types/types'
import { z } from 'zod'
import { useCreateCollection } from '~/composables/useCases/useCreateCollection'

const emit = defineEmits(['collectionCreated'])
const idTypes = [
  { value: 'uuid', label: 'Generated UUID' },
  { value: 'increment', label: 'Auto-increment integer' },
  { value: 'custom', label: 'Manually inserted string' },
]

const fieldSchema = z.string()
  .min(1, 'The field is required')
  .max(63, 'The field must be at most 63 characters long')
  .regex(/^[a-z_]/i, 'The field must start with a letter or underscore')
  .regex(/^\w+$/, 'The field must contain only letters, numbers, or underscores')

const collectionName = ref('')
const roles = ref<any[]>([])
const selectedRoles = ref<any[]>([])
const primaryKeyField = ref('')
const type = ref('uuid')
const alertMessage = ref('Name the collection and configure its unique "key" field.')
const alertType = ref<'info' | 'error'>('info')
const isSubmitting = ref(false)

const errors = ref<Record<string, string>>({
  collectionName: '',
  primaryKeyField: '',
})

function validateField(value: unknown, fieldName: string) {
  const result = fieldSchema.safeParse(value)
  if (!result.success) {
    errors.value[fieldName] = result.error.errors[0]?.message || 'Unknown error'
    return false
  }
  errors.value[fieldName] = ''
  return true
}

async function submitCollection() {
  const isCollectionNameValid = validateField(collectionName.value, 'collectionName')
  const isPrimaryKeyFieldValid = validateField(primaryKeyField.value, 'primaryKeyField')

  if (!isCollectionNameValid || !isPrimaryKeyFieldValid)
    return

  const collectionData: CreateCollectionData = {
    collectionName: collectionName.value,
    primaryKeyField: primaryKeyField.value,
    type: type.value,
    roles: selectedRoles.value,
  }
  isSubmitting.value = true

  try {
    const response: any = await useCreateCollection(collectionData)
    if (response?.error) {
      alertMessage.value = `Error creating collection: ${response.error}`
      alertType.value = 'error'
      console.error('Error creating collection:', response.error)
    }
    else {
      alertMessage.value = 'Collection created successfully!'
      alertType.value = 'info'
    }
  }
  catch (error) {
    alertMessage.value = `Error creating collection: ${error}`
    alertType.value = 'error'
    console.error('Error creating collection:', error)
  }
  finally {
    emit('collectionCreated', collectionData)
    isSubmitting.value = false
  }
}

function clearForm() {
  collectionName.value = ''
  primaryKeyField.value = ''
  type.value = 'uuid'
  errors.value = {
    collectionName: '',
    primaryKeyField: '',
  }
  selectedRoles.value = []
  console.warn('Form has been cleared')
}

defineExpose({
  submitCollection,
  clearForm,
})

async function listRoles() {
  roles.value = await useApiClient.listRoles()
}

onMounted(() => {
  listRoles()
})
</script>

<template>
  <div>
    <div v-if="isSubmitting" class="-mt-6 pb-6">
      <UProgress size="xs" animation="carousel" />
    </div>
    <div class="mb-6">
      <LayoutAlertBox :type="alertType" :title="alertMessage" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <UFormGroup label="Collection Name *" :error="errors.collectionName" help="Names are case-sensitive">
        <UInput
          v-model="collectionName"
          size="xl"
          placeholder="A unique table name..."
          required
          class="w-full"
          :trailing-icon="errors.collectionName ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
        />
      </UFormGroup>

      <UFormGroup label="Roles">
        <USelectMenu
          v-model="selectedRoles"
          :options="roles" multiple
          value-attribute="id"
          option-attribute="name"
          placeholder="Select permissions"
          size="xl"
        />
      </UFormGroup>

      <UFormGroup label="Primary Key Field" :error="errors.primaryKeyField">
        <UInput
          v-model="primaryKeyField"
          size="xl"
          placeholder="id"
          class="w-full"
          :trailing-icon="errors.primaryKeyField ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
        />
      </UFormGroup>

      <UFormGroup label="ID Type">
        <USelect
          v-model="type"
          size="xl"
          :options="idTypes"
          placeholder="Generated UUID"
          class="w-full"
        />
      </UFormGroup>
    </div>
  </div>
</template>
