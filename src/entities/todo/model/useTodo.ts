import api, { TODOS_TOKENS } from '@/shared/api/todos'
import { useQuery } from '@tanstack/vue-query'
import { type Ref, toRef } from 'vue'
import { todoSchema } from '../config'
import type { Todo } from '@/shared/api/todos/types'

export function useTodo(id?: number | Ref<number>) {
  const todoId = toRef(id)

  const fetchTodo = () => {
    if (!todoId.value) {
      throw new Error()
    }
    return api.fetchTodoById(todoId.value)
  }

  return useQuery({
    queryKey: [TODOS_TOKENS.fetchTodoDetails, todoId.value],
    queryFn: fetchTodo,
    initialData: todoSchema.getDefault() as Todo
  })
}
