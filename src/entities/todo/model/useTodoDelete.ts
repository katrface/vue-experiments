import api from '@/shared/api/todos'
import type { Todo } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoKeys } from '../queries'

export function useTodoDelete() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return api.deleteTodo(id)
    },
    onSuccess: (_, id: number) => {
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (old) =>
        old?.filter((todo) => todo.id !== id)
      )

      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
      queryClient.removeQueries({ queryKey: todoKeys.detail(id) })
    }
  })

  return { ...mutation, deleteTodoById: mutation.mutate }
}
