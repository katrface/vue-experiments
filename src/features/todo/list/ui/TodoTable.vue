<script setup lang="ts">
import { TodoTable, useTodoList } from '@/entities/todo'

const { data: todos, isFetching, isLoading, refetch } = useTodoList()
</script>

<template>
  <v-col>
    <slot
      name="prepend"
      :refetch
      :is-fetching
    />
    <TodoTable
      :todos="todos ?? []"
      :loading="isFetching"
      :skeleton="isLoading"
    >
      <template #actions="{ item }">
        <slot
          name="actions"
          :item="item"
        />
      </template>
    </TodoTable>
  </v-col>
</template>

<style>
.v-data-table__tr:has(.deleting) {
  opacity: 0.5;
  cursor: wait;
}
</style>
