<script setup lang="ts">
import { useTodo, TodoForm } from '@/entities/todo'
import type { Todo, TodoCreateDto } from '@/shared/api/todos'
import { useTodoUpdate } from '../model';

interface Props {
  id: number
}

const props = defineProps<Props>()
const emits = defineEmits<{
  updated: []
}>()

const { data: todo, isFetching, isFetched } = useTodo(props.id)

const { isPending, updateTodo } = useTodoUpdate()

const update = async (updatingTodo: TodoCreateDto) => {
  await updateTodo(updatingTodo as Todo)
  emits('updated')
}
</script>

<template>
  <TodoForm
    v-model:todo="todo"
    :loading="isFetching"
    :disabled="!isFetched"
    :submitting="isPending"
    btn-text="Update"
    @submit="update"
  />
</template>
