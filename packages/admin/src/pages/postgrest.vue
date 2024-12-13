<script setup lang="ts">
import { PostgrestService } from '@/services/PostgrestService'
import { onMounted, ref } from 'vue'

const postgrestService = new PostgrestService()

interface Table {
  name: string
  schema: string
  rows: number
}

interface Column {
  name: string
  type: string
  nullable: boolean
}

const expanded = ref<string[]>([])
const tableHeaders = [
  { title: 'Table Name', value: 'name' },
  { title: 'Schema', value: 'schema' },
  { title: 'Rows', value: 'rows' },
  { title: '', value: 'actions', sortable: false },
]

const tables = ref<Table[]>([])
const columnsByTable = ref<Record<string, Column[]>>({})

onMounted(async () => {
  try {
    const openApiSpecs = await postgrestService.fetchOpenAPISchema()
    const paths = openApiSpecs.paths || {}
    const definitions = openApiSpecs.definitions || {}

    // Extracting tables
    tables.value = Object.keys(paths)
      .filter(path => path.startsWith('/') && path.trim() !== '')
      .map((path) => {
        const tableName = path.substring(1) // Remove the initial slash
        return {
          name: tableName,
          schema: 'public', // Adjust as necessary
          rows: 0, // Update with the actual row count, if available
        }
      })
      .filter(table => table.name)

    // Extracting columns by table
    columnsByTable.value = Object.entries(definitions).reduce((acc, [key, def]: any) => {
      const tableName = key.toLowerCase()
      const columns = Object.entries(def.properties || {}).map(([columnName, columnDef]: any) => ({
        name: columnName,
        type: columnDef.format || columnDef.type || 'unknown',
        nullable: columnDef.nullable || false,
      }))
      acc[tableName] = columns
      return acc
    }, {} as Record<string, Column[]>)
  }
  catch (error) {
    console.error('Erro ao buscar a especificação OpenAPI:', error)
  }
})
</script>

<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="tableHeaders"
    :items="tables"
    item-value="name"
    show-expand
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>PostgreSQL Tables</v-toolbar-title>
      </v-toolbar>
    </template>

    <template #expanded-row="{ item }">
      <tr>
        <td :colspan="4">
          <v-table>
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Type</th>
                <th>Nullable</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="column in columnsByTable[item.name]" :key="column.name">
                <td>{{ column.name }}</td>
                <td>{{ column.type }}</td>
                <td>{{ column.nullable ? 'Yes' : 'No' }}</td>
              </tr>
            </tbody>
          </v-table>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
