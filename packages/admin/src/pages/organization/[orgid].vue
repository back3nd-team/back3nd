<script setup lang="ts">
import type { TOrganization } from 'types/global'
import CreateUserDrawer from '@/components/CreateUserDrawer.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { OrganizationService } from '@/services/OrganizationService'
import formatDate from '@/utils/formatDate'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const organization = ref<TOrganization | null>(null)
const orgid = route.params.orgid as string

const organizationService = new OrganizationService()
const headers = ref([
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Role', value: 'role' },
  { title: 'Joined At', value: 'createdAt' },
])
const members = ref([])
const isDrawerOpen = ref(false)

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

async function handleUserCreated() {
  isDrawerOpen.value = false
  toast.success('User created successfully!')
  // Refresh members list
  organization.value = await organizationService.getFullOrganization(orgid)
  members.value = organization.value.members || []
}

function handleUserError(error: any) {
  console.error('Error creating user:', error)
  toast.error('Failed to create user.')
}

onMounted(async () => {
  organization.value = await organizationService.getFullOrganization(orgid)
  if (organization.value && organization.value.metadata) {
    try {
      organization.value.metadata = JSON.parse(organization.value.metadata)
    }
    catch (error) {
      console.error('Failed to parse metadata:', error)
      organization.value.metadata = {}
    }
  }
  members.value = organization.value.members || []
})
</script>

<template>
  <v-container>
    <h1 class="mb-3">
      Organization details
    </h1>
    <v-card v-if="organization">
      <v-card-title>{{ organization.name }}</v-card-title>
      <v-card-subtitle>{{ organization.slug }}</v-card-subtitle>
      <v-card-text>
        <v-avatar v-if="organization.logo">
          <img :src="organization.logo" alt="Logo">
        </v-avatar>
        <div><strong>ID:</strong> {{ organization.id }}</div>
        <div><strong>Created At:</strong> {{ formatDate(organization.createdAt) }}</div>
        <div><strong>Metadata:</strong></div>
        <v-list dense class="text-caption">
          <v-list-item v-for="(value, key) in organization.metadata" :key="key">
            <v-list-item-title class="text-caption">
              {{ key }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              {{ value }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider class="mt-4 pb-3" />
        <v-chip color="secondary" class="mr-2">
          owner
        </v-chip>
        <v-chip class="mr-2">
          admin
        </v-chip>
        <v-chip color="primary">
          member
        </v-chip>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="members"
      item-value="id"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Members List</v-toolbar-title>
          <v-spacer />
          <v-btn id="add-user" icon="mdi-plus" elevation="4" rounded="0" @click="toggleDrawer" />
        </v-toolbar>
      </template>
      <template #[`item.role`]="{ item }">
        <v-chip>{{ item.role }}</v-chip>
      </template>
      <template #[`item.email`]="{ item }">
        <a :href="`mailto:${item.user.email}`">{{ item.user.email }}</a>
      </template>
      <template #[`item.name`]="{ item }">
        {{ item.user.name }}
      </template>
      <template #[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>

  <FormDrawer
    v-model="isDrawerOpen"
    title="Create User"
  >
    <template #form-content>
      <CreateUserDrawer
        @user-created="handleUserCreated"
        @user-error="handleUserError"
      />
    </template>
  </FormDrawer>
</template>

<style scoped>
v-avatar {
    margin-bottom: 16px;
}
</style>
