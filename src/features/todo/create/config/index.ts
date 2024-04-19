import { todoFormSchema } from "@/entities/todo";
import type { TodoCreateDto } from "@/shared/api/todos";
import type { ObjectSchema } from "yup";

export const todoCreateSchema: ObjectSchema<TodoCreateDto> = todoFormSchema.clone()
