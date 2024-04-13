<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import { useTodoCreate } from '@/entities/todo/model/useTodoCreate';

const emits = defineEmits<{
  created: []
}>()

const { initialTodo, creatingTodo, isPending, createTodo } = useTodoCreate()

const create = async () => {
  await createTodo()
  emits('created')
}

</script>

<template>
  <TodoForm
    v-model:mutating-todo="creatingTodo"
    :initial-todo="initialTodo"
    :submitting="isPending"
    btn-text="Create"
    @submit="create"
  />
</template>
