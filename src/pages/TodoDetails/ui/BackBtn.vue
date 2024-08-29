<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toTable = async () => {
  router.push({ name: 'todo-list' })
}
</script>

<template>
  <v-btn
    prepend-icon="mdi-arrow-left"
    class="mt-2"
    type="submit"
    block
    @click="toTable"
  >
    Назад к таблице
  </v-btn>
</template>
