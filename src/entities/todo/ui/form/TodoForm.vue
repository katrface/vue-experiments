<script setup lang="ts">
import { useTodoForm } from '../../model'
import { computed } from 'vue'
import type { TodoForm } from '../../config';

interface Props {
  submitting: boolean
  loading?: boolean
  disabled?: boolean
  btnText: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false
})
const emits = defineEmits<{
  submit: [todo: TodoForm]
}>()

const todo = defineModel<TodoForm>('todo', { required: true })

const { titleField, descriptionField, form } = useTodoForm(todo)

const submit = form.handleSubmit((todo) => {
  emits('submit', todo)
})

const disabledSubmitBtn = computed(
  () => props.disabled || !form.meta.value.valid || !form.meta.value.dirty
)
</script>

<template>
  <v-form
    fast-fail
    @submit.prevent
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

    <v-btn
      :loading="submitting"
      :disabled="disabledSubmitBtn"
      class="mt-2"
      type="submit"
      block
      @click="submit"
    >
      {{ btnText }}
    </v-btn>
  </v-form>
</template>
