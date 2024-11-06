<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { onMounted, ref } from 'vue'
import { configureMonacoLoader, configurePrismaLanguage, MONACO_EDITOR_OPTIONS } from '../../../composables/useEditor'

definePageMeta({
  title: 'Schema Editor',
  ssr: false,
})

configureMonacoLoader()
const toast = useToast()
const files = ref<string[]>([])
const codeEditors = ref<string[]>([])
const items = ref<{ key: string, label: string, description: string }[]>([])
const editors = ref<any[]>([])
const isSubmitting = ref(false)
async function fetchFiles() {
  files.value = (await useApiClient.listPrismaFiles()).sort()
  codeEditors.value = await Promise.all(
    files.value.map(async (file) => {
      const { model } = await useApiClient.readPrismaFile(file)
      if (model) {
        try {
          return atob(model)
        }
        catch (error) {
          console.error(`Error decoding content of ${file}:`, error)
          return 'Error loading content'
        }
      }
      else {
        console.warn(`Unexpected format for file content: ${file}`)
        return 'Error loading content'
      }
    }),
  )
  items.value = files.value.map((file, index) => ({
    key: `editor${index + 1}`,
    label: file,
    description: `Editor for ${file}`,
  }))
}

onMounted(() => {
  fetchFiles()
})

function handleMountEditor(editorInstance: any, index: number) {
  editors.value[index] = editorInstance
}

async function updateFile(index: number) {
  const filename = files.value[index]
  const model = codeEditors.value[index]
  try {
    if (filename && model) {
      isSubmitting.value = true
      const encodedModel = btoa(model)
      await useApiClient.updatePrismaFile(filename, encodedModel)
    }
    else {
      console.error('Filename or model is undefined')
    }
    toast.add({ title: `${filename} updated successfully!` })
  }
  catch (error: any) {
    const errorMessage = error.message || 'Unknown error'
    toast.add({ title: `${filename} not updated :^( ${errorMessage}`, color: 'red' })
    console.error('Error saving file:', error)
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="h-screen">
    <client-only>
      <UTabs :items="items">
        <template #item="{ index }">
          <div class="fullscreen-editor">
            <VueMonacoEditor
              v-model:value="codeEditors[index]"
              theme="prisma-theme"
              language="prisma"
              :options="MONACO_EDITOR_OPTIONS"
              @before-mount="(monaco) => configurePrismaLanguage(monaco)"
              @mount="(editorInstance) => handleMountEditor(editorInstance, index)"
            />
          </div>
          <div class="m-4">
            <UButton color="primary" variant="solid" class="m-3 float-right" @click="updateFile(index)">
              {{ items[index] ? `Update ${items[index].label}` : 'Update' }}
            </UButton>
          </div>
        </template>
      </UTabs>
    </client-only>
    <div v-if="isSubmitting" class="-mt-6 pb-6">
      <UProgress size="xs" animation="carousel" />
    </div>
  </div>
</template>

<style scoped>
.fullscreen-editor {
  @apply w-full h-[85vh];
}
</style>
