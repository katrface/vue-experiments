import api from '@/shared/api/todos'
import { useQuery } from '@tanstack/vue-query'
import { todoKeys } from '../queries'

export function useTodoList() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: () => api.fetchTodos()
  })
}
