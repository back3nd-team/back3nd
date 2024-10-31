<script setup lang="ts">
import CreatePermissionForm from '@/components/CreatePermissionForm.vue'
import { usePermissionList } from '@/composables/useCases/usePermissionList'

const route = useRoute()
const router = useRouter()
const ENTITY_ID = route.params.entity as string
definePageMeta({
  title: 'Permissions',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections' },
    { label: 'Permissions' },
  ],
})

const { collections, q, getPermissionCollection } = usePermissionList()
const processedPermissions = ref([])
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

function items(row: any) {
  return [
    [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => router.push(`${router.currentRoute.value.fullPath}/edit/${row.id}`),
    }],
    [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
    }],
  ]
}

function processPermissions() {
  processedPermissions.value = collections.value.map((permission: any) => ({
    tableName: permission.table.name,
    roleName: permission.role.name,
    can_create: permission.can_create,
    can_read: permission.can_read,
    can_update: permission.can_update,
    can_delete: permission.can_delete,
  }))
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
  getPermissionCollection(ENTITY_ID)
    .then(() => {
      processPermissions()
    })
}

onMounted(() => {
  getPermissionCollection(ENTITY_ID).then(() => {
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
          <CreatePermissionForm ref="permissionFormRef" :collection="collections" @permission-created="handlePermissionCreated" />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-4 p-4">
            <UButton label="Clear" color="gray" @click="clearPermission" />
            <UButton label="Save" color="primary" @click="savePermission" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
