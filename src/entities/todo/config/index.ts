import type { Todo } from "@/shared/api/todos/types"

export const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Заголовок', key: 'title' },
  { title: 'Описание', key: 'description' },
  { title: 'Действия', key: 'actions', sortable: false }
]

export const getDefaultTodo = (): Todo => ({
  id: 0,
  title: '',
  description: ''
})