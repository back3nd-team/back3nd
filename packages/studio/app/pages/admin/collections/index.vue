<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  title: 'Collections',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections' },
  ],
})

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Title', key: 'title', class: 'hidden lg:table-cell', rowClass: 'hidden lg:table-cell' },
  { label: 'Email', key: 'email', class: 'hidden md:table-cell', rowClass: 'hidden md:table-cell' },
  { label: 'Role', key: 'role' },
]
const selectedColumns = ref([...columns])

const people = ref([])

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people.value
  }

  return people.value.filter((person) => {
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

async function loadCollections() {
  try {
    const collections = await useApiClient.fetchCollections()
    console.log(collections)
    if (collections.length > 0) {
      people.value = collections
    }
    else {
      console.warn('No collections found')
    }
  }
  catch (error) {
    console.error('Failed to load collections:', error)
  }
}

onMounted(() => {
  loadCollections()
})
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
          {{ people.length }} rows in back3nd_users
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
