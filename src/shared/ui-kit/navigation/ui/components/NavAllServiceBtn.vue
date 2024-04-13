<script setup lang="ts">
import { useSubnavStore } from '../../stores/navigation'

interface Props {
  isCompact: boolean
}

const subnav = useSubnavStore()

defineProps<Props>()

const onClick = () => {
  subnav.changeDrawer()
}
</script>

<template>
  <v-tooltip
    text="Все сервисы"
    :disabled="!isCompact"
  >
    <template #activator="{ props }">
      <v-list
        v-bind="props"
        density="compact"
        nav
        class="py-0"
      >
        <v-list-item
          :active="false"
          prepend-icon="mdi-dots-grid"
          title="Все сервисы"
          value="all-service"
          class="py-0"
          @click="onClick"
        />
      </v-list>
    </template>
  </v-tooltip>
</template>
