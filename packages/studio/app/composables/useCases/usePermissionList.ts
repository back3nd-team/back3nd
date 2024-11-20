import { useGetPermissions } from './useGetPermissions'

export function usePermissionList() {
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

  async function getPermissionCollection(collectionName: string) {
    try {
      collections.value = await useGetPermissions(collectionName)
      return collections.value
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    collections,
    q,
    filteredCollections,
    getPermissionCollection,
  }
}
