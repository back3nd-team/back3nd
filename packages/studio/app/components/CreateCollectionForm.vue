<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const idTypes = [
  { value: 'uuid', label: 'Generated UUID' },
  { value: 'increment', label: 'Auto-increment integer' },
  { value: 'custom', label: 'Manually inserted string' },
]

const fieldSchema = z.string()
  .min(1, 'O campo é obrigatório')
  .max(63, 'O campo deve ter no máximo 63 caracteres')
  .regex(/^[a-z_]/i, 'O campo deve começar com uma letra ou sublinhado')
  .regex(/^\w+$/, 'O campo deve conter apenas letras, números ou sublinhados')

const collectionName = ref('')
const singleton = ref(false)
const primaryKeyField = ref('')
const type = ref('uuid')

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

function submitCollection() {
  const isCollectionNameValid = validateField(collectionName.value, 'collectionName')
  const isPrimaryKeyFieldValid = validateField(primaryKeyField.value, 'primaryKeyField')

  if (!isCollectionNameValid || !isPrimaryKeyFieldValid)
    return

  console.warn({
    collectionName: collectionName.value,
    singleton: singleton.value,
    primaryKeyField: primaryKeyField.value,
    type: type.value,
  })
}

function toggleCheckbox() {
  singleton.value = !singleton.value
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">
      Create New Collection
    </h2>

    <!-- Main Information -->
    <div class="mb-6">
      <UAlert
        icon="streamline:information-circle-solid"
        variant="outline"
        title="Name the collection and configure its unique 'key' field."
      />
    </div>

    <!-- Form in two columns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Collection Name -->
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

      <!-- Singleton with UCard and negative margin for alignment -->
      <UFormGroup label="Singleton" @click="toggleCheckbox">
        <UCard bordered class="mt-1 cursor-pointer">
          <UCheckbox
            v-model="singleton"
            name="singleton"
            label="Treat as a unique object"
            class="pl-2 -m-3"
            @click.stop
          />
        </UCard>
      </UFormGroup>

      <!-- Primary Key Field -->
      <UFormGroup label="Primary Key Field" :error="errors.primaryKeyField">
        <UInput
          v-model="primaryKeyField"
          size="xl"
          placeholder="id"
          class="w-full"
          :trailing-icon="errors.primaryKeyField ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
        />
      </UFormGroup>

      <!-- ID Type -->
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

    <!-- Confirmation Button -->
    <div class="flex justify-end mt-6">
      <UButton icon="material-symbols:arrow_forward" @click="submitCollection">
        Confirm
      </UButton>
    </div>
  </div>
</template>
