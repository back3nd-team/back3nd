<script setup lang="ts">
import CreateOrganizationDrawer from '@/components/CreateOrganizationDrawer.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { OrganizationService } from '@/services/OrganizationService'
import { onMounted, ref } from 'vue'

const organizationService = new OrganizationService()
const organizations = ref([])
const search = ref('')
const isDrawerOpen = ref(false)

function toggleDrawer() {
  console.log('Toggling drawer')
  isDrawerOpen.value = !isDrawerOpen.value
}
onMounted(async () => {
  try {
    organizations.value = await organizationService.listOrganizations()
  }
  catch (error) {
    console.error('Failed to fetch organizations', error)
  }
})

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Slug', value: 'slug' },
  { title: 'Logo', value: 'logo' },
]

function handleOrganizationCreated(response: any) {
  console.log('Organization created:', response)
  organizations.value.push(response) // Adiciona à lista
  isDrawerOpen.value = false
}

function handleOrganizationError(error: any) {
  console.error('Error creating organization:', error)
}

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
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-select
              label="Filter"
              :items="['All', 'Active', 'Inactive']"
              class="mr-4"
              outlined
            />
          </v-col>
          <v-col v-if="organizations.length > 0" class="mx-1">
            <v-data-table
              :headers="headers"
              :items="organizations"
              :search="search"
              item-value="id"
              class="elevation-1"
              density="comfortable"
            >
              <template #item.logo="{ item }">
                <v-avatar>
                  <img :src="item.logo" alt="Logo">
                </v-avatar>
              </template>
            </v-data-table>
          </v-col>
          <v-col v-else>
            No data found
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
