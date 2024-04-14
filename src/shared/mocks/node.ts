import { setupServer } from 'msw/node'
import { handlers } from './todo'

export const server = setupServer(...handlers)
