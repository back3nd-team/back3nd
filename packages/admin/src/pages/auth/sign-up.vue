<script setup lang="ts">
import router from '@/router'
import { AuthService } from '@/services/AuthService'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { z } from 'zod'

const authService = new AuthService()
// Reactive states
const email = ref('')
const password = ref('')
const name = ref('')
const image = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const showPassword = ref(false)

// Validation schema with Zod
const registerSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().nonempty('Name is required'),
})

const errors = ref<Record<string, string[]>>({})

// Function to handle image preview
function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0] || null
  image.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  else {
    imagePreview.value = null
  }
}

async function register() {
  const validation = registerSchema.safeParse({
    email: email.value,
    password: password.value,
    name: name.value,
  })

  if (!validation.success) {
    errors.value = validation.error.flatten().fieldErrors
    toast.error('Please fix the errors before proceeding.')
    return
  }

  try {
    const response = await authService.register(
      email.value,
      password.value,
      name.value,
      imagePreview.value, // Envia a imagem como base64
    )
    if (response?.message) {
      errors.value = { email: [response.message as string] }
      toast.error(response.message)
      return
    }
    toast.success('User registered successfully!')
    setTimeout(async () => {
      await router.push('/auth/')
    }, 1000)
  }
  catch {
    toast.error('An unexpected error occurred.')
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center" max-width="500">
    <v-row cols="12" md="6" class="text-center">
      <v-col>
        <v-card class="pa-4" elevation="2">
          <v-card-title class="py-0 mx-auto d-flex align-center">
            <v-avatar class="me-2">
              <v-img src="/big-back3nd-logo.png" alt="Logo" max-height="40" contain />
            </v-avatar>
            <span>SIGN UP - ACCOUNT CREATION</span>
          </v-card-title>

          <v-card-subtitle class="text-center">
            Enter your details to create an account
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="Enter Name"
                :error="!!errors.name"
                :error-messages="errors.name"
              />
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
                label="Password"
                :error="!!errors.password"
                :error-messages="errors.password"
                @click:append="showPassword = !showPassword"
              />
              <v-file-input
                label="Upload Profile Image"
                accept="image/*"
                show-size
                @change="handleImageUpload"
              />
              <v-img
                v-if="imagePreview"
                :src="imagePreview"
                max-height="150"
                contain
                class="my-4"
              />
              <v-btn block variant="tonal" @click="register">
                Register
              </v-btn>
            </v-form>
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
