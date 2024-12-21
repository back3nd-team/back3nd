<script setup lang="ts">
import { SwaggerUIBundle } from 'swagger-ui-dist'
import { onMounted } from 'vue'
import { PostgrestService } from '../../services/PostgrestService'
import 'swagger-ui-dist/swagger-ui.css'
import 'swagger-ui-themes/themes/3.x/theme-material.css'

const swaggerUrl = import.meta.env.VITE_POSTGRES_API_URL
const postgrestService = new PostgrestService()

onMounted(async () => {
  const token = await postgrestService.fetchToken()
  SwaggerUIBundle({
    dom_id: '#swagger-ui',
    url: swaggerUrl,
    requestInterceptor: (req: any) => {
      req.headers.Authorization = `Bearer ${token}`
      return req
    },
  })
})
</script>

<template>
  <v-container>
    <div id="swagger-ui" />
  </v-container>
</template>

  <style scoped>
  #swagger-ui {
    margin-top: 16px;
  }
  </style>
