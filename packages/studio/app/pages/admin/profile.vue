<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import { z } from 'zod'

definePageMeta({
  title: 'Profile',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Profile', to: '/admin/profile/' },
  ],
})

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  roles: [] as string[],
})

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('E-mail is invalid'),
  password: z.string().min(6, 'The password must have at least 6 characters').optional(),
  confirmPassword: z.string().min(6, 'The password must have at least 6 characters').optional(),
  roles: z.array(z.string()).min(1, 'At least one role is required'),
})

const errors = ref<{ name?: string[], email?: string[], password?: string[], confirmPassword?: string[], roles?: string[] }>({})
const roles = ref<any[]>([])

onMounted(async () => {
  interface UserRole {
    role_id: string
  }

  interface User {
    name: string
    email: string
    roles: UserRole[]
  }

  if (authStore.user) {
    const user = authStore.user as User
    state.value.name = user.name
    state.value.email = user.email
    state.value.roles = user.roles.map(role => role.role_id)
  }
  try {
    roles.value = await useApiClient.listRoles()
  }
  catch (error) {
    console.error('Failed to fetch roles:', error)
  }
})

async function saveProfile() {
  const result = profileSchema.safeParse(state.value)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as { name?: string[], email?: string[], password?: string[], confirmPassword?: string[], roles?: string[] }
    return
  }
  if (state.value.password !== state.value.confirmPassword) {
    errors.value = { confirmPassword: ['Passwords do not match'] }
    return
  }
  try {
    console.warn('Profile NOT updated successfully')
    router.push('/admin')
  }
  catch (error) {
    console.error('Profile update failed:', error)
    errors.value = { email: ['Profile update failed'], password: [] }
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <h1 class="text-2xl font-bold">
        {{ authStore.user.name }}'s Profile
      </h1>
    </div>
    <div class="p-6 bg-gray-100 rounded-lg shadow-md">
      <UForm :state="state" :error="Object.keys(errors).length > 0" @submit.prevent="saveProfile">
        <UFormGroup label="Name" :error="errors.name?.[0]" class="mb-4">
          <UInput
            id="name"
            v-model="state.name"
            type="text"
            required
            placeholder="Name"
            :error="errors.name?.[0]"
          />
        </UFormGroup>
        <UFormGroup label="E-mail" :error="errors.email?.[0]" class="mb-4">
          <UInput
            id="email"
            v-model="state.email"
            type="email"
            required
            placeholder="E-mail address"
            :error="errors.email?.[0]"
          />
        </UFormGroup>
        <UFormGroup label="Password" :error="errors.password?.[0]" class="mb-4 relative">
          <UInput
            id="password"
            v-model="state.password"
            type="password"
            placeholder="Password (leave blank to keep current password)"
            :error="errors.password?.[0]"
          />
        </UFormGroup>
        <UFormGroup label="Confirm Password" :error="errors.confirmPassword?.[0]" class="mb-4 relative">
          <UInput
            id="confirm-password"
            v-model="state.confirmPassword"
            type="password"
            placeholder="Confirm password"
            :error="errors.confirmPassword?.[0]"
          />
        </UFormGroup>
        <UFormGroup label="Role" :error="errors.roles?.[0]" class="mb-4">
          <USelect
            id="role"
            v-model="state.roles"
            :options="roles"
            placeholder="Select a role"
            value-attribute="id"
            option-attribute="name"
            multiple
          />
        </UFormGroup>
        <div class="flex justify-end space-x-4">
          <UButton label="Save" color="primary" @click="saveProfile" />
        </div>
      </UForm>
    </div>
  </div>
</template>
