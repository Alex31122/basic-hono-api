import { Hono } from "hono";
import { TodoService } from "./todos.service";

const todos = new Hono();

todos.get("/", (c) => {
  return c.json({ message: "Hello todos!" })
});

todos.get("/:userId", async (c) => {
  const userId = Number(c.req.param("userId"))
  const userTodos = await TodoService.getAll(userId);
  return c.json(userTodos)
});

todos.post("/", async (c) => {
  const todo = await c.req.json();
  const newTodo = await TodoService.create(todo);

  return c.json(newTodo);
});

export default todos;
