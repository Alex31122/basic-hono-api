import { eq } from "drizzle-orm"
import { db } from "../../core/db"
import { todoSchema } from "./todos.schema"

export const TodoService = {
  getAll: async (userId: number) => {
    const userTodos = await db.select().from(todoSchema).where(eq(todoSchema.userId, userId));

    return userTodos;
  },

  create: async (todo: typeof todoSchema.$inferInsert) => {
    const newTodo = await db.insert(todoSchema).values({
      title: todo.title,
      userId: todo.userId,
      completed: 0
    }).returning();

    return newTodo;
  }
}
