<script setup lang="ts">
import { TodoTable } from '@/features/todo/list'
import { useRouter } from 'vue-router';
import { TodoDeleteIcon } from '@/features/todo/delete'

const router = useRouter()

const pushToEdit = (id: number) => {
  router.push({ name: 'todo-list-details', params: { id } })
}
const pushToCreate = () => {
  router.push({ name: 'todo-list-create' })
}
</script>

<template>
  <v-sheet class="d-flex flex-column">
    <TodoTable>
      <template #prepend="{ refetch, isFetching }">
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
      </template>
      <template #actions="{ item }">
        <v-btn
          density="compact"
          icon="mdi-pencil"
          @click="() => pushToEdit(item.id)"
        />
        <TodoDeleteIcon :id="item.id" />
      </template>
    </TodoTable>
  </v-sheet>
</template>
