<script setup lang="ts">
import { ref } from 'vue'
import { PostgrestService } from '@/services/PostgrestService';

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
  { text: 'Table Name', value: 'name' },
  { text: 'Schema', value: 'schema' },
  { text: 'Rows', value: 'rows' },
  { text: '', value: 'actions', sortable: false },
]

const tables = ref<Table[]>([
  { name: 'users', schema: 'public', rows: 1000 },
  { name: 'orders', schema: 'public', rows: 500 },
  { name: 'products', schema: 'inventory', rows: 300 },
])

const columnsByTable = ref<Record<string, Column[]>>({
  users: [
    { name: 'id', type: 'UUID', nullable: false },
    { name: 'email', type: 'VARCHAR(255)', nullable: false },
    { name: 'created_at', type: 'TIMESTAMP', nullable: false },
  ],
  orders: [
    { name: 'order_id', type: 'INTEGER', nullable: false },
    { name: 'user_id', type: 'UUID', nullable: false },
    { name: 'status', type: 'VARCHAR(50)', nullable: true },
  ],
  products: [
    { name: 'product_id', type: 'INTEGER', nullable: false },
    { name: 'name', type: 'VARCHAR(255)', nullable: false },
    { name: 'price', type: 'DECIMAL(10, 2)', nullable: false },
  ],
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
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>PostgreSQL Tables</v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:expanded-row="{ item }">
      <tr>
        <td :colspan="4">
          <v-simple-table>
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
          </v-simple-table>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
