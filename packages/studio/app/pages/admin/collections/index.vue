<script setup lang="ts">
import { useAddCollectionForm } from '@/composables/useCases/useAddCollectionForm'
import { useCollectionList } from '@/composables/useCases/useCollectionList'
import { useCreateCollection } from '@/composables/useCases/useCreateCollection'

definePageMeta({
  title: 'Collections',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections' },
  ],
})

const { collections, q, filteredCollections, getCollections } = useCollectionList()

const columns = ref([
  { label: 'Table Name', key: 'name' },
  { label: 'Roles', key: 'roles' },
  { label: 'Created At', key: 'created_at' },
])
const selectedColumns = ref([...columns.value])

const { schema, form, validateForm, clearForm } = useAddCollectionForm()
const isOpen = ref(false)
const selected = ref([])

async function saveItem() {
  if (!validateForm())
    return
  try {
    const collection = {
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
    }
    await useCreateCollection(collection)
    clearForm()
    isOpen.value = false
    getCollections()
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getCollections()
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex space-x-4">
        <UInput v-model="q" placeholder="Filter collections..." />
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
    <UTable v-model="selected" :rows="filteredCollections" :columns="selectedColumns">
      <template #caption>
        <caption id="rows" class="text-xs text-gray-500 text-right pr-4 py-3">
          {{ collections.length }} rows in collections
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
              Add New Collection
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
          <UForm :schema="schema" :state="form" class="space-y-4" @submit="saveItem">
            <UFormGroup label="Name" name="name">
              <UInput id="name" v-model="form.name" placeholder="Enter name" class="w-full rounded-lg" />
            </UFormGroup>
            <UFormGroup label="Email" name="email">
              <UInput id="email" v-model="form.email" placeholder="Enter email" class="w-full rounded-lg" />
            </UFormGroup>
            <UFormGroup label="Role" name="role">
              <UInput id="role" v-model="form.role" placeholder="Enter role" class="w-full rounded-lg" />
            </UFormGroup>
          </UForm>
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
