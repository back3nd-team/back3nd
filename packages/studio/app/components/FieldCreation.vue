<script setup lang="ts">
const props = defineProps({
  fields: Array,
  onAddField: Function,
  onDeleteField: Function,
  fieldError: String,
})
</script>

<template>
  <FieldList :fields="props.fields" :on-delete-field="props.onDeleteField" />
  <AddFieldForm :on-add-field="props.onAddField" :field-error="props.fieldError" />
</template>
