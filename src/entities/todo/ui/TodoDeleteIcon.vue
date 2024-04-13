<script setup lang="ts">
import { useTodoDelete } from '../model/useTodoDelete'

interface Props {
  id: number
}

defineProps<Props>()
const { isPending, deleteTodoById } = useTodoDelete()
</script>
<template>
  <v-btn
    :class="{ deleting: isPending }"
    :loading="isPending"
    density="compact"
    icon="mdi-delete"
    @click="() => deleteTodoById(id)"
  />
</template>
