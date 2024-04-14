import { setupWorker } from 'msw/browser'
import { handlers } from './todo'

export const worker = setupWorker(...handlers)


export const startWorker = () => {
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