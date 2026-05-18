import { Hono } from "hono";
import { cors } from "hono/cors";
import users from "./modules/users/users.routes";
import todos from "./modules/todos/todos.routes";
import login from "./modules/login/login.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = new Hono();

const ALLOWED_ORIGIN = process.env.FRONTEND_URL ?? "http://localhost:4200";

app.use(
  "*",
  cors({
    origin: ALLOWED_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use("/todos/*", authMiddleware);

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
