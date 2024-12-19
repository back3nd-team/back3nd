<script setup lang="ts">
import router from '@/router'
import { AuthService } from '@/services/AuthService'
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'
import { z } from 'zod'

const authStore = useAuthStore()
const authService = new AuthService()

// Reactive states
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// Validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Validation errors
const errors = ref<{ email: string[] | string, password: string[] | string }>({ email: '', password: '' })

// Login function
async function login() {
  const validation = loginSchema.safeParse({ email: email.value, password: password.value })
  if (!validation.success) {
    errors.value = {
      email: validation.error.flatten().fieldErrors.email || '',
      password: validation.error.flatten().fieldErrors.password || '',
    }
  }
  else {
    try {
      const user = await authService.login(email.value, password.value)
      authStore.login(user)
      errors.value = { email: '', password: '' }
      await router.push({ path: '/' })
    }
    catch (error) {
      console.error('Login failed', error)
      errors.value = { email: '', password: 'Login failed. Please check your credentials and try again.' }
    }
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center" max-width="500">
    <v-row cols="12" md="6" class="text-center">
      <v-col>
        <v-card class="pa-4" elevation="2">
          <v-card-title class="py-0 mt-n8 mx-auto">
            <v-img src="/big-back3nd-logo.png" height="250" />
          </v-card-title>
          <v-card-subtitle class="text-center">
            Hey, Enter your details to get sign in to your account
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Enter Email"
                :error="!!errors.email"
                :error-messages="errors.email"
              />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Passcode"
                :error="!!errors.password"
                :error-messages="errors.password"
                @click:append="showPassword = !showPassword"
              />
              <v-btn block variant="tonal" @click="login">
                Sign in
              </v-btn>
            </v-form>
            <p class="text-right pt-4">
              <v-btn variant="text">
                Forgot Password?
              </v-btn>
            </p>
            <p class="text-center pt-4">
              Sign in with —
            </p>
            <div class="d-flex justify-center">
              <v-btn icon color="primary">
                <v-icon>mdi-google</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-apple</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
