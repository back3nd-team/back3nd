<script setup lang="ts">
import { OrganizationService } from '@/services/OrganizationService'
import formatDate from '@/utils/formatDate'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const organization = ref({
  id: 'Z4YgtlYDOt1j8EZ8tHfRU',
  name: 'Araripina',
  slug: 'araripina',
  logo: '',
  createdAt: '2024-12-14T14:03:27.134Z',
  metadata: '{"eduprime":"https://algumlocal.com.br"}',
})
// const orgid = route.params.orgid as string

// const organizationService = new OrganizationService()
onMounted(async () => {
})
</script>

<template>
  <v-container>
    <h1 class="mb-3">
      Organization details
    </h1>
    <v-card>
      <v-card-title>{{ organization.name }}</v-card-title>
      <v-card-subtitle>{{ organization.slug }}</v-card-subtitle>
      <v-card-text>
        <v-avatar v-if="organization.logo">
          <img :src="organization.logo" alt="Logo">
        </v-avatar>
        <div><strong>ID:</strong> {{ organization.id }}</div>
        <div><strong>Created At:</strong> {{ formatDate(organization.createdAt) }}</div>
        <div><strong>Metadata:</strong> <pre>{{ organization.metadata }}</pre></div>
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
  </v-container>
</template>

<style scoped>
v-avatar {
    margin-bottom: 16px;
}
</style>
