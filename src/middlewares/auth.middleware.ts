import { getCookie } from "hono/cookie";
import { LoginService } from "../modules/login/login.service";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = getCookie(c, "auth_token");

  if (!token) {
    return c.json({ message: "There is no active session" }, 401);
  }

  const payload = await LoginService.verifyjwt(token, "mySecretKey");
  if (!payload) {
    return c.json({ message: "Expired session or invalid" }, 401);
  }

  c.set("user", payload);

  await next();
});
