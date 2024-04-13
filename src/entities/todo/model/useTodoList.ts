import api, { TODOS_TOKENS } from '@/shared/api/todos'
import { useQuery } from '@tanstack/vue-query'

export function useTodoList() {
  return useQuery({
    queryKey: [TODOS_TOKENS.fetchTodos],
    queryFn: () => api.fetchTodos()
  })
}
