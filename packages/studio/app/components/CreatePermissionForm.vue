<script setup lang="ts">
import { useCollectionList } from '~/composables/useCases/useCollectionList'
import { useCreatePermission } from '~/composables/useCases/useCreatePermission'

const props = defineProps<{
  entityID: string
}>()

const emit = defineEmits(['permissionCreated'])

const roles = ref<any[]>([])
const selectedRole = ref('')
const canCreate = ref(false)
const canRead = ref(false)
const canUpdate = ref(false)
const canDelete = ref(false)
const tableName = ref('')
const tableId = ref('')
const alertMessage = ref(`Configure the permissions for the selected role and for ${tableName.value}`)
const alertType = ref<'info' | 'error'>('info')
const isSubmitting = ref(false)
const distinctRoles = ref()
const collections = ref<any[]>([])
const errors = ref<Record<string, string>>({
  selectedRole: '',
})

async function submitPermission() {
  if (!selectedRole.value) {
    errors.value.selectedRole = 'Role is required'
    return
  }

  const permissionData = {
    role_id: selectedRole.value,
    table_id: tableId.value,
    can_create: canCreate.value,
    can_read: canRead.value,
    can_update: canUpdate.value,
    can_delete: canDelete.value,
    roles: roles.value,
  }
  isSubmitting.value = true

  try {
    const response: any = await useCreatePermission(
      permissionData.role_id,
      permissionData.table_id,
      permissionData.can_create,
      permissionData.can_read,
      permissionData.can_update,
      permissionData.can_delete,
    )
    if (response?.error) {
      handleError(response.error)
    }
    else {
      handleSuccess(permissionData)
    }
  }
  catch (error: any) {
    handleError(error.message || error)
  }
  finally {
    isSubmitting.value = false
  }
}

function handleError(error: string) {
  alertMessage.value = `Error creating permission: ${error}`
  alertType.value = 'error'
  console.error('Error creating permission:', error)
}

function handleSuccess(permissionData: any) {
  alertMessage.value = 'Permission created successfully!'
  alertType.value = 'info'
  emit('permissionCreated', permissionData)
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

async function fetchCollection() {
  const { data } = await useApiClient.getCollection(props.entityID)
  collections.value = data.back3nd_permission
  tableName.value = data.name
  tableId.value = data.id
  roles.value = await useApiClient.listRoles()
  const existingRoleIds = new Set(collections.value.map((c: any) => c.role_id))
  distinctRoles.value = roles.value
    .filter((role: any) => !existingRoleIds.has(role.id))
    .map((role: any) => ({ id: role.id, name: role.name }))
}

onMounted(async () => {
  await fetchCollection()
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
          :options="[tableName]"
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
