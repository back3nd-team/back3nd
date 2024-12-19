<script setup lang="ts">
import { AdminService } from '@/services/AdminService'
import { OrganizationService } from '@/services/OrganizationService'
import { onMounted, ref } from 'vue'
import { z } from 'zod'

const emit = defineEmits(['userCreated', 'userError'])

const adminService = new AdminService()
const user = ref({ name: 'Hermes', email: 'rnadomas2@', password: 'abc321', confirmPassword: 'abc321', role: 'user' })
const errors = ref<string[]>([])
const selectedOrganization = ref('')

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

function validateUser() {
  try {
    userSchema.parse(user.value)
    return true
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.errors.map(err => err.message)
      emit('userError', error.errors)
    }
    return false
  }
}
const organizationService = new OrganizationService()
const organizations = ref([])
async function getFullOrganization() {
  try {
    organizations.value = await organizationService.listOrganizations()
  }
  catch (error) {
    console.error('Failed to fetch organizations', error)
  }
}

async function createUser() {
  errors.value = []

  if (!validateUser())
    return

  try {
    const response = await adminService.createUser(
      user.value.name,
      user.value.email,
      user.value.password,
      user.value.role,
      { organizationId: selectedOrganization.value },
    )
    if (!response?.user.id) {
      errors.value = ['Failed to createX user']
      emit('userError', errors.value)
      return
    }
    const newUserId = response.user.id
    const updatedUser = await organizationService.addMemberToOrg(newUserId, selectedOrganization.value, user.value.role)

    emit('userCreated', updatedUser)
  }
  catch (error: any) {
    errors.value = ['Failed to createXX user']
    emit('userError', errors.value)
  }
}

function cancel() {
  emit('closeDrawer')
}
onMounted(async () => {
  getFullOrganization()
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <v-container>
    <v-alert
      v-if="errors.length"
      :key="errors.length"
      type="error"
      closable
      class="mb-4"
      variant="outlined"
    >
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </v-alert>
    <v-select
      v-model="selectedOrganization"
      :items="organizations.map(org => ({ title: org.name, value: org.id }))"
      label="Organization"
    />
    <v-text-field v-model="user.name" label="Full name" />
    <v-text-field v-model="user.email" label="Email" />
    <v-text-field
      v-model="user.password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      label="Password"
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-model="user.confirmPassword"
      :type="showConfirmPassword ? 'text' : 'password'"
      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
      label="Confirm Password"
      @click:append="showConfirmPassword = !showConfirmPassword"
    />
    <v-select
      v-model="user.role"
      :items="['owner', 'admin', 'user']"
      label="Role"
    />

    <v-card-actions class="d-flex justify-end">
      <v-btn
        class="me-2 text-none"
        prepend-icon="mdi-account-plus-outline"
        @click="createUser"
      >
        SAVE
      </v-btn>
      <v-divider :thickness="4" color="primary" vertical />
      <v-btn
        class="text-none"
        prepend-icon="mdi-close-octagon-outline"
        @click="cancel"
      >
        CANCEL
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
