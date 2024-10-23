import { ref } from 'vue'
import { z } from 'zod'

export function useAddCollectionForm() {
  const form = ref({
    name: '',
    email: '',
    role: '',
  })

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.string().min(1, 'Role is required'),
  })

  const errors = ref({})

  function validateForm() {
    try {
      schema.parse(form.value)
      errors.value = {}
      return true
    }
    catch (e: any) {
      errors.value = e.errors.reduce((acc: any, error: any) => {
        acc[error.path[0]] = error.message
        return acc
      }, {})
      return false
    }
  }

  function clearForm() {
    form.value = {
      name: '',
      email: '',
      role: '',
    }
    errors.value = {}
  }

  return { schema, form, errors, validateForm, clearForm }
}
