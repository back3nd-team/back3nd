<script setup lang="ts">
import { z } from 'zod'
import { useCreatePermission } from '~/composables/useCases/useCreatePermission'

const props = defineProps({
  collection: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['permissionCreated'])
const roles = ref<any[]>([])
const selectedRole = ref('')
const canCreate = ref(false)
const canRead = ref(false)
const canUpdate = ref(false)
const canDelete = ref(false)
const tableName = computed(() => props.collection[0]?.table?.name || '')
const alertMessage = ref(`Configure the permissions for the selected role and for ${tableName.value}`)
const alertType = ref<'info' | 'error'>('info')
const isSubmitting = ref(false)
const distinctRoles = ref()

const errors = ref<Record<string, string>>({
  selectedRole: '',
})

function validateField(value: unknown, fieldName: string) {
  if (!value) {
    errors.value[fieldName] = 'This field is required'
    return false
  }
  errors.value[fieldName] = ''
  return true
}

async function submitPermission() {
  const isRoleValid = validateField(selectedRole.value, 'selectedRole')

  if (!isRoleValid)
    return

  const permissionData: CreatePermissionData = {
    role_id: selectedRole.value,
    table_id: props.tableId,
    can_create: canCreate.value,
    can_read: canRead.value,
    can_update: canUpdate.value,
    can_delete: canDelete.value,
  }
  isSubmitting.value = true

  try {
    const response: any = await useCreatePermission(permissionData)
    if (response?.error) {
      alertMessage.value = `Error creating permission: ${response.error}`
      alertType.value = 'error'
      console.error('Error creating permission:', response.error)
    }
    else {
      alertMessage.value = 'Permission created successfully!'
      alertType.value = 'info'
    }
  }
  catch (error) {
    alertMessage.value = `Error creating permission: ${error}`
    alertType.value = 'error'
    console.error('Error creating permission:', error)
  }
  finally {
    emit('permissionCreated', permissionData)
    isSubmitting.value = false
  }
}

function clearForm() {
  selectedRole.value = ''
  canCreate.value = false
  canRead.value = false
  canUpdate.value = false
  canDelete.value = false
  errors.value = {
    selectedRole: '',
  }
  console.warn('Form has been cleared')
}

defineExpose({
  submitPermission,
  clearForm,
})

async function listRoles() {
  roles.value = await useApiClient.listRoles()
  extractDistinctRoles()
}

function extractDistinctRoles() {
  const existingRoleIds = new Set(props.collection.map((c: any) => c.role?.id))
  distinctRoles.value = roles.value
    .filter((role: any) => !existingRoleIds.has(role.id))
    .map((role: any) => ({ id: role.id, name: role.name }))
}
onMounted(() => {
  listRoles()
})
</script>

<template>
  <div>
    <div v-if="isSubmitting" class="-mt-6 pb-6">
      <UProgress size="xs" animation="carousel" />
    </div>
    <div class="mb-6">
      <LayoutAlertBox :type="alertType" :title="alertMessage" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <UFormGroup label="Table" :error="errors.selectedRole">
        <USelectMenu
          v-model="tableName"
          :options="[tabSleName]"
          readonly
          placeholder="Select a role"
          size="xl"
        />
      </UFormGroup>
      <UFormGroup label="Role *" :error="errors.selectedRole">
        <USelectMenu
          v-model="selectedRole"
          :options="distinctRoles"
          value-attribute="id"
          option-attribute="name"
          placeholder="Select a role"
          size="xl"
        />
      </UFormGroup>

      <UFormGroup label="Can Create">
        <UCheckbox v-model="canCreate" label="Allow create" />
      </UFormGroup>

      <UFormGroup label="Can Read">
        <UCheckbox v-model="canRead" label="Allow read" />
      </UFormGroup>

      <UFormGroup label="Can Update">
        <UCheckbox v-model="canUpdate" label="Allow update" />
      </UFormGroup>

      <UFormGroup label="Can Delete">
        <UCheckbox v-model="canDelete" label="Allow delete" />
      </UFormGroup>
    </div>
  </div>
</template>
