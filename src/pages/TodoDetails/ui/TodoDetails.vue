<script setup lang="ts">
import { TodoFormCreate } from '@/features/todo/create';
import { TodoFormUpdate } from '@/features/todo/update'

import { useRouter } from 'vue-router'

interface Props {
  id?: number
}

defineProps<Props>()

const router = useRouter()

const submitted = async () => {
  router.push({ name: 'todo-list' })
}
</script>

<template>
  <v-sheet
    class="mx-auto"
    width="300"
  >
    <TodoFormUpdate
      v-if="id"
      :id="id"
      @updated="submitted"
    />
    <TodoFormCreate
      v-else
      @created="submitted"
    />
  </v-sheet>
</template>
