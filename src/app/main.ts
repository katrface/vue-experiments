import '@/app/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      }
    }
  }
}

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../shared/mocks/browser.js')
    return worker.start({
      onUnhandledRequest(request, print) {
        // Ignore any requests containing "cdn.com" in their URL.
        const url = new URL(request.url)
        if (!url.pathname.startsWith('/api')) {
          return
        }
        
        // Otherwise, print an unhandled request warning.
        print.warning()
      },
    })
  }

  return Promise.resolve()
}

prepareApp().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(vuetify)
  app.use(VueQueryPlugin, vueQueryPluginOptions)
  app.use(router)
  app.mount('#app')
})
