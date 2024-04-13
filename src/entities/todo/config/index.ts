import type { Todo, TodoCreateDto } from '@/shared/api/todos/types'
import { number, object, ObjectSchema, string } from 'yup'

export const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Заголовок', key: 'title' },
  { title: 'Описание', key: 'description' },
  { title: 'Действия', key: 'actions', sortable: false }
]

export const todoSchema: ObjectSchema<Todo> = object({
  id: number().required('ID не указан').positive('ID не указан').integer().default(0),
  title: string()
    .required('Обязательное поле')
    .min(4, 'Заголовок должен содержать более 3 символов')
    .default(''),
  description: string().default('')
})

export const todoSchemaCreate: ObjectSchema<TodoCreateDto> = todoSchema.omit(['id'])
