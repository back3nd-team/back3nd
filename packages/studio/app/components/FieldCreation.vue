<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  fields: Array,
  onAddField: Function,
  fieldError: String, // Error passed from parent, readonly
})

const localFieldError = ref('')

const newFieldKey = ref('')
const newFieldType = ref('String')
const newFieldDefaultValue = ref('NULL')
const newFieldRequired = ref(false)
const newFieldPlaceholder = ref('')

function addField() {
  console.log('Trying to add a field...')
  console.log('Field Key:', newFieldKey.value)
  console.log('Field Type:', newFieldType.value)

  // Validate if field key is empty
  if (!newFieldKey.value) {
    console.log('Field key is missing')
    localFieldError.value = 'Field key is required'
    return
  }

  // Chamando a função de adição e verificando o retorno
  const isAdded = props.onAddField({
    key: newFieldKey.value,
    type: newFieldType.value,
    defaultValue: newFieldDefaultValue.value,
    required: newFieldRequired.value,
    placeholder: newFieldPlaceholder.value,
  })

  console.log('isAdded result:', isAdded)

  // Se o campo foi adicionado com sucesso, limpar o formulário
  if (isAdded) {
    console.log('Field successfully added')
    newFieldKey.value = ''
    newFieldType.value = 'String'
    newFieldDefaultValue.value = 'NULL'
    newFieldRequired.value = false
    newFieldPlaceholder.value = ''
    localFieldError.value = ''
  }
  else {
    console.log('Field was not added due to validation or duplicate key')
    localFieldError.value = 'Field was not added. Please check for validation issues or duplicate key.'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-gray-800 p-4 rounded-md">
    <UFormGroup label="Key *" hint="A unique column name">
      <UInput
        v-model="newFieldKey"
        size="xl"
        placeholder="A unique column name..."
        required
        class="w-full"
        :class="{ 'border-red-500': localFieldError }"
      />
      <p v-if="localFieldError" class="text-red-500 text-sm mt-2">
        {{ localFieldError }}
      </p>
    </UFormGroup>

    <UFormGroup label="Type *">
      <USelect v-model="newFieldType" size="xl" :options="['String', 'UUID', 'Big Integer', 'Integer', 'Float', 'Decimal', 'Text']" class="w-full" />
    </UFormGroup>

    <UFormGroup label="Default Value">
      <UInput v-model="newFieldDefaultValue" size="xl" placeholder="NULL" class="w-full" />
    </UFormGroup>

    <UFormGroup label="Required">
      <UCheckbox v-model="newFieldRequired" label="Require value to be set on creation" />
    </UFormGroup>

    <UFormGroup label="Placeholder">
      <UInput v-model="newFieldPlaceholder" size="xl" placeholder="Enter a placeholder..." class="w-full" />
    </UFormGroup>
  </div>

  <UButton class="mt-4" @click="addField">
    Add Field
  </UButton>

  <div v-if="props.fields.length > 0" class="mb-6">
    <h3 class="text-lg font-semibold mb-2">
      Fields & Layout
    </h3>
    <ul class="space-y-2">
      <li v-for="(field, index) in props.fields" :key="index" class="flex justify-between items-center bg-gray-800 p-4 rounded-md">
        <div>
          <p><strong>Key:</strong> {{ field.key }} <strong>Type:</strong> {{ field.type }}</p>
          <p><strong>Default Value:</strong> {{ field.defaultValue }} <strong>Required:</strong> {{ field.required ? 'Yes' : 'No' }}</p>
          <p><strong>Placeholder:</strong> {{ field.placeholder }}</p>
        </div>
        <UIcon name="material-symbols:delete" class="cursor-pointer text-red-500" @click="emit('delete-field', index)" />
      </li>
    </ul>
  </div>
</template>
