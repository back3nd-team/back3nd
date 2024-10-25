<script setup lang="ts">
import AddFieldForm from './AddFieldForm.vue'
import FieldList from './FieldList.vue'

const props = defineProps({
  fields: Array,
  onAddField: Function,
  onDeleteField: Function,
  fieldError: String,
})
</script>

<template>
  <AddFieldForm :on-add-field="props.onAddField" :field-error="props.fieldError" />
  <FieldList :fields="props.fields" :on-delete-field="props.onDeleteField" />
</template>
