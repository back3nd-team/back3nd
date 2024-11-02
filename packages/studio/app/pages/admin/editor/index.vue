<script setup lang="ts">
import { initializePrismaEditor } from '@/composables/useEditor'
import { onMounted, ref } from 'vue'

definePageMeta({
  title: 'Schema Editor',
  ssr: false,
})

const editorContainer = ref(null)
const editorInstance = ref(null)
const initialSchemaContent = `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(uuid())
  email String @unique
}`

onMounted(async () => {
  if (editorContainer.value) {
    editorInstance.value = await initializePrismaEditor(editorContainer.value, initialSchemaContent)
  }
})
</script>

<template>
  <div ref="editorContainer" class="editor-container h-[600px]" />
</template>

<style scoped>
.editor-container {
  border: 1px solid #d1d5db;
  height: 600px;
  min-height: 400px;
}
</style>
