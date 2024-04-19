<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView, useRoute } from 'vue-router'
import { services, SUPPORT } from '@/app/config'
import {
  DEFAULT_NAV_ITEM,
  type ServiceNavItem,
  TheNavigationMenu
} from '@/shared/ui-kit/navigation'
import { NavAccount } from '@/widgets/profile'
import { computed } from 'vue'

const route = useRoute()

const currentService = computed<ServiceNavItem>(() => {
  const routeName = (route.name as string) ?? ''
  return services.find((serv) => routeName.startsWith(serv.name)) ?? DEFAULT_NAV_ITEM
})

const isDevMode = import.meta.env.DEV
</script>

<template>
  <v-app>
    <v-layout>
      <TheNavigationMenu
        :current-service="currentService"
        :services="services"
        :support-nav-item="SUPPORT"
      >
        <template #account="{ isCompact }">
          <NavAccount :is-compact="isCompact" />
        </template>
      </TheNavigationMenu>
      <v-main class="overflow-auto main">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
  <VueQueryDevtools v-if="isDevMode" />
</template>

<style scoped>
.main {
  height: 100vh;
  widows: 600px;
}
</style>
