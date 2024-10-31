<script setup lang="ts">
import { useUpdatePermission } from '@/composables/useCases/useUpdatePermission'

interface CollectionItem {
  table?: {
    name?: string
    id?: string
  }
}

const props = defineProps<{
  collection: CollectionItem[]
  initialPermissions: {
    role_id: string
    can_create: boolean
    can_read: boolean
    can_update: boolean
    can_delete: boolean
  }
}>()
const emit = defineEmits(['permissionUpdated'])
const roles = ref<any[]>([])
const selectedRole = ref(props.initialPermissions.role_id)
const canCreate = ref(props.initialPermissions.can_create)
const canRead = ref(props.initialPermissions.can_read)
const canUpdate = ref(props.initialPermissions.can_update)
const canDelete = ref(props.initialPermissions.can_delete)
const tableName = computed(() => props.collection[0]?.table?.name || '')
const tableId = computed(() => props.collection[0]?.table?.id || '')
const alertMessage = ref(`Configure the permissions for the selected role and for ${tableName.value}`)
const alertType = ref<'info' | 'error'>('info')
const isSubmitting = ref(false)
const distinctRoles = ref()

const errors = ref<Record<string, string>>({
  selectedRole: '',
})

async function updatePermission() {
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
    const response: any = await useUpdatePermission(
      permissionData.role_id,
      permissionData.table_id,
      permissionData.can_create,
      permissionData.can_read,
      permissionData.can_update,
      permissionData.can_delete,
    )
    if (response?.error) {
      alertMessage.value = `Error updating permission: ${response.error}`
      alertType.value = 'error'
      console.error('Error updating permission:', response.error)
    }
    else {
      alertMessage.value = 'Permission updated successfully!'
      alertType.value = 'info'
    }
  }
  catch (error) {
    alertMessage.value = `Error updating permission: ${error}`
    alertType.value = 'error'
    console.error('Error updating permission:', error)
  }
  finally {
    emit('permissionUpdated', permissionData)
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
  updatePermission,
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
    <div class="mt-6">
      <UButton :disabled="isSubmitting" @click="updatePermission">
        Update Permission
      </UButton>
    </div>
  </div>
</template>
