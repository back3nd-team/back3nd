<script setup lang="ts">
definePageMeta({
  title: 'Fields',
  breadcrumb: [
    { label: 'Admin', to: '/admin' },
    { label: 'Collections', to: '/admin/collections' },
    { label: 'Fields', to: '/admin/collections/edit/' },
  ],
})
const route = useRoute()
const ENTITY_ID = route.params.entity

/**
 * @TODO
 *  - Get the name of collection
 *  - Get the fields of collection
 *  - Get the roles of collection
 *  - Get the permissions of collection
 *
 */
</script>

<template>
  <div>
    <p>{{ $route.params.entity }}  </p>
    ENTITY_ID: {{ ENTITY_ID }}
    <CreateFieldsForm />
  </div>
</template>
