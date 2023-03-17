import type { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "~/services/db.server";

export const getUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = async (
  data: Pick<Prisma.UserCreateInput, "email" | "name" | "password">
) => {
  const { password, ...dto } = data;
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  return prisma.user.create({
    data: { ...dto, password: hashedPassword },
  });
};
