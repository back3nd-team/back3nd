<script setup lang="ts">
import { useGetPermissions } from '~/composables/useCases/useGetPermissions'
import { useUpdatePermission } from '~/composables/useCases/useUpdatePermission'

const props = defineProps<{
  collectionName: string
  roleId: string | null
}>()

const emit = defineEmits(['permissionUpdated'])

const roles = ref<any[]>([])
const selectedRole = ref(props.roleId ?? '')
const canCreate = ref(false)
const canRead = ref(false)
const canUpdate = ref(false)
const canDelete = ref(false)
const tableName = ref('')
const alertMessage = ref('')
const alertType = ref<'info' | 'error'>('info')
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({
  selectedRole: '',
})

async function fetchPermissionDetails() {
  try {
    const data = await useGetPermissions(props.collectionName)

    const permission = data.find((p: any) => p.role_id === props.roleId)
    if (props.roleId) {
      const role = data.find((p: any) => p.role_id === props.roleId)?.role
      if (role) {
        roles.value = [{ id: props.roleId, name: role.name }]
      }
    }
    if (permission) {
      canCreate.value = permission.can_create
      canRead.value = permission.can_read
      canUpdate.value = permission.can_update
      canDelete.value = permission.can_delete
      tableName.value = permission.collection
      alertMessage.value = `Configure the permissions for the selected role and for ${tableName.value}`
    }
    else {
      alertMessage.value = 'Permission not found'
    }
  }
  catch (e: any) {
    console.error(e)
    handleError('Failed to fetch permission details')
  }
}

async function updatePermission() {
  if (!selectedRole.value) {
    errors.value.selectedRole = 'Role is required'
    return
  }

  const permissionData = {
    role_id: selectedRole.value,
    collection: props.collectionName,
    can_create: canCreate.value,
    can_read: canRead.value,
    can_update: canUpdate.value,
    can_delete: canDelete.value,
  }
  isSubmitting.value = true

  try {
    const response: any = await useUpdatePermission(
      permissionData.role_id,
      permissionData.collection,
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
  alertMessage.value = `Error updating permission: ${error}`
  alertType.value = 'error'
  console.error('Error updating permission:', error)
}

function handleSuccess(permissionData: any) {
  alertMessage.value = 'Permission updated successfully!'
  alertType.value = 'info'
  emit('permissionUpdated', permissionData)
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
  updatePermission,
  clearForm,
})

onMounted(async () => {
  await fetchPermissionDetails()
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
          :options="roles"
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
