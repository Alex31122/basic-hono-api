import { Hono } from "hono";
import { TodoService } from "./todos.service";

type Variables = {
  user: {
    id: number;
    email: string;
    exp: number;
  };
};

const todos = new Hono<{ Variables: Variables }>();

todos.get("/", async (c) => {
  const user = c.get("user");
  const userTodos = await TodoService.getAll(user.id);
  return c.json(userTodos);
});

todos.get("/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));
  const userTodos = await TodoService.getAll(userId);
  return c.json(userTodos);
});

todos.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  const todo = {
    ...body,
    userId: user.id,
  };

  const newTodo = await TodoService.create(todo);

  return c.json(newTodo, 201);
});

export default todos;
