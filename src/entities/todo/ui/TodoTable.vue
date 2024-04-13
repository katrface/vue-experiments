<script setup lang="ts">
import { useTodoList } from '../model/useTodoList'
import { headers } from '../config'
import { useRouter } from 'vue-router'
import TodoDeleteIcon from './TodoDeleteIcon.vue'

const { data: todos, isFetching, isLoading, refetch } = useTodoList()

const router = useRouter()

const pushToEdit = (id: number) => {
  router.push({ name: 'todo-list-details', params: { id } })
}
const pushToCreate = () => {
  router.push({ name: 'todo-list-create' })
}
</script>

<template>
  <div class="text-center">
    <v-btn
      append-icon="mdi-plus"
      variant="text"
      @click="pushToCreate"
    >
      Create
    </v-btn>
    <v-btn
      :disabled="isFetching"
      append-icon="mdi-refresh"
      variant="text"
      @click="refetch"
    >
      Refresh
    </v-btn>
  </div>

  <v-data-table
    :loading="isFetching"
    :headers="headers"
    :items="todos"
    class="table"
    hover
  >
    <template #item.actions="{ item }">
      <v-btn
        density="compact"
        icon="mdi-pencil"
        @click="() => pushToEdit(item.id)"
      />
      <TodoDeleteIcon :id="item.id" />
    </template>
    <template
      v-if="isLoading"
      #loading
    >
      <v-skeleton-loader type="table-row-divider@10" />
    </template>
  </v-data-table>
</template>

<style>
.v-data-table__tr:has(.deleting) {
  opacity: 0.5;
  cursor: wait;
}
</style>
