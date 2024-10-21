<script setup lang="ts">
definePageMeta({
  title: 'Users',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
  ],
})

const columns = ref<{ label: string, key: string }[]>([])
const users = ref<{ id: number, name: string, email: string, role: string }[]>([])

const selectedColumns = ref<{ label: string, key: string }[]>([])

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
function clearForm() {
  console.warn('clear form')
}

function saveItem() {
  console.warn('save item')
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

async function getUsers() {
  try {
    const response = await useApiClient.listUsers()
    extractColumns(response)
    extractUsers(response)
    console.warn(response)
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
  selectedColumns.value = cols.filter(col => col.key !== 'id')
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
        <UInput v-model="q" placeholder="Search item..." />
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
    <USlideover :model-value="isOpen" @update:model-value="isOpen = false">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">
              Add New Item
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

        <div class="p-4 space-y-4">
          <UInput label="Name" placeholder="Enter name" />
          <UInput label="Email" placeholder="Enter email" />
          <UInput label="Role" placeholder="Enter role" />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Clear" color="gray" @click="clearForm" />
            <UButton label="Save" color="primary" @click="saveItem" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
