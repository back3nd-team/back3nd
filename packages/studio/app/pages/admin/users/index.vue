<script setup lang="ts">
/**
 *  CLEAN ARCHITETURE
 *  @/composables/useCases/
 *  Entities from '@prisma/client'
 */
import type { back3nd_role as Role, back3nd_user as User } from '@prisma/client'
import { useAddUserForm } from '@/composables/useCases/useAddUserForm'
import { useCreateUser } from '@/composables/useCases/useCreateUser'
import { useGetUsers } from '@/composables/useCases/useGetUsers'

definePageMeta({
  title: 'Users',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
  ],
})
const columns = ref<{ label: string, key: string }[]>([])
const users = ref<User[]>([])
const selectedColumns = ref<{ label: string, key: string }[]>([])

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value)
    return users.value
  return users.value.filter((user) => {
    return Object.values(user).some(value =>
      String(value).toLowerCase().includes(q.value.toLowerCase()),
    )
  })
})

const { schema, form, validateForm, clearForm } = useAddUserForm()
const isOpen = ref(false)
const showPassword = ref(false)
const selected = ref<{ id: number }[]>([])
async function saveItem() {
  if (!validateForm())
    return

  try {
    const user = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    }
    await useCreateUser(user, [form.value.role])
    clearForm()
    isOpen.value = false
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}
const roles = ref<Role[]>([])
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
    const rawData = await useGetUsers()
    users.value = rawData.map((user: any) => ({
      ...user,
      roles: user.roles.map((role: any) => role.role.name).join(', '),
    }))
    extractColumns(users.value)
    getRoles()
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
    if (key === 'roles')
      return { label: 'Roles', key: 'roles' }
    return { label: key.charAt(0).toUpperCase() + key.slice(1), key }
  })
  columns.value = cols
  selectedColumns.value = cols.filter(col => col.key !== 'id')
}

onMounted(async () => {
  getUsers()
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex space-x-4">
        <UInput v-model="q" placeholder="Filter user..." />
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

    <UTable v-model="selected" :rows="filteredRows" :columns="selectedColumns">
      <template #caption>
        <caption id="rows" class="text-xs text-gray-500 text-right pr-4 py-3">
          {{ users.length }} rows in users
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
