import { useGetCollections } from './useGetCollections'

export function useCollectionList() {
  const collections = ref<{ [key: string]: any }[]>([])
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
      collections.value = (rawData as unknown as { userCollections: any[] }).userCollections.map((collection: any) => {
        const roles = collection.back3nd_permission.map((permission: any) => permission.role.name).join(', ')
        return {
          ...collection,
          roles,
        }
      })
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
