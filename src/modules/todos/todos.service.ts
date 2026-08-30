import { eq } from "drizzle-orm";
import { db } from "../../core/db";
import { todoSchema } from "./todos.schema";

export const TodoService = {
  getAll: async (userId: number) => {
    const userTodos = await db
      .select()
      .from(todoSchema)
      .where(eq(todoSchema.userId, userId));

    return userTodos;
  },

  create: async (todo: typeof todoSchema.$inferInsert) => {
    const [newTodo] = await db
      .insert(todoSchema)
      .values({
        title: todo.title,
        userId: todo.userId,
        completed: 0,
      })
      .returning();

    return newTodo;
  },

  delete: async (id: number) => {
    const deletedTodo = await db
      .delete(todoSchema)
      .where(eq(todoSchema.id, id))
      .returning();
    return deletedTodo[0];
  },

  update: async (id: number, todo: Partial<typeof todoSchema.$inferInsert>) => {
    const [updatedTodo] = await db
      .update(todoSchema)
      .set(todo)
      .where(eq(todoSchema.id, id))
      .returning();

    return updatedTodo;
  },
};
