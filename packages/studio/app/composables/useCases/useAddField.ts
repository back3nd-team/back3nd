import type { Field } from '../types/types'
import { fieldSchema } from '../schemas/fieldSchema'

export function useAddField(fields: Ref<Field[]>) {
  const fieldError = ref('')

  function addField(newField: Field) {
    try {
      fieldSchema.parse(newField)

      const keyExists = fields.value.some(field => field.key === newField.key)
      if (keyExists) {
        fieldError.value = 'This key already exists. Please use a unique key.'
        return false
      }

      fields.value.push(newField)
      fieldError.value = ''
      return true
    }
    catch (err: any) {
      fieldError.value = err.errors ? err.errors[0].message : 'Validation error occurred'
      console.error('Validation error:', fieldError.value)
      return false
    }
  }

  return { addField, fieldError }
}
