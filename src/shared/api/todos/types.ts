export interface Todo {
  readonly id: number
  title: string
  description: string
}

export type TodoCreateDto = Omit<Todo, 'id'>
