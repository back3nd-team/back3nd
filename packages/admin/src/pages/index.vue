<script setup lang="ts">
import CreateOrganizationDrawer from '@/components/CreateOrganizationDrawer.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { OrganizationService } from '@/services/OrganizationService'
import formatDate from '@/utils/formatDate'
import { onMounted, ref } from 'vue'

const organizationService = new OrganizationService()
interface Organization {
  id: string
  logo: string
  name: string
  slug: string
  createdAt: string
  metadata: Record<string, any>
}

const organizations = ref<Organization[]>([])
const search = ref('')
const isDrawerOpen = ref(false)
const expanded = ref<string[]>([])
const sortBy = ref([{ key: 'createdAt', order: 'desc' as 'desc' | 'asc' }])
function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

async function refreshOrganizations() {
  try {
    organizations.value = await organizationService.listOrganizations()
  }
  catch (error) {
    console.error('Failed to fetch organizations', error)
  }
}

function handleOrganizationCreated() {
  isDrawerOpen.value = false
  toast.success('Organization created successfully!')
  refreshOrganizations()
}

function handleOrganizationError(error: any) {
  console.error('Error creating organization:', error)
  toast.error('Failed to create organization.')
}

onMounted(() => {
  refreshOrganizations()
})

const headers = [
  { title: 'Logo', value: 'logo' },
  { title: 'Name', value: 'name', sortable: true },
  { title: 'Slug', value: 'slug', sortable: true },
  { title: 'Created At', value: 'createdAt', sortable: true },
  { title: '', value: 'actions', sortable: false },
]

function closeDrawer() {
  isDrawerOpen.value = false
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
          <h1>Organizations</h1>
          <v-col cols="auto">
            <v-btn id="add-organization" icon="mdi-plus" elevation="4" rounded="0" @click="toggleDrawer" />
          </v-col>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              label="Filter organizations"
              append-inner-icon="mdi-magnify"
              clearable
            />
          </v-col>
          <v-col class="mx-1">
            <v-data-table
              v-model:expanded="expanded"
              :sort-by="sortBy"
              :headers="headers"
              :items="organizations"
              :search="search"
              item-value="id"
              class="elevation-1"
              density="comfortable"
              show-expand
            >
              <template #item.logo="{ item }">
                <v-avatar>
                  <img :src="item.logo" alt="Logo">
                </v-avatar>
              </template>
              <template #item.createdAt="{ item }">
                {{ formatDate(item.createdAt) }}
              </template>
              <template #expanded-row="{ item }">
                <tr>
                  <td :colspan="6">
                    <v-card>
                      <v-card-text>
                        <pre>{{ item.metadata }}</pre>
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>

      <FormDrawer
        v-model="isDrawerOpen"
        title="Create Organization"
      >
        <template #form-content>
          <CreateOrganizationDrawer
            @organization-created="handleOrganizationCreated"
            @organization-error="handleOrganizationError"
            @close-drawer="closeDrawer"
          />
        </template>
      </FormDrawer>
    </v-main>
  </v-app>
</template>
