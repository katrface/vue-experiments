import { useQuery } from '@tanstack/vue-query'
import { todoKeys, fetchTodos } from '@/shared/api/todos'

export function useTodoList() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: () => fetchTodos()
  })
}
