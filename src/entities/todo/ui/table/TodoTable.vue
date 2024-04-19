<script setup lang="ts">
import { headers } from '../../config'
import type { Todo } from '@/shared/api/todos';

interface Props {
  todos: Todo[]
  skeleton: boolean
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="todos"
    hover
  >
    <template #item.actions="{ item }">
      <slot
        name="actions"
        :item="item"
      />
    </template>
    <template
      v-if="skeleton"
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
