import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoKeys, type Todo, deleteTodo }  from '@/shared/api/todos'

export function useTodoDelete() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return deleteTodo(id)
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
