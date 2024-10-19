<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
})

const state = ref({
  email: '',
  password: '',
})

const loginSchema = z.object({
  email: z.string().email('E-mail is invalid'),
  password: z.string().min(6, 'The password must have at least 6 characters'),
})

const errors = ref<{ email?: string[], password?: string[] }>({})

function login() {
  const result = loginSchema.safeParse(state.value)

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as { email?: string[], password?: string[] }
    return
  }

  console.warn('Login successful')
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
        placeholder="Digite seu e-mail"
        :error="errors.email?.[0]"
      />
    </UFormGroup>

    <UFormGroup label="Password" :error="errors.password?.[0]" class="mb-4 relative">
      <UInput
        id="password"
        v-model="state.password"
        type="password"
        required
        placeholder="Digite sua senha"
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
