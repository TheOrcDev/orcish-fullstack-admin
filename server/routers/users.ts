import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { asc } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  get: publicProcedure.query(async () => {
    return await db.select().from(users).orderBy(asc(users.id));
  }),
  create: publicProcedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  })).mutation(async (opts) => {
    const { input } = opts;
    console.log(input);

    const salt = genSaltSync(10);
    const hash = hashSync(input.password, salt);

    await db.insert(users).values({
      username: input.username,
      email: input.email,
      password: hash,
    });
  })
});
