import api from '@/shared/api/todos'
import type { Todo, TodoCreateDto } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoSchemaCreate } from '../config'
import { todoKeys } from '../queries'

export function useTodoCreate() {
  const initialTodo = todoSchemaCreate.getDefault() as TodoCreateDto
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: TodoCreateDto): Promise<Todo> => api.createTodo(todo),
    onSuccess: (createdTodo: Todo) => {
      queryClient.setQueryData<Todo>(
        todoKeys.detail(createdTodo.id),
        () => createdTodo
      )

      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (old) => {
        if (!old) {
          return
        }
        return [...old, createdTodo]
      })

      queryClient.invalidateQueries({ queryKey: todoKeys.detail(createdTodo.id) })
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    }
  })

  const createTodo = async (creatingTodo: TodoCreateDto) => {
    await todoSchemaCreate.validate(creatingTodo)
    await mutation.mutateAsync(creatingTodo)
  }

  return { initialTodo, ...mutation, createTodo }
}
