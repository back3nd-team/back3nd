import { ref } from 'vue'
import { z } from 'zod'

const fieldSchema = z.object({
  key: z.string()
    .min(1, 'The field key is required')
    .max(63, 'The field key must be at most 63 characters long')
    .regex(/^[a-z_]/i, 'The field key must start with a letter or underscore')
    .regex(/^\w+$/, 'The field key must contain only letters, numbers, or underscores'), // PostgreSQL-valid column name
  type: z.enum(['String', 'UUID', 'Big Integer', 'Integer', 'Float', 'Decimal', 'Text']),
  defaultValue: z.string(), // You can add specific validations based on the type if needed
  required: z.boolean(),
  placeholder: z.string().optional(),
})

export function useAddField(fields) {
  const fieldError = ref('')

  function addField(newField) {
    try {
      // Validar o campo
      console.log('Validating field:', newField)
      fieldSchema.parse(newField)

      // Verificar se a chave já existe
      const keyExists = fields.value.some(field => field.key === newField.key)
      if (keyExists) {
        fieldError.value = 'This key already exists. Please use a unique key.'
        console.log('Validation failed: duplicate key')
        return false // Impedir a adição se a chave já existir
      }

      // Se passou na validação, adicionar ao array
      fields.value.push(newField)
      fieldError.value = ''
      console.log('Field added successfully')
      return true // Sucesso na adição
    }
    catch (err) {
      // Capturar erros de validação e retornar falso
      fieldError.value = err.errors ? err.errors[0].message : 'Validation error occurred'
      console.log('Validation error:', fieldError.value)
      return false // Retornar falso quando houver erro de validação
    }
  }

  return { addField, fieldError }
}
