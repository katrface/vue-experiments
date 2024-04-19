/* eslint-disable no-console */
import type { Todo, TodoCreateDto } from './types'

export type { Todo, TodoCreateDto }
export { todoKeys } from './queries'

export async function fetchTodos() {
  try {
    const response = await fetch('/api/todos')

    if (!response.ok) {
      throw Error()
    }
    return await response.json() as Todo[]
    
  } catch (error) {
    console.error("🚀 ~ fetchTodos ~ error:", error)
    throw error
  }
}

export async function createTodo(creatingTodo: TodoCreateDto) {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(creatingTodo)
    })

    if (!response.ok) {
      throw Error()
    }
    return await response.json() as Todo
    
  } catch (error) {
    console.error("🚀 ~ createTodo ~ error:", error)
    throw error
  }
}

export async function fetchTodoById(id: number) {
  try {
    const response = await fetch(`/api/todos/${id}`)

    if (!response.ok) {
      throw Error()
    }
    return await response.json() as Todo

  } catch (error) {
    console.error("🚀 ~ fetchTodoById ~ error:", error)
    throw error
  }
}

export async function updateTodo(updatingTodo: Todo) {
  try {
    const response = await fetch(`/api/todos/${updatingTodo.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(updatingTodo)
    })

    if (!response.ok) {
      throw Error()
    }
    return await response.json() as Todo

  } catch (error) {
    console.error("🚀 ~ updateTodo ~ error:", error)
    throw error
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw Error()
    }

    return await response.json() as Todo
  } catch (error) {
    console.error("🚀 ~ deleteTodo ~ error:", error)
    throw error
  }
}

export default {
  fetchTodos,
  createTodo,
  fetchTodoById,
  updateTodo,
  deleteTodo
}
