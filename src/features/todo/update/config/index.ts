import { todoFormSchema } from "@/entities/todo";
import type { Todo } from "@/shared/api/todos";
import { number, object, type ObjectSchema } from "yup";

export const todoUpdateSchema: ObjectSchema<Todo> = todoFormSchema.concat(object({
  id: number()
    .required('ID не указан')
    .positive('ID не указан')
    .integer('Некорректный ID')
    .default(0),
}))

