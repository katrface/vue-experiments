import api, { TODOS_TOKENS } from '@/shared/api/todos'
import type { Todo } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useTodoDelete() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return api.deleteTodo(id)
    },
    onSuccess: (_, id: number) => {
      queryClient.setQueryData<Todo[]>([TODOS_TOKENS.fetchTodos], (old) =>
        old?.filter((todo) => todo.id !== id)
      )

      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodos] })
      queryClient.removeQueries({ queryKey: [TODOS_TOKENS.fetchTodoDetails, id] })
    },
  })

  return { ...mutation, deleteTodoById: mutation.mutate }
}
