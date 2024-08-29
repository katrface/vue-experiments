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
    :initial-values="todo"
    :loading="isFetching"
    @submit="update"
  >
    <template #actions="{ meta }">
      <v-btn
        :loading="isPending"
        :disabled="!isFetched || !meta.value.valid || !meta.value.dirty"
        class="mt-2"
        type="submit"
        block
      >
        Update
      </v-btn>
    </template>
  </TodoForm>
</template>
