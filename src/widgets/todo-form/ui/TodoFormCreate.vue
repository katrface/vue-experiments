<script setup lang="ts">
import TodoForm from './TodoForm.vue'
import { useTodoCreate } from '@/entities/todo/model/useTodoCreate'
import type { TodoCreateDto } from '@/shared/api/todos/types'

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
