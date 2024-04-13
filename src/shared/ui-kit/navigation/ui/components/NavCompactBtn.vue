<script setup lang="ts">
const isCompact = defineModel<boolean>({ required: true })

const onClick = () => {
  isCompact.value = !isCompact.value
}
</script>

<template>
  <v-divider />
  <v-btn
    variant="plain"
    :icon="isCompact ? 'mdi-chevron-right' : 'mdi-chevron-left'"
    height="20"
    size="small"
    class="rounded-0 w-100"
    @click="onClick"
  />
</template>