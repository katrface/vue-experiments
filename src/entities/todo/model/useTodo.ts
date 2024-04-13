import api, { TODOS_TOKENS } from '@/shared/api/todos'
import { useQuery } from '@tanstack/vue-query'
import { toRef, type Ref } from 'vue'
import { getDefaultTodo } from '../config'

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
    initialData: getDefaultTodo()
  })
}
