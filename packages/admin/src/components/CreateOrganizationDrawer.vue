<script setup lang="ts">
import { OrganizationService } from '@/services/OrganizationService'
import { ref, watch } from 'vue'
import { z } from 'zod'

const emit = defineEmits(['organizationCreated', 'organizationError', 'closeDrawer'])

const organizationService = new OrganizationService()
const organization = ref({ name: '', slug: '', logo: '' })
const errors = ref<string[]>([])

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const organizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  logo: z.string().url().optional().or(z.literal('')),
})

watch(() => organization.value.name, (newName) => {
  organization.value.slug = generateSlug(newName)
})

function validateOrganization() {
  try {
    organizationSchema.parse(organization.value)
    return true
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.errors.map(err => err.message)
      emit('organizationError', error.errors)
    }
    return false
  }
}

async function createOrganization() {
  errors.value = []

  if (!validateOrganization())
    return

  const response = await organizationService.createOrganization(
    organization.value.name,
    organization.value.slug,
    organization.value.logo,
  )
  if (response.id === undefined) {
    errors.value = ['Failed to create organization']
    emit('organizationError', errors.value)
    return
  }

  emit('organizationCreated', response)
}

function cancel() {
  emit('closeDrawer')
}
</script>

<template>
  <v-container>
    <v-alert
      v-if="errors.length"
      :key="errors.length"
      type="error"
      closable
      class="mb-4"
      variant="outlined"
    >
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </v-alert>
    <v-text-field v-model="organization.name" label="Name" />
    <v-text-field v-model="organization.slug" label="Slug" />
    <v-text-field v-model="organization.logo" label="Logo URL" />
    <v-card-actions class="d-flex justify-end">
      <v-btn
        class="me-2 text-none"
        prepend-icon="mdi-note-plus-outline"
        @click="createOrganization"
      >
        SAVE
      </v-btn>
      <v-divider :thickness="4" color="primary" vertical />
      <v-btn
        class="text-none"
        prepend-icon="mdi-close-octagon-outline"
        @click="cancel"
      >
        CANCEL
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
