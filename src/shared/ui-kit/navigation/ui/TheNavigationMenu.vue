<script setup lang="ts">
import NavCompactBtn from './components/NavCompactBtn.vue'
import NavMenuItem from './components/NavMenuItem.vue'
import ServiceNavHeader from './components/ServiceNavHeader.vue'
import NavAllServiceBtn from './components/NavAllServiceBtn.vue'
import TheNavAllServicePanel from './TheNavAllServicePanel.vue'

import type { ServiceNavItem, ServiceSubnavItem } from '../types'
import { computed, ref } from 'vue'

interface Props {
  currentService: ServiceNavItem;
  services: ServiceNavItem[];
  supportNavItem: ServiceSubnavItem;
}

const props = defineProps<Props>()

const isCompact = ref(false)

const subnavItems = computed<ServiceSubnavItem[]>(() => props.currentService.subnav ?? []);
</script>

<template>
  <v-navigation-drawer
    :rail="isCompact"
    permanent
  >
    <div class="d-flex flex-column fix-navigation-drawer pt-2">
      <ServiceNavHeader
        :is-compact="isCompact"
        :service="currentService"
      />
      <NavAllServiceBtn :is-compact="isCompact" />
      <v-divider class="mt-2" />
      <v-list
        density="compact"
        nav
        class="mb-auto"
      >
        <NavMenuItem
          v-for="subnav in subnavItems"
          :key="subnav.name"
          :service-subnav-item="subnav"
          :is-compact="isCompact"
        />
      </v-list>
      <v-list
        density="compact"
        nav
      >
        <NavMenuItem
          :service-subnav-item="supportNavItem"
          :is-compact="isCompact"
        />
        <slot
          name="account"
          :is-compact="isCompact"
        />
      </v-list>
      <NavCompactBtn v-model="isCompact" />
    </div>
  </v-navigation-drawer>
  <TheNavAllServicePanel :services="services" />
</template>

<style scoped>
.fix-navigation-drawer {
  flex: 0 1 auto;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>