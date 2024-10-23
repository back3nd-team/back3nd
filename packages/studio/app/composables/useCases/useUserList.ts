import { useGetUsers } from './useGetUsers'

export function useUserList() {
  const users = ref([])
  const q = ref('')

  const filteredUsers = computed(() => {
    if (!q.value)
      return users.value
    return users.value.filter(user =>
      Object.values(user).some(value =>
        String(value).toLowerCase().includes(q.value.toLowerCase()),
      ),
    )
  })

  async function getUsers() {
    try {
      const rawData = await useGetUsers()
      users.value = rawData.map((user: any) => ({
        ...user,
        roles: user.roles.map((role: any) => role.role.name).join(', '),
      }))
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    users,
    q,
    filteredUsers,
    getUsers,
  }
}
