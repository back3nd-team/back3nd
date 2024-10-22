import { useGetCollections } from './useGetCollections'

export function useCollectionList() {
  const collections = ref([])
  const q = ref('')

  const filteredCollections = computed(() => {
    if (!q.value)
      return collections.value
    return collections.value.filter(collection =>
      Object.values(collection).some(value =>
        String(value).toLowerCase().includes(q.value.toLowerCase()),
      ),
    )
  })

  async function getCollections() {
    try {
      const rawData = await useGetCollections()
      collections.value = rawData.userCollections
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    collections,
    q,
    filteredCollections,
    getCollections,
  }
}
