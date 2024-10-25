<script setup lang="ts">
const props = defineProps({
  onAddField: Function,
  fieldError: String,
})

const localFieldError = ref('')

const newFieldKey = ref('')
const newFieldType = ref('String')
const newFieldDefaultValue = ref('NULL')
const newFieldRequired = ref(false)
const newFieldPlaceholder = ref('')

function addField() {
  if (!newFieldKey.value) {
    localFieldError.value = 'Field key is required'
    return
  }

  const isAdded = props.onAddField({
    key: newFieldKey.value,
    type: newFieldType.value,
    defaultValue: newFieldDefaultValue.value,
    required: newFieldRequired.value,
    placeholder: newFieldPlaceholder.value,
  })

  if (isAdded) {
    newFieldKey.value = ''
    newFieldType.value = 'String'
    newFieldDefaultValue.value = 'NULL'
    newFieldRequired.value = false
    newFieldPlaceholder.value = ''
    localFieldError.value = ''
  }
  else {
    localFieldError.value = 'Field was not added. Please check for validation issues or duplicate key.'
  }
}
</script>

<template>
  <div id="add-field">
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
  </div>
</template>
