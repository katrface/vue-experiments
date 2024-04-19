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
    v-model:todo="initialTodo"
    :initial-todo="initialTodo"
    :submitting="isPending"
    btn-text="Create"
    @submit="create"
  />
</template>
