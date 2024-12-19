<script setup lang="ts">
</script>

<template>
  <v-app>
    <!-- Barra Superior -->
    <v-app-bar flat color="transparent" class="d-flex justify-space-between">
      <v-app-bar-title class="text-h5">
        BACK3ND
      </v-app-bar-title>
      <div class="d-flex align-center">
        <v-btn variant="text" to="/auth/sign-up" class="ml-4">
          Sign up
        </v-btn>
        <v-btn variant="outlined" color="primary" class="mr-4">
          DOCS
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center">
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <!-- Rodapé -->
    <v-footer class="text-center text-body-small" color="transparent">
      Copyright @BACK3ND 2024 | Privacy Policy
    </v-footer>
  </v-app>
</template>

<style scoped>
/* Adicione estilos customizados, se necessário */
</style>
