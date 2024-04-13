<script setup lang="ts">
import type { ServiceNavItem } from '../../types'

interface Props {
  service: ServiceNavItem
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    class="fix-link"
    :to="{ name: service.name }"
  >
    <v-hover>
      <template #default="{ isHovering, props }">
        <v-card
          v-bind="props"
          width="272"
          height="126"
          class="py-2 rounded-lg"
          :class="isHovering ? 'bg-grey-lighten-4' : undefined"
          flat
          border
        >
          <template #title>
            <v-btn
              disabled
              size="x-small"
              :icon="service.icon"
              variant="text"
              class="bg-blue fix-opacity mr-2"
            />
            <span class="text-subtitle-1 font-weight-bold">{{ service.title }}</span>
          </template>

          <template #subtitle>
            <div
              class="mt-3"
              style="white-space: normal"
            >
              {{ service.description }}
            </div>
          </template>
        </v-card>
      </template>
    </v-hover>
  </RouterLink>
</template>
<style scoped>
.fix-link {
  text-decoration: none;
}

.fix-opacity {
  opacity: 1;
}
</style>
