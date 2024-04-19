import { useQuery } from '@tanstack/vue-query'
import { type Ref, toRef } from 'vue'
import { getDefaultTodo } from '../config'
import { todoKeys, fetchTodoById } from '@/shared/api/todos'

export function useTodo(id?: number | Ref<number>) {
  const todoId = toRef(id)

  const fetchTodo = () => {
    if (!todoId.value) {
      throw new Error()
    }
    return fetchTodoById(todoId.value)
  }

  return useQuery({
    queryKey: todoKeys.detail(todoId.value!),
    queryFn: fetchTodo,
    initialData: getDefaultTodo(),
    enabled: Boolean(todoId.value)
  })
}
