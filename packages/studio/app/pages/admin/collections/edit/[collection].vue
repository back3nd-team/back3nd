<script setup lang="ts">
import FieldList from '@/components/FieldList.vue'
import { useApiClient } from '@/composables/ApiClient'

definePageMeta({
  title: 'Fields',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections/' },
    { label: 'Fields', to: '' },
  ],
})

const route = useRoute()
const COLLECTION_NAME = route.params.collection as string
const collectionData = ref<any>(null)
const fieldsData = ref<any>(null)

async function getFieldsByCollectionId(collectionName: string) {
  const { data } = await useApiClient.getCollection(collectionName)

  const { columns } = data
  fieldsData.value = columns
  collectionData.value = data
}

onMounted(async () => {
  await getFieldsByCollectionId(COLLECTION_NAME)
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5">
      <div>
        {{ collectionData?.name }}
      </div>
    </div>
    <FieldList :fields="fieldsData" />
  </div>
</template>
