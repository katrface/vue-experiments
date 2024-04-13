import api, { TODOS_TOKENS } from '@/shared/api/todos'
import type { Todo, TodoCreateDto } from '@/shared/api/todos/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoSchemaCreate } from '../config'

export function useTodoCreate() {
  const initialTodo = todoSchemaCreate.getDefault() as TodoCreateDto
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: TodoCreateDto): Promise<Todo> => api.createTodo(todo),
    onSuccess: (createdTodo: Todo) => {
      queryClient.setQueryData<Todo>(
        [TODOS_TOKENS.fetchTodoDetails, createdTodo.id],
        () => createdTodo
      )

      queryClient.setQueryData<Todo[]>([TODOS_TOKENS.fetchTodos], (old) => {
        if (!old) {
          return
        }
        return [...old, createdTodo]
      })

      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodoDetails, createdTodo.id] })
      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodos] })
    }
  })

  const createTodo = async (creatingTodo: TodoCreateDto) => {
    await todoSchemaCreate.validate(creatingTodo)
    await mutation.mutateAsync(creatingTodo)
  }

  return { initialTodo, ...mutation, createTodo }
}
