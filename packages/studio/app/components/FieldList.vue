<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  onDeleteField: Function,
})

const fields = computed(() => props.fields)
const router = useRouter()

const columns = ref([
  { label: 'Column Name', key: 'columnName' },
  { label: 'Type', key: 'columnType' },
  { label: 'isPrimaryKey', key: 'isPrimaryKey' },
  { label: 'isUnique', key: 'isUnique' },
  { label: 'Size', key: 'size' },
])

const selectedColumns = ref([...columns.value])
const isOpen = ref(false)
const fieldToDeleteIndex = ref<number | null>(null)
const q = ref('')
const filteredFields = computed<{ [key: string]: any }[]>(() => {
  if (!q.value) {
    return fields.value as { [key: string]: any }[]
  }

  return fields.value.filter((field: any) => {
    return Object.values(field).some(value =>
      String(value).toLowerCase().includes(q.value.toLowerCase()),
    )
  }) as { [key: string]: any }[]
})
function items(row: any) {
  return [
    [{
      label: 'Edit Field',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => router.push(`/fields/edit/${row.id}`),
    }],
    [{
      label: 'Delete Field',
      icon: 'i-heroicons-trash-20-solid',
      click: () => confirmDeleteField(row.id),
    }],
  ]
}
function openModal() {
  isOpen.value = true
}

defineExpose({ openModal })

function confirmDeleteField(index: number) {
  fieldToDeleteIndex.value = index
  isOpen.value = true
}

function deleteField() {
  if (fieldToDeleteIndex.value !== null) {
    if (props.onDeleteField) {
      props.onDeleteField(fieldToDeleteIndex.value)
    }
    isOpen.value = false
    fieldToDeleteIndex.value = null
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex space-x-4">
        <UInput v-model="q" placeholder="Filter fields..." />
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
      </div>
    </div>

    <UTable :rows="filteredFields || []" :columns="selectedColumns">
      <template #caption>
        <caption id="rows" class="text-xs text-gray-500 text-right pr-4 py-3">
          {{ fields?.length || 0 }} rows in fields
        </caption>
      </template>

      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">No fields here!</span>
          <UButton label="Add Field" @click="isOpen = true" />
        </div>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
            class="w-8 h-8 flex justify-center items-center"
          />
        </UDropdown>
      </template>
    </UTable>

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="p-4">
          <p>Are you sure you want to delete this field? This action cannot be undone.</p>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton color="gray" @click="isOpen = false">
              Cancel
            </UButton>
            <UButton color="red" @click="deleteField">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
