<script setup lang="ts">
const props = defineProps({
  fields: Array,
  onDeleteField: Function,
})

const isModalOpen = ref(false)
const fieldToDeleteIndex = ref(null)

function confirmDeleteField(index) {
  fieldToDeleteIndex.value = index
  isModalOpen.value = true
}

function deleteField() {
  if (fieldToDeleteIndex.value !== null) {
    props.onDeleteField(fieldToDeleteIndex.value)
    isModalOpen.value = false
    fieldToDeleteIndex.value = null
  }
}
</script>

<template>
  <div v-if="props.fields.length > 0" id="fields" class="mb-6">
    <h3 class="text-lg font-semibold mb-2">
      Fields & Layout
    </h3>
    <ul class="space-y-2">
      <li v-for="(field, index) in props.fields" :key="index" class="flex justify-between items-center bg-gray-800 p-4 rounded-md">
        <div>
          <p><strong>Key:</strong> {{ field.key }} <strong>Type:</strong> {{ field.type }}</p>
          <p><strong>Default Value:</strong> {{ field.defaultValue }} <strong>Required:</strong> {{ field.required ? 'Yes' : 'No' }}</p>
          <p><strong>Placeholder:</strong> {{ field.placeholder }}</p>
        </div>
        <UIcon name="material-symbols:delete" class="cursor-pointer text-red-500" @click="confirmDeleteField(index)" />
      </li>
    </ul>
  </div>

  <!-- Modal de Confirmação -->
  <UModal v-model="isModalOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Confirm Delete
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
        </div>
      </template>

      <div class="p-4">
        <p>Are you sure you want to delete this field? This action cannot be undone.</p>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-4 p-4">
          <UButton color="gray" @click="isModalOpen = false">
            Cancel
          </UButton>
          <UButton color="red" @click="deleteField">
            Delete
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
