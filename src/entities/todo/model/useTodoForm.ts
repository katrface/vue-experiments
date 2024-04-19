import { type Ref, toRef, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { todoFormSchema, type TodoForm } from '../config'

export function useTodoForm(initialTodo: TodoForm | Ref<TodoForm>) {
  const initialTodoRef = toRef(initialTodo)

  const form = useForm<TodoForm>({
    validationSchema: toTypedSchema(todoFormSchema),
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

  const titleField = useField<TodoForm['title']>('title')
  const descriptionField = useField<TodoForm['description']>('description')

  return {
    titleField,
    descriptionField,
    form
  }
}
