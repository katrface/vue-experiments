<script setup lang="ts">
import type { Todo } from '@/shared/api/todos/types';

interface Props {
  initialTodo: Todo
  submitting: boolean
  loading?: boolean
  disabled?: boolean
  btnText: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
})
const emits = defineEmits<{
  submit: []
}>()

const mutatingTodo = defineModel<Todo>('mutatingTodo', { required: true })

const submit = async () => {
  emits('submit')
}

</script>

<template>
  <v-form
    fast-fail
    @submit.prevent
  >
    <v-text-field
      v-model="mutatingTodo.title"
      :loading="loading"
      :disabled="disabled"
      label="Title"
    />

    <v-text-field
      v-model="mutatingTodo.description"
      :loading="loading"
      :disabled="disabled"
      label="Description"
    />

    <v-btn
      :loading="submitting"
      :disabled="disabled"
      class="mt-2"
      type="submit"
      block
      @click="submit"
    >
      {{ btnText }}
    </v-btn>
  </v-form>
</template>
