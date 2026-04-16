import { Hono } from "hono";
import { LoginService } from "./login.service";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { setCookie } from "hono/cookie";

const login = new Hono();

const tokenSchema = z.object({
  token: z.string(),
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

login.get("/", async (c) => {
  const token = await LoginService.setjwt();
  setCookie(c, "auth_token", token, {
    path: "/",
    secure: false,
    httpOnly: true,
    maxAge: 60 * 15,
  });
  return c.json({
    success: true,
    message: "Logged in successfully",
  });
});

login.post("/", zValidator("json", tokenSchema), async (c) => {
  const body = c.req.valid("json");
  const payload = await LoginService.verifyjwt(body.token, "mySecretKey");
  if (!payload) {
    return c.json(
      {
        success: false,
        message: "Session has expired or the token is invalid",
      },
      401,
    );
  }
  return c.json({ success: true, message: "Welcome", user: payload });
});

login.post("/signin", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const token = await LoginService.authenticate(email, password);

  if (!token) {
    return c.json(
      {
        success: false,
        message: "Invalid credentials",
      },
      401,
    );
  }

  setCookie(c, "auth_token", token, {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 60 * 15,
  });

  return c.json({
    success: true,
    message: "Logged in successfully",
  });
});
export default login;
