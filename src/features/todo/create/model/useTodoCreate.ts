import type { Todo, TodoCreateDto } from '@/shared/api/todos'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoCreateSchema } from '../config'
import { todoKeys, createTodo as createTodoApi } from '@/shared/api/todos'

export function useTodoCreate() {
  const initialTodo = todoCreateSchema.getDefault() as TodoCreateDto
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: TodoCreateDto): Promise<Todo> => createTodoApi(todo),
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
    await todoCreateSchema.validate(creatingTodo)
    await mutation.mutateAsync(creatingTodo)
  }

  return { initialTodo, ...mutation, createTodo }
}
