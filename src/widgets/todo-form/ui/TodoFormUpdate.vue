<script setup lang="ts">
import { useTodo } from '@/entities/todo/model/useTodo';
import { useTodoUpdate } from '@/entities/todo/model/useTodoUpdate';
import TodoForm from './TodoForm.vue';

interface Props {
  id: number
}

const props = defineProps<Props>()
const emits = defineEmits<{
  updated: []
}>()

const { data: initialTodo, isFetching, isFetched } = useTodo(props.id)

const { updatingTodo, isPending, updateTodo } = useTodoUpdate(initialTodo)

const update = async () => {
  await updateTodo()
  emits('updated')
}

</script>

<template>
  <TodoForm
    v-model:mutating-todo="updatingTodo"
    :initial-todo="initialTodo"
    :loading="isFetching"
    :disabled="!isFetched"
    :submitting="isPending"
    btn-text="Update"
    @submit="update"
  />
</template>
