<script setup lang="ts">
import formatDate from '@/utils/formatDate'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const organization = ref({
  id: 'Z4YgtlYDOt1j8EZ8tHfRU',
  name: 'Araripina',
  slug: 'araripina',
  logo: '',
  createdAt: '2024-12-14T14:03:27.134Z',
  metadata: '{"eduprime":"https://algumlocal.com.br"}',
})
const orgid = route.params.orgid as string
console.log(orgid)
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
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
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
v-avatar {
    margin-bottom: 16px;
}
</style>
