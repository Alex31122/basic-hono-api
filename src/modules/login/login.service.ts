import { sign, verify } from "hono/jwt";
import { db } from "../../core/db";
import { userSchema } from "../users/users.schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";

export const LoginService = {
  setjwt: async () => {
    const payload = {
      sub: "user123",
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };
    const secret = "mySecretKey";
    const token = await sign(payload, secret, "HS256");
    return token;
  },

  verifyjwt: async (tokenToVerify: string, secretKey: string) => {
    try {
      const decodedPayload = await verify(tokenToVerify, secretKey, "HS256");
      return decodedPayload;
    } catch (error) {
      console.error("Login Service error: Token invalido o expirado");
      return null;
    }
  },

  authenticate: async (email: string, pass: string) => {
    try {
      const [user] = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.email, email));

      if (!user) return null;

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) return null;

      const payload = {
        id: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
      };

      const secret = "mySecretKey";
      const token = await sign(payload, secret, "HS256");

      return token;
    } catch (error) {
      console.error("Auth Service Error:");
      return null;
    }
  },
};
