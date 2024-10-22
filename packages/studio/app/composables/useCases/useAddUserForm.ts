import { ref } from 'vue'
import { z } from 'zod'

export function useAddUserForm() {
  const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
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
      password: '',
      confirmPassword: '',
      role: '',
    }
    errors.value = {}
  }

  return { schema, form, errors, validateForm, clearForm }
}
