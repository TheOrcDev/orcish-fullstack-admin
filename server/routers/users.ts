import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { asc } from "drizzle-orm";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  get: publicProcedure.query(async () => {
    return await db.select().from(users).orderBy(asc(users.id));
  })
});
