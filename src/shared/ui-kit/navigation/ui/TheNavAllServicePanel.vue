<script setup lang="ts">
import AllServicePanel from './AllServicePanel.vue'
import { useSubnavStore } from '../stores/navigation'
import type { ServiceNavItem } from '../types'

interface Props {
  services: ServiceNavItem[]
}

defineProps<Props>()

const subnav = useSubnavStore()
</script>

<template>
  <v-navigation-drawer
    v-model="subnav.drawer"
    temporary
    width="600"
  >
    <v-container>
      <h3 class="ml-2">
        Все сервисы
      </h3>
    </v-container>
    <v-divider />
    <v-container>
      <AllServicePanel :services="services" />
    </v-container>
  </v-navigation-drawer>
</template>
