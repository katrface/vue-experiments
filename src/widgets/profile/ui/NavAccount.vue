<script setup lang="ts">
import { ref } from 'vue';
import NavAccountCard from './NavAccountCard.vue'

const ACCOUNT = {
  title: 'Учетная запись',
  value: 'account',
  to: '/account',
  icon: 'mdi-account'
}

defineProps({
  isCompact: Boolean,
})
const isMenuOpened = ref(false)
</script>

<template>
  <v-menu
    v-model="isMenuOpened"
    :close-on-content-click="false"
    location="end"
  >
    <template #activator="{ props: onMenu }">
      <v-tooltip
        :text="ACCOUNT.title"
        :disabled="!isCompact || isMenuOpened"
      >
        <template #activator="{ props: onTooltip }">
          <v-list-item
            v-bind="{ ...onMenu, ...onTooltip }"
            :active="false"
            :prepend-icon="ACCOUNT.icon"
            :title="ACCOUNT.title"
            :value="ACCOUNT.value"
          />
        </template>
      </v-tooltip>
    </template>

    <NavAccountCard class="ml-4" />
  </v-menu>
</template>