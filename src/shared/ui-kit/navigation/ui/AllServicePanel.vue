<script setup lang="ts">
import ServiceCard from './components/ServiceCard.vue'
import type { ServiceNavItem } from '../types'

interface Props {
  services: ServiceNavItem[]
}

defineProps<Props>()
</script>

<template>
  <v-container>
    <v-row class="service-grid">
      <ServiceCard
        v-for="service in services"
        :key="service.title"
        :service="service"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.service-grid {
  min-width: 576px;
  display: flex;
  gap: 20px;
}
</style>
