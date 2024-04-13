<script setup lang="ts">
import type { ServiceNavItem } from '../../types'

interface Props {
  service: ServiceNavItem
  isCompact: boolean
}
defineProps<Props>()
</script>

<template>
  <v-tooltip
    :text="service.title"
    :disabled="!isCompact"
  >
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="service.icon"
        :title="service.title"
        class="text-subtitle-1"
        nav
      >
        <template #prepend>
          <v-avatar
            color="blue"
            size="small"
            class="ml-1"
            style="min-width: 32px; min-height: 32px"
          >
            <v-icon
              color="white"
              :icon="service.icon"
              size="small"
            />
          </v-avatar>
        </template>
        <template #title>
          <span class="text-subtitle-1 ml-2">
            {{ service.title }}
          </span>
        </template>
      </v-list-item>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
