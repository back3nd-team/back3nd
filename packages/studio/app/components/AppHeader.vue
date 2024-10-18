<script setup lang="ts">
const navigation = inject<Ref>('navigation', ref([]))

const links = [{
  label: 'Docs',
  to: '/docs',
}, {
  label: 'Pricing',
  to: '/pricing',
}, {
  label: 'Blog',
  to: '/blog',
}]
</script>

<template>
  HEADER
  <UHeader :links="links">
    <template #logo>
      Nuxt UI Pro <UBadge
        label="SaaS"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UButton
        label="Sign in"
        color="gray"
        to="/login"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="navigation"
        default-open
      />
    </template>
  </UHeader>
</template>
