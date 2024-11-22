<script setup lang="ts">
import CreatePermissionForm from '@/components/CreatePermissionForm.vue'
import EditPermissionForm from '@/components/EditPermissionForm.vue'
import { usePermissionList } from '@/composables/useCases/usePermissionList'

const route = useRoute()
const COLLECTION_NAME = route.params.collection as string
definePageMeta({
  title: 'Permissions',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections/' },
    { label: 'Permissions' },
  ],
})

const { collections, q, getPermissionCollection } = usePermissionList()
interface Permission {
  tableName: string
  roleName: string
  can_create: boolean
  can_read: boolean
  can_update: boolean
  can_delete: boolean
}

const processedPermissions = ref<Permission[]>([])
const columns = ref([
  { label: 'Table Name', key: 'tableName' },
  { label: 'Role', key: 'roleName' },
  { label: 'Can Create', key: 'can_create' },
  { label: 'Can Read', key: 'can_read' },
  { label: 'Can Update', key: 'can_update' },
  { label: 'Can Delete', key: 'can_delete' },
  { label: 'Actions', key: 'actions' },
])
const selectedColumns = ref([...columns.value])
const isOpen = ref(false)
const isEditOpen = ref(false)
const isDeleteModalOpen = ref(false)
const permissionToDelete = ref<any>(null)
const permissionToEdit = ref<any>(null)
const editPermissionFormRef = ref<InstanceType<typeof EditPermissionForm> | null>(null)
function items(row: any) {
  return [
    [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        permissionToEdit.value = row
        isEditOpen.value = true
      },
    }],
    [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        permissionToDelete.value = row
        isDeleteModalOpen.value = true
      },
    }],
  ]
}

function processPermissions() {
  try {
    if (Array.isArray(collections.value)) {
      processedPermissions.value = collections.value.map((permission: any) => ({
        tableName: permission.collection,
        roleName: permission.role.name,
        can_create: permission.can_create,
        can_read: permission.can_read,
        can_update: permission.can_update,
        can_delete: permission.can_delete,
      }))
    } else {
      console.warn('collections.value is not an array');
      processedPermissions.value = [];
    }
  }
  catch (error) {
    console.error('Error processing permissions:', error)
  }
}

function findRoleId(tableName: string, roleName: string): string | null {
  const permission = collections.value.find((p: any) => p.collection === tableName && p.role.name === roleName)
  return permission ? permission.role_id : null
}

const permissionFormRef = ref<InstanceType<typeof CreatePermissionForm> | null>(null)

async function savePermission() {
  if (permissionFormRef.value) {
    permissionFormRef.value.submitPermission()
  }
}

function clearPermission() {
  if (permissionFormRef.value) {
    permissionFormRef.value.clearForm()
  }
}

function handlePermissionCreated() {
  isOpen.value = false
  getPermissionCollection(COLLECTION_NAME)
    .then(() => {
      processPermissions()
    })
}

async function deletePermission() {
  if (permissionToDelete.value) {
    try {
      const { tableName, roleName } = permissionToDelete.value
      const role_id = findRoleId(tableName, roleName)
      const table_id = collections.value.find((p: any) => p.collection === tableName)?.collection

      if (role_id && table_id) {
        await useApiClient.deletePermission(role_id, table_id)
        isDeleteModalOpen.value = false
        getPermissionCollection(COLLECTION_NAME).then(() => {
          processPermissions()
        })
      }
      else {
        console.error('Role ID or Table ID not found')
      }
    }
    catch (error) {
      console.error('Error deleting permission:', error)
    }
  }
}
function updatePermission() {
  if (editPermissionFormRef.value) {
    editPermissionFormRef.value.updatePermission()
  }
}

function handlePermissionUpdated() {
  isEditOpen.value = false
  getPermissionCollection(COLLECTION_NAME)
    .then(() => {
      processPermissions()
    })
}

onMounted(() => {
  getPermissionCollection(COLLECTION_NAME).then(() => {
    processPermissions()
  })
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex space-x-4">
        <UInput v-model="q" placeholder="Filter permissions..." />
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
      </div>
      <div id="actions-buttons">
        <UButton
          icon="material-symbols:add-2-rounded"
          size="md"
          color="primary"
          square
          variant="solid"
          @click="isOpen = true"
        />
      </div>
    </div>

    <UTable :rows="processedPermissions" :columns="selectedColumns">
      <template #can_create-data="{ row }">
        <span v-if="row.can_create">
          <UIcon name="material-symbols:check-box" class="w-5 h-5" />
        </span>
        <span v-else>
          <UIcon name="material-symbols:check-box-outline-blank-sharp" class="w-5 h-5" />
        </span>
      </template>

      <template #can_read-data="{ row }">
        <span v-if="row.can_read">
          <UIcon name="material-symbols:check-box" class="w-5 h-5" />
        </span>
        <span v-else>
          <UIcon name="material-symbols:check-box-outline-blank-sharp" class="w-5 h-5" />
        </span>
      </template>

      <template #can_update-data="{ row }">
        <span v-if="row.can_update">
          <UIcon name="material-symbols:check-box" class="w-5 h-5" />
        </span>
        <span v-else>
          <UIcon name="material-symbols:check-box-outline-blank-sharp" class="w-5 h-5" />
        </span>
      </template>

      <template #can_delete-data="{ row }">
        <span v-if="row.can_delete">
          <UIcon name="material-symbols:check-box" class="w-5 h-5" />
        </span>
        <span v-else>
          <UIcon name="material-symbols:check-box-outline-blank-sharp" class="w-5 h-5" />
        </span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
            class="w-8 h-8 flex justify-center items-center"
          />
        </UDropdown>
      </template>
    </UTable>

    <USlideover :model-value="isOpen" @update:model-value="isOpen = false">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">
              Create New Permission
            </h3>
            <UButton
              id="close-button"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div>
          <CreatePermissionForm ref="permissionFormRef" :collection-name="COLLECTION_NAME" @permission-created="handlePermissionCreated" />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Clear" color="gray" @click="clearPermission" />
            <UButton label="Save" color="primary" @click="savePermission" />
          </div>
        </template>
      </UCard>
    </USlideover>

    <USlideover :model-value="isEditOpen" @update:model-value="isEditOpen = false">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">
              Edit Permission
            </h3>
            <UButton
              id="close-button"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isEditOpen = false"
            />
          </div>
        </template>

        <div>
          <EditPermissionForm
            v-if="permissionToEdit"
            ref="editPermissionFormRef"
            :collection-name="COLLECTION_NAME"
            :role-id="findRoleId(permissionToEdit.tableName, permissionToEdit.roleName)"
            @permission-updated="handlePermissionUpdated"
          />
        </div>

        <!-- Adicionar o botão Save no footer do USlideover de edição -->
        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Close" color="gray" @click="isEditOpen = false" />
            <UButton label="Save" color="primary" @click="updatePermission" />
          </div>
        </template>
      </UCard>
    </USlideover>

    <UModal v-model="isDeleteModalOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isDeleteModalOpen = false" />
          </div>
        </template>

        <div class="p-4">
          <p>Are you sure you want to delete this permission? This action cannot be undone.</p>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton color="gray" @click="isDeleteModalOpen = false">
              Cancel
            </UButton>
            <UButton color="red" @click="deletePermission">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
