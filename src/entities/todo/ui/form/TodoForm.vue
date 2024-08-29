<script setup lang="ts">
import { useTodoForm } from '../../model'
import type { TodoForm } from '../../config';
import { computed } from 'vue';

interface Props {
  initialValues: TodoForm
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false
})
const emits = defineEmits<{
  submit: [todo: TodoForm]
}>()

const initialValues = computed(() => props.initialValues)

const { titleField, descriptionField, form } = useTodoForm(initialValues)

const submit = form.handleSubmit((todo) => {
  emits('submit', todo)
})
</script>

<template>
  <v-form
    fast-fail
    @submit="submit"
  >
    <v-text-field
      v-model="titleField.value.value"
      :error-messages="titleField.errorMessage.value"
      :loading="loading"
      :disabled="disabled"
      label="Title"
    />

    <v-text-field
      v-model="descriptionField.value.value"
      :error-messages="descriptionField.errorMessage.value"
      :loading="loading"
      :disabled="disabled"
      label="Description"
    />

    <slot
      name="actions"
      :meta="form.meta"
    />
  </v-form>
</template>
