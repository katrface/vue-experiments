import { deepClone, delay } from '@/shared/lib'
import type { Todo, TodoCreateDto } from './types'

export const TODOS_TOKENS = {
  fetchTodos: '/api/todos',
  fetchTodoDetails: '/api/todos/details'
}

const TODOS: Todo[] = [
  {
    id: 1,
    title: 'Frozen 1',
    description: 'foo'
  },
  {
    id: 2,
    title: 'Frozen 2',
    description: 'foo'
  },
  {
    id: 3,
    title: 'Frozen 3',
    description: 'foo'
  }
]

export async function fetchTodos() {
  console.log('🚀 ~ fetchTodos ~ fetchTodos:')

  await delay(2000)
  return deepClone(TODOS)
}

export async function createTodo(creatingTodo: TodoCreateDto) {
  console.log('🚀 ~ createTodo:', creatingTodo)

  await delay(2000)

  const nextId = Math.max(...TODOS.map((todo) => todo.id)) + 1

  Object.assign(creatingTodo, { id: nextId })
  TODOS.push(creatingTodo as Todo)

  return deepClone(creatingTodo) as Todo
}

export async function fetchTodoById(id: number) {
  console.log('🚀 ~ fetchTodoById ~ id:', id)

  await delay(2000)

  const todo = TODOS.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('404')
  }

  return deepClone(todo)
}

export async function updateTodo(updatingTodo: Todo) {
  console.log('🚀 ~ updateTodo:', updatingTodo)

  await delay(2000)

  const todo = TODOS.find((todo) => todo.id === updatingTodo.id)
  if (!todo) {
    throw new Error('404')
  }

  Object.assign(todo, updatingTodo)
  return deepClone(todo)
}

export async function deleteTodo(id: number) {
  console.log('🚀 ~ deleteTodo:', id)

  await delay(2000)

  const todo = TODOS.find((todo) => todo.id === id)

  if (!todo) {
    throw new Error('404')
  }

  TODOS.splice(TODOS.indexOf(todo), 1)

  return deepClone(todo)
}

export default {
  fetchTodos,
  createTodo,
  fetchTodoById,
  updateTodo,
  deleteTodo
}
