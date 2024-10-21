<script setup lang="ts">
definePageMeta({
  title: 'Users',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
  ],
})
const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Title', key: 'title', class: 'hidden lg:table-cell', rowClass: 'hidden lg:table-cell' },
  { label: 'Email', key: 'email', class: 'hidden md:table-cell', rowClass: 'hidden md:table-cell' },
  { label: 'Role', key: 'role' },
]
const selectedColumns = ref([...columns])

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member',
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin',
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member',
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin',
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner',
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member',
}]

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
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
          icon="lets-icons:add-ring-fill"
          size="sm"
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
          125 rows in back3nd_users
        </caption>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">No one here!</span>
          <UButton label="Add people" />
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
          <!-- Inputs do formulário -->
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
