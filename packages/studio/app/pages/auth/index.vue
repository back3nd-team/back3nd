<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
})

const state = ref({
  email: '',
  password: '',
})

const router = useRouter()

const loginSchema = z.object({
  email: z.string().email('E-mail is invalid'),
  password: z.string().min(6, 'The password must have at least 6 characters'),
})

const errors = ref<{ email?: string[], password?: string[] }>({})

async function login() {
  const result = loginSchema.safeParse(state.value)

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as { email?: string[], password?: string[] }
    return
  }
  try {
    await useApiClient.login(state.value.email, state.value.password)
    console.warn('Login successful')
    router.push('/admin')
  }
  catch (error) {
    console.error('Login failed:', error)
    errors.value = { email: ['Login failed'], password: [] }
  }
}
</script>

<template>
  <UForm :state="state" :error="Object.keys(errors).length > 0" @submit.prevent="login">
    <UFormGroup label="E-mail" :error="errors.email?.[0]" class="mb-4">
      <UInput
        id="email"
        v-model="state.email"
        type="email"
        required
        placeholder="E-mail address"
        :error="errors.email?.[0]"
      />
    </UFormGroup>

    <UFormGroup label="Password" :error="errors.password?.[0]" class="mb-4 relative">
      <UInput
        id="password"
        v-model="state.password"
        type="password"
        required
        placeholder="Input password"
        :error="errors.password?.[0]"
      />
      <button type="button" class="absolute right-3 top-9 text-gray-400">
        <i class="fas fa-eye" />
      </button>
    </UFormGroup>

    <UButton
      type="submit"
      block
      label="Sign in"
      size="lg"
    />

    <div class="text-center mt-4">
      <NuxtLink to="/forgot-password" class="text-yellow-400 hover:underline">
        Forgot my password
      </NuxtLink>
    </div>
  </UForm>
</template>
