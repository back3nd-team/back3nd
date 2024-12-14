<script setup lang="ts">
import { OrganizationService } from '@/services/OrganizationService'
import { ref, watch } from 'vue'
import { z } from 'zod'

const emit = defineEmits(['organizationCreated', 'organizationError', 'closeDrawer'])

const organizationService = new OrganizationService()
const organization = ref({ name: '', slug: '', logo: '', metadata: {} })
const errors = ref<string[]>([])

const metadataEntries = ref([{ property: '', value: '' }])
const propertySchema = z.string().regex(/^[a-z_]+$/, {
  message: 'Properties can only contain lowercase letters and underscores.',
})

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
  metadata: z.record(z.string()),
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

  organization.value.metadata = metadataEntries.value.reduce((acc: Record<string, string>, entry) => {
    try {
      propertySchema.parse(entry.property)
      acc[entry.property] = entry.value
    }
    catch (e: any) {
      errors.value.push(`Invalid property "${entry.property}": ${e.message}`)
    }
    return acc
  }, {})

  if (!validateOrganization())
    return

  const response = await organizationService.createOrganization(
    organization.value.name,
    organization.value.slug,
    organization.value.logo,
    organization.value.metadata,
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

function addMetadataEntry() {
  metadataEntries.value.push({ property: '', value: '' })
}

function removeMetadataEntry(index: number) {
  metadataEntries.value.splice(index, 1)
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
    <h2>Metadata</h2>
    <v-divider class="my-4" />
    <v-row v-for="(entry, index) in metadataEntries" :key="index" class="mb-2" dense>
      <v-col cols="5" class="pe-1">
        <v-text-field
          v-model="entry.property"
          label="Property"
          density="compact"
          clearable
          required
        />
      </v-col>
      <v-col cols="5" class="pe-1">
        <v-text-field
          v-model="entry.value"
          label="Value"
          density="compact"
          clearable
          required
        />
      </v-col>
      <v-col cols="2" class="d-flex align-self-start">
        <v-btn
          icon="mdi-plus"
          color="green"
          density="compact"
          @click="addMetadataEntry"
        />
        <v-btn
          icon="mdi-delete"
          color="red"
          density="compact"
          @click="removeMetadataEntry(index)"
        />
      </v-col>
    </v-row>

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
