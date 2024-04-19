import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoUpdateSchema } from '../config'
import { todoKeys, updateTodo as updateTodoApi, type Todo } from '@/shared/api/todos'

export function useTodoUpdate() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: Todo) => updateTodoApi(todo),
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
    await todoUpdateSchema.validate(todo)
    await mutation.mutateAsync(todo)
  }

  return { ...mutation, updateTodo }
}
