<script setup lang="ts">
import type { ServiceSubnavItem } from '../../types'

interface Props {
  serviceSubnavItem: ServiceSubnavItem
  isCompact: boolean
}

defineProps<Props>()
</script>
<template>
  <v-tooltip
    :text="serviceSubnavItem.title"
    :disabled="!isCompact"
  >
    <template #activator="{ props }">
      <RouterLink
        v-bind="props"
        :to="{ name: serviceSubnavItem.name }"
        class="fix-link"
      >
        <v-list-item
          :active="false"
          :prepend-icon="serviceSubnavItem.icon"
          :title="serviceSubnavItem.title"
          :value="serviceSubnavItem.name"
        />
      </RouterLink>
    </template>
  </v-tooltip>
</template>

<style scoped>
.fix-link {
  text-decoration: none;
  color: inherit;
}
</style>
