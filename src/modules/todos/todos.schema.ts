import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "../users/users.schema";

export const todoSchema = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: integer("completed").default(0),
  userId: integer("user_id").notNull().references(() => userSchema.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});
