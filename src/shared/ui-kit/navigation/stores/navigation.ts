import { defineStore } from 'pinia'

export const useSubnavStore = defineStore('subnav', {
  state: () => {
    return { drawer: false }
  },
  actions: {
    changeDrawer() {
      this.drawer = !this.drawer
    }
  }
})
