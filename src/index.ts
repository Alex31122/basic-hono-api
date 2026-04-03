import { Hono } from "hono";
import users from "./modules/users/users.routes";
import todos from "./modules/todos/todos.routes";
import login from "./modules/login/login.routes";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/HI", (c) => {
  return c.json({ message: "HI THERE" });
});

app.post("/", async (c) => {
  return await c.req.json();
});

app.route("/users", users);
app.route("/todos", todos);
app.route("/login", login);

export default app;
