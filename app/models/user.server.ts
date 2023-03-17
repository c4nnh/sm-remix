import { prisma } from "~/services/db.server";

export const getUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });
