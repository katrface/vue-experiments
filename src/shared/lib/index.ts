export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function deepClone<T>(objectToClone: T): T {
  return objectToClone ? JSON.parse(JSON.stringify(objectToClone)) : objectToClone
}
