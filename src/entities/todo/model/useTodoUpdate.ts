import api, { TODOS_TOKENS } from '@/shared/api/todos'
import type { Todo } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoSchema } from '../config'

export function useTodoUpdate() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: Todo) => api.updateTodo(todo),
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData<Todo>(
        [TODOS_TOKENS.fetchTodoDetails, updatedTodo.id],
        () => updatedTodo
      )

      queryClient.setQueryData<Todo[]>([TODOS_TOKENS.fetchTodos], (old) => {
        if (!old) {
          return
        }
        return old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      })

      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodoDetails, updatedTodo.id] })
      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodos] })
    }
  })

  const updateTodo = async (todo: Todo) => {
    await todoSchema.validate(todo)
    await mutation.mutateAsync(todo)
  }

  return { ...mutation, updateTodo }
}
