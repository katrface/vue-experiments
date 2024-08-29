<script setup lang="ts">
import { TodoForm } from '@/entities/todo'
import { useTodoCreate } from '../model'
import type { TodoCreateDto } from '@/shared/api/todos'

const emits = defineEmits<{
  created: []
}>()

const { initialTodo, isPending, createTodo } = useTodoCreate()

const create = async (creatingTodo: TodoCreateDto) => {
  await createTodo(creatingTodo)
  emits('created')
}
</script>

<template>
  <TodoForm
    :initial-values="initialTodo"
    :submitting="isPending"
    @submit="create"
  >
    <template #actions="{ meta }">
      <v-btn
        :loading="isPending"
        :disabled="!meta.value.valid || !meta.value.dirty"
        class="mt-2"
        type="submit"
        block
      >
        Create
      </v-btn>
    </template>
  </TodoForm>
</template>
