<script setup lang="ts">
import type { Field } from '@/composables/types/types.ts'
import { z } from 'zod'

const props = defineProps<{
  entityId: string
}>()
const emit = defineEmits(['fieldCreated'])
const entityId = computed(() => props.entityId)
const fieldSchema = z.string()
  .min(1, 'The field name is required')
  .max(63, 'The field name must be at most 63 characters long')
  .regex(/^[a-z_]/i, 'The field name must start with a letter or underscore')
  .regex(/^\w+$/, 'The field name must contain only letters, numbers, or underscores')

const columnName = ref('')
const columnType = ref<Field['columnType']>('String')
const defaultValue = ref('')
const size = ref(125)
const placeholder = ref('')
const isSubmitting = ref(false)
const alertMessage = ref('')
const alertType = ref<'info' | 'error'>('info') // Variável para tipo de alerta

const errors = ref<Record<string, string>>({
  columnName: '',
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

async function createFields(fieldData: Field) {
  await useApiClient.createEntityField(entityId.value, fieldData)
}

async function submitField() {
  const isColumnNameValid = validateField(columnName.value, 'columnName')

  if (!isColumnNameValid)
    return

  const fieldData = {
    columnName: columnName.value,
    columnType: columnType.value as Field['columnType'],
    defaultValue: defaultValue.value || undefined,
    placeholder: placeholder.value || undefined,
    size: size.value || 125,
    entity_id: entityId.value,
  }

  isSubmitting.value = true

  try {
    const response: any = await createFields(fieldData)
    if (response?.error) {
      alertMessage.value = `Error creating field: ${response.error}`
      alertType.value = 'error'
      console.error('Error creating field:', response.error)
    }
    else {
      emit('fieldCreated', fieldData)
      alertMessage.value = 'Field created successfully!'
      alertType.value = 'info'
    }
  }
  catch (error) {
    alertMessage.value = `Error creating field: ${error}`
    alertType.value = 'error'
    console.error('Error creating field:', error)
  }
  finally {
    isSubmitting.value = false
  }
}

function clearForm() {
  columnName.value = ''
  columnType.value = 'String'
  defaultValue.value = ''
  size.value = 0
  placeholder.value = ''
  errors.value = {
    columnName: '',
  }
  alertMessage.value = ''
}

defineExpose({
  submitField,
  clearForm,
})
</script>

<template>
  <div>
    <LayoutAlertBox v-if="alertMessage" :type="alertType" :title="alertMessage" />

    <div v-if="isSubmitting" class="-mt-6 pb-6">
      <UProgress size="xs" animation="carousel" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <UFormGroup label="Field Name *" :error="errors.columnName" help="Names are case-sensitive">
        <UInput
          v-model="columnName"
          size="xl"
          placeholder="A unique column name..."
          required
          class="w-full"
          :trailing-icon="errors.columnName ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
        />
      </UFormGroup>

      <UFormGroup label="Field Type *">
        <USelect
          v-model="columnType"
          size="xl"
          :options="[
            'String',
            'UUID',
            'Integer',
            'Big Integer',
            'Float',
            'Double',
            'Decimal',
            'Text',
            'Boolean',
            'Date',
            'Timestamp',
            'Time',
            'JSON',
            'JSONB',
            'Point',
            'Line',
            'Polygon',
            'Bytea',
          ]"
          class="w-full"
        />
      </UFormGroup>

      <UFormGroup label="Field Size (Optional)">
        <UInput v-model="size" size="xl" type="number" placeholder="Field size (optional)" class="w-full" />
      </UFormGroup>

      <UFormGroup label="Default Value (Optional)">
        <UInput v-model="defaultValue" size="xl" placeholder="Default value (optional)" class="w-full" />
      </UFormGroup>
    </div>
  </div>
</template>
