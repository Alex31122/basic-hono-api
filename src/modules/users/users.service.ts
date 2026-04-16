import { db } from "../../core/db";
import * as bcrypt from "bcryptjs";
import { userSchema } from "./users.schema";
import { UserResponseSchema } from "./users.dto";
import { eq } from "drizzle-orm";

export const UserService = {
  getAll: async () => {
    const allUsers = await db.select().from(userSchema);
    const safeUsers = allUsers.map((user) => UserResponseSchema.parse(user));
    return safeUsers;
  },

  getOne: async (id: number) => {
    const [userfetched] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, id))
      .limit(1);
    return UserResponseSchema.parse(userfetched);
  },

  create: async (user: typeof userSchema.$inferInsert) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const userToSave = {
        ...user,
        password: hashedPassword,
      };

      const [result] = await db
        .insert(userSchema)
        .values(userToSave)
        .returning();

      if (!result) {
        throw new Error("The user could not be created");
      }

      return UserResponseSchema.parse(result);
    } catch (error) {
      console.error("UserService.create error", error);
      throw error;
    }
  },

  delete: async (id: number) => {
    const [result] = await db
      .delete(userSchema)
      .where(eq(userSchema.id, id))
      .returning();
    if (!result) {
      throw new Error("USER_NOT_FOUND");
    }

    return UserResponseSchema.parse(result);
  },
};
