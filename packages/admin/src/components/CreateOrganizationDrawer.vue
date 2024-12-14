<script setup lang="ts">
import { OrganizationService } from '@/services/OrganizationService'
import { ref } from 'vue'
import { z } from 'zod'

const emit = defineEmits(['organizationCreated', 'organizationError', 'closeDrawer'])

const organizationService = new OrganizationService()
const organization = ref({ name: '', slug: '', logo: '' })
const errors = ref<string[]>([])

const organizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  logo: z.string().url('Logo must be a valid URL').optional().or(z.literal('')),
})

async function createOrganization() {
  try {
    errors.value = []
    organizationSchema.parse(organization.value)
    const response = await organizationService.createOrganization(
      organization.value.name,
      organization.value.slug,
      organization.value.logo,
    )
    emit('organizationCreated', response) // Sucesso
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      errors.value = error.errors.map(err => err.message)
      emit('organizationError', error.errors) // Erro de validação
    }
    else {
      console.error('Error creating organization:', error)
      emit('organizationError', error) // Erro
    }
  }
}

function cancel() {
  emit('closeDrawer') // Fechar drawer
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
