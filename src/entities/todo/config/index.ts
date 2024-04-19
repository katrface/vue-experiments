import type { Todo } from '@/shared/api/todos'
import { object, ObjectSchema, string } from 'yup'

export const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Заголовок', key: 'title' },
  { title: 'Описание', key: 'description' },
  { title: 'Действия', key: 'actions', sortable: false }
]

export const getDefaultTodo = (): Todo => ({
  id: 0,
  title: '',
  description: '',
})

export type TodoForm = Pick<Todo, 'title' | 'description'>

export const todoFormSchema: ObjectSchema<TodoForm> = object({
  title: string()
    .required('Обязательное поле')
    .min(4, 'Заголовок должен содержать более 3 символов')
    .default(''),
  description: string()
    .default('')
})
