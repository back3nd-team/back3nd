<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  title: 'Users',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
  ],
})

const columns = ref([])
const users = ref([])

const selectedColumns = ref([])

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return users.value
  }

  return users.value.filter((user) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const isOpen = ref(false)
const showPassword = ref(false)
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

function validateForm() {
  try {
    schema.parse(form.value)
    errors.value = {}
    return true
  }
  catch (e: any) {
    errors.value = e.errors.reduce((acc: { [x: string]: any }, error: { path: (string | number)[], message: any }) => {
      acc[error.path[0]] = error.message
      return acc
    }, {})
    return false
  }
}

async function saveItem() {
  if (!validateForm()) {
    return
  }

  try {
    await useApiClient.createUser(form.value.email, form.value.password, form.value.role ? [form.value.role] : [])
    clearForm()
    isOpen.value = false
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}

const selected = ref<{ id: number }[]>([])

function select(row: { id: any }) {
  const index = selected.value.findIndex(item => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  }
  else {
    selected.value.splice(index, 1)
  }
}

const roles = ref<any[]>([])
const selectedRole = ref('')
async function getRoles() {
  try {
    roles.value = await useApiClient.listRoles()
  }
  catch (error) {
    console.error(error)
  }
}

async function getUsers() {
  try {
    const response = await useApiClient.listUsers()
    extractColumns(response)
    extractUsers(response)
    getRoles()

    console.log(response)
  }
  catch (error) {
    console.error(error)
  }
}

function extractColumns(data: any[]) {
  if (data.length === 0)
    return

  const firstItem = data[0]
  const cols = Object.keys(firstItem).map((key) => {
    if (key === 'roles') {
      return { label: 'Role', key: 'role' }
    }
    return { label: key.charAt(0).toUpperCase() + key.slice(1), key }
  })
  columns.value = cols
  selectedColumns.value = [...cols]
}

function extractUsers(data: any[]) {
  const usersData = data.map((item) => {
    const roles = item.roles.map((role: { role: { name: any } }) => role.role.name).join(', ')
    return { ...item, role: roles }
  })
  users.value = usersData
}

getUsers()
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex space-x-4">
        <UInput v-model="q" placeholder="Filter people..." />
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
      </div>
      <div id="actions-buttons">
        <UButton
          icon="material-symbols:add-2-rounded"
          size="md"
          color="primary"
          square
          variant="solid"
          @click="isOpen = true"
        />
      </div>
    </div>
    <UTable v-model="selected" :rows="filteredRows" :columns="selectedColumns" @select="select">
      <template #caption>
        <caption id="rows" class="text-xs text-gray-500 text-right pr-4 py-3">
          {{ users.length }} rows in back3nd_users
        </caption>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">No item here!</span>
          <UButton label="Add something" @click="isOpen = true" />
        </div>
      </template>
    </UTable>
    <USlideover id="add-form" :model-value="isOpen" @update:model-value="isOpen = false">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">
              Add New User
            </h3>
            <UButton
              id="close-button"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div id="add-form">
          <UForm :schema="schema" :state="form" class="space-y-4" @submit="saveItem">
            <UFormGroup label="Role" name="selectedRole">
              <USelect
                id="role"
                v-model="form.role"
                :options="roles"
                placeholder="Select a role"
                value-attribute="id"
                option-attribute="name"
                leading-icon="eos-icons:role-binding"
              />
            </UFormGroup>

            <UFormGroup label="Name" name="name">
              <UInput id="name" v-model="form.name" placeholder="Enter name" class="w-full rounded-lg" />
            </UFormGroup>

            <UFormGroup label="E-mail" name="email">
              <UInput id="email" v-model="form.email" placeholder="Enter e-mail" class="w-full rounded-lg" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter password"
                class="w-full rounded-lg"
              />
            </UFormGroup>

            <UFormGroup label="Confirm Password" name="confirmPassword">
              <UInput
                id="confirm-password"
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Confirm password"
                class="w-full rounded-lg"
              />
            </UFormGroup>

            <UCheckbox v-model="showPassword" label="Show Password" />
          </UForm>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Clear" size="xl" color="gray" @click="clearForm" />
            <UButton label="Save" size="xl" type="submit" color="primary" @click="saveItem" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
