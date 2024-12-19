<script setup lang="ts">
import FormDrawer from '@/components/FormDrawer.vue'
import { AdminService } from '@/services/AdminService'
import formatDate from '@/utils/formatDate'
import { onMounted, ref } from 'vue'

const adminService = new AdminService()

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const users = ref<User[]>([])
const search = ref('')
const isDrawerOpen = ref(false)
const sortBy = ref([{ key: 'createdAt', order: 'desc' as 'desc' | 'asc' }])
const expanded = ref<string[]>([])
const newUser = ref<User>({
  id: '',
  name: '',
  email: '',
  role: 'user',
  createdAt: '',
})

const headers = [
  { title: 'Name', value: 'name', sortable: true },
  { title: 'Email', value: 'email', sortable: true },
  { title: 'Role', value: 'role', sortable: true },
  { title: 'Created At', value: 'createdAt', sortable: true },
  { title: '', value: 'actions', sortable: false },
]

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

async function refreshUsers() {
  try {
    const result = await adminService.listUsers({
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })
    users.value = result
  }
  catch (error) {
    console.error('Failed to fetch users', error)
    toast.error('Failed to fetch users.')
  }
}

async function addUser() {
  try {
    const result = await adminService.createUser(
      newUser.value.name,
      newUser.value.email,
      'defaultpassword123', // Set a default password for simplicity
      newUser.value.role,
    )
    toast.success(`User ${result.name} created successfully!`)
    toggleDrawer()
    refreshUsers()
  }
  catch (error) {
    console.error('Failed to create user:', error)
    toast.error('Failed to create user.')
  }
}

onMounted(() => {
  refreshUsers()
})

/**
 *  Salvar a organization na hora de salvar o usuário
 *
 *
 */
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
          <h1>Users</h1>
          <v-col cols="auto">
            <v-btn id="add-user" icon="mdi-plus" elevation="4" rounded="0" @click="toggleDrawer" />
          </v-col>
        </div>

        <v-row>
          <v-text-field
            v-model="search"
            label="Filter users"
            append-inner-icon="mdi-magnify"
            clearable
          />
          <v-data-table
            v-model:expanded="expanded"
            :sort-by="sortBy"
            :headers="headers"
            :items="users"
            :search="search"
            item-value="id"
            class="elevation-1"
            density="comfortable"
            show-expand
          >
            <template #item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>
            <template #expanded-row="{ item }">
              <tr>
                <td :colspan="6">
                  <v-card>
                    <v-card-text>
                      <strong>Email:</strong> {{ item.email }}<br>
                      <strong>Role:</strong> {{ item.role }}
                    </v-card-text>
                  </v-card>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-row>
      </v-container>

      <FormDrawer
        v-model="isDrawerOpen"
        title="Add User"
      >
        <template #form-content>
          <v-form>
            <v-text-field v-model="newUser.name" label="Name" required />
            <v-text-field v-model="newUser.email" label="Email" required />
            <v-select
              v-model="newUser.role"
              :items="['user', 'admin']"
              label="Role"
              required
            />
            <v-btn color="primary" class="mt-4" @click="addUser">
              Add User
            </v-btn>
          </v-form>
        </template>
      </FormDrawer>
    </v-main>
  </v-app>
</template>
