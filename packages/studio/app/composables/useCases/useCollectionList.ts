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

  async function getPermissionsRole(collectionName: string) {
    const roleCollection = await useApiClient.getPermissions(collectionName)
    if (Array.isArray(roleCollection) && roleCollection.length > 0) {
      const roleNames = roleCollection.map(item => item.role.name)
      return roleNames
    }
    return null
  }

  async function getCollections() {
    try {
      const data = await useGetCollections()
      const userCollections = (data as unknown as { userCollections: any[] }).userCollections
      const collectionsWithRoles = await Promise.all(userCollections.map(async (collection: any) => {
        const roles = await getPermissionsRole(collection)
        return {
          name: collection,
          roles: roles ? roles.join(', ') : '',
        }
      }))
      collections.value = collectionsWithRoles
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
