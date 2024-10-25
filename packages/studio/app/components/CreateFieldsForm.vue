<script setup lang="ts">
import FieldCreation from '@/components/FieldCreation.vue'
import { useAddField } from '@/composables/useCases/useAddField'

const fields = ref<{ key: string, type: string, defaultValue: string, required: boolean, placeholder: string }[]>([])
const { addField, fieldError } = useAddField(fields)
function onAddField(newField) {
  const result = addField(newField)
  return result
}

function onDeleteField(index) {
  fields.value.splice(index, 1)
}

onMounted(() => {
  fields.value = [
    { key: 'name', type: 'String', defaultValue: 'NULL', required: true, placeholder: 'Enter a name...' },
    { key: 'phone', type: 'String', defaultValue: 'NULL', required: false, placeholder: 'Enter a phone number...' },
    { key: 'description', type: 'Text', defaultValue: 'NULL', required: false, placeholder: 'Enter a description...' },
  ]
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">
      Create Fields
    </h2>

    <FieldCreation
      :fields="fields"
      :on-add-field="onAddField"
      :on-delete-field="onDeleteField"
      :field-error="fieldError"
    />
  </div>
</template>
