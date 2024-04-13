import api from '@/shared/api/todos'
import type { Todo } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoSchema } from '../config'
import { todoKeys } from '../queries'

export function useTodoUpdate() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: Todo) => api.updateTodo(todo),
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData<Todo>(
        todoKeys.detail(updatedTodo.id),
        () => updatedTodo
      )

      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (old) => {
        if (!old) {
          return
        }
        return old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      })

      queryClient.invalidateQueries({ queryKey: todoKeys.detail(updatedTodo.id) })
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    }
  })

  const updateTodo = async (todo: Todo) => {
    await todoSchema.validate(todo)
    await mutation.mutateAsync(todo)
  }

  return { ...mutation, updateTodo }
}
