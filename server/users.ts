"use server";

import db from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { count, ilike, or } from "drizzle-orm";

interface GetUsersInput {
  page: number;
  totalItems: number;
  search?: string | null;
}

export interface GetUsersResponse {
  items: User[];
  totalPages: number;
}

export async function getUsers(
  input: GetUsersInput
): Promise<GetUsersResponse> {
  try {
    const offset = (input.page - 1) * input.totalItems;
    const limit = input.totalItems;

    const [totalCount] = await db
      .select({ count: count() })
      .from(users)
      .where(
        or(
          input.search ? ilike(users.email, `%${input.search}%`) : undefined,
          input.search ? ilike(users.username, `%${input.search}%`) : undefined
        )
      );

    const totalPages = Math.ceil(totalCount.count / limit);

    const items = await db
      .select()
      .from(users)
      .where(
        or(
          input.search ? ilike(users.email, `%${input.search}%`) : undefined,
          input.search ? ilike(users.username, `%${input.search}%`) : undefined
        )
      )
      .offset(offset)
      .limit(limit);

    return {
      items,
      totalPages,
    };
  } catch (e) {
    throw e;
  }
}

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export async function createUser(input: CreateUserInput) {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(input.password, salt);

    await db.insert(users).values({
      username: input.username,
      email: input.email,
      password: hash,
    });
  } catch (e) {
    throw e;
  }
}
