import api, { TODOS_TOKENS } from '@/shared/api/todos'
import type { Todo, TodoCreateDto } from '@/shared/api/todos/types'
import { deepClone } from '@/shared/lib'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { getDefaultTodo } from '../config'

export function useTodoCreate() {
  const initialTodo = getDefaultTodo()
  const creatingTodo = ref<Todo>(deepClone(initialTodo))

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: TodoCreateDto): Promise<Todo> => api.createTodo(todo),
    onSuccess: (createdTodo: Todo) => {
      queryClient.setQueryData<Todo>([TODOS_TOKENS.fetchTodoDetails, createdTodo.id], () => createdTodo)

      queryClient.setQueryData<Todo[]>([TODOS_TOKENS.fetchTodos], (old) => {
        if (!old) {
          return
        }
        return [...old, createdTodo]      
      })

      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodoDetails, createdTodo.id] })
      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodos] })
    },
  })

  const createTodo = async () => {
    if (!creatingTodo.value) {
      return
    }
    await mutation.mutateAsync(creatingTodo.value)
  }

  return { initialTodo, creatingTodo, ...mutation, createTodo }
}
