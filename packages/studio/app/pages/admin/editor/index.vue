<script lang="ts" setup>
import { loader, VueMonacoEditor } from '@guolao/vue-monaco-editor'

definePageMeta({
  title: 'Schema Editor',
  ssr: false,
})

if (import.meta.client) {
  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
    },
  })
}

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const files = ref<string[]>([])
const codeEditors = ref<string[]>([])
const items = ref<{ key: string, label: string, description: string }[]>([])
const editors = ref<any[]>([])

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
          console.error(`Erro ao decodificar o conteúdo de ${file}:`, error)
          return 'Erro ao carregar conteúdo'
        }
      }
      else {
        console.warn(`Formato inesperado do conteúdo para o arquivo: ${file}`)
        return 'Erro ao carregar conteúdo'
      }
    }),
  )

  items.value = files.value.map((file, index) => ({
    key: `editor${index + 1}`,
    label: file,
    description: `Editor para ${file}`,
  }))
}

onMounted(fetchFiles)

function handleMountEditor(editorInstance: any, index: number) {
  editors.value[index] = editorInstance
}
</script>

<template>
  <client-only>
    <UTabs :items="items" class="w-full">
      <template #item="{ index }">
        <div class="fullscreen-editor">
          <VueMonacoEditor
            v-model:value="codeEditors[index]"
            theme="vs-dark"
            language="typescript"
            :options="MONACO_EDITOR_OPTIONS"
            @mount="(editorInstance) => handleMountEditor(editorInstance, index)"
          />
          <UButton class="m-3 float-right">
            Save
          </UButton>
        </div>
      </template>
    </UTabs>
  </client-only>
</template>

<style scoped>
.fullscreen-editor {
  @apply w-full h-screen;
}
</style>
