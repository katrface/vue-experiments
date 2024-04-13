import api, { TODOS_TOKENS } from '@/shared/api/todos'
import type { Todo } from '@/shared/api/todos/types'
import { deepClone } from '@/shared/lib'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref, toRef, watchEffect, type Ref } from 'vue'

export function useTodoUpdate(initialTodo: Todo | Ref<Todo>) {
  const initialTodoRef = toRef(initialTodo)
  const updatingTodo = ref<Todo>(deepClone(initialTodoRef.value))

  watchEffect(() => {
    updatingTodo.value = deepClone(initialTodoRef.value)
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (todo: Todo) => api.updateTodo(todo),
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData<Todo>([TODOS_TOKENS.fetchTodoDetails, updatedTodo.id], () => updatedTodo)

      queryClient.setQueryData<Todo[]>([TODOS_TOKENS.fetchTodos], (old) => {
        if (!old) {
          return
        }
        return old.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo )      
      })

      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodoDetails, updatedTodo.id] })
      queryClient.invalidateQueries({ queryKey: [TODOS_TOKENS.fetchTodos] })
    },
  })

  const updateTodo = async () => {
    if (!updatingTodo.value) {
      return
    }
    await mutation.mutateAsync(updatingTodo.value)
  }

  return { updatingTodo, ...mutation, updateTodo }
}
