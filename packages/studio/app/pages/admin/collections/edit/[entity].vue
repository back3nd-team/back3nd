<script setup lang="ts">
import FieldList from '@/components/FieldList.vue'
import { useApiClient } from '@/composables/ApiClient'
import type CreateField4Collection from '~/components/CreateField4Collection.vue'

definePageMeta({
  title: 'Fields',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections/' },
    { label: 'Fields', to: '/admin/collections/edit' },
  ],
})

const route = useRoute()
const isOpen = ref(false) // Controla o estado do modal/slideover
const ENTITY_ID = route.params.entity as string
const collectionData = ref<any>(null)
const fieldsData = ref<any>(null)

async function getCollectionById(id: string) {
  const { data } = await useApiClient.getCollection(id)
  collectionData.value = data
}

async function getFieldsByCollectionId(id: string) {
  fieldsData.value = await useApiClient.listEntityFields(id)
}

function handleFieldCreated() {
  isOpen.value = false
  getFieldsByCollectionId(ENTITY_ID)
}

const fieldFormRef = ref<InstanceType<typeof CreateField4Collection> | null>(null)

function saveItem() {
  if (fieldFormRef.value) {
    fieldFormRef.value.submitField()
  }
}

function clearItem() {
  if (fieldFormRef.value) {
    fieldFormRef.value.clearForm()
  }
}

onMounted(async () => {
  await getCollectionById(ENTITY_ID)
  await getFieldsByCollectionId(ENTITY_ID)
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5">
      <div>
        {{ collectionData?.name?.toUpperCase() }}
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

    <FieldList :fields="fieldsData" />

    <USlideover :model-value="isOpen" @update:model-value="isOpen = false">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">
              Create New Field
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

        <div>
          <CreateField4Collection ref="fieldFormRef" :entity-id="ENTITY_ID" @field-created="handleFieldCreated" />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Clear" color="gray" @click="clearItem" />
            <UButton label="Save" color="primary" @click="saveItem" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
