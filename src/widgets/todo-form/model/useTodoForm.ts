import { type Ref, toRef, watch } from 'vue'
import { todoSchemaCreate } from '@/entities/todo'
import { useField, useForm } from 'vee-validate'
import type { TodoCreateDto } from '@/shared/api/todos/types'

export function useTodoForm(initialTodo: TodoCreateDto | Ref<TodoCreateDto>) {
  const initialTodoRef = toRef(initialTodo)

  const form = useForm<TodoCreateDto>({
    validationSchema: todoSchemaCreate,
    initialValues: initialTodoRef.value
  })

  watch(
    () => initialTodoRef.value,
    () => {
      form.resetForm({
        values: initialTodoRef.value
      })
    }
  )

  const titleField = useField<TodoCreateDto['title']>('title')
  const descriptionField = useField<TodoCreateDto['description']>('description')

  return {
    titleField,
    descriptionField,
    form
  }
}
