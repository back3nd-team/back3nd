<script setup lang="ts">
import { useApiClient } from '@/composables/ApiClient'

definePageMeta({
  title: 'Fields',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections' },
    { label: 'Fields', to: '/admin/collections/edit' },
  ],
})
const route = useRoute()
const ENTITY_ID = route.params.entity as string
const collectionData = ref<any>(null)
const fieldsData = ref<any>(null)
/**
 * @TODO
 *  - Get the name of collection
 *  - Get the fields of collection
 *  - Get the roles of collection
 *  - Get the permissions of collection
 *
 */
async function getCollectionById(id: string) {
  const { data } = await useApiClient.getCollection(id)
  collectionData.value = data
}

async function getFieldsByCollectionId(id: string) {
  fieldsData.value = await useApiClient.listEntityFields(id)
}

onMounted(async () => {
  getCollectionById(ENTITY_ID)
  getFieldsByCollectionId(ENTITY_ID)
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5">
      <div class="">
        {{ collectionData?.name?.toUpperCase() }}
      </div>
      <div id="actions-buttons">
        <UButton
          icon="material-symbols:add-2-rounded"
          size="md"
          color="primary"
          square
          variant="solid"
        />
      </div>
    </div>
    <FieldList :fields="fieldsData" />
  </div>
</template>
