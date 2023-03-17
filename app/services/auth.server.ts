import type { UserRole } from "@prisma/client";
import { redirect, Response } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import { getUserByEmail } from "~/models/user.server";
import { sessionStorage } from "~/services/session.server";
import type { AuthSession } from "~/types/auth";

export const authenticator = new Authenticator<AuthSession>(sessionStorage, {
  sessionKey: "sessionKey",
  sessionErrorKey: "sessionErrorKey",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    invariant(typeof email === "string");
    invariant(typeof password === "string");

    const user = await getUserByEmail(email);

    if (!user) {
      throw new AuthorizationError("error/invalid-email");
    }

    if (user?.password !== password) {
      throw new AuthorizationError("error/invalid-password");
    }

    const { id, name, role, status } = user;

    return { id, email, name, role, status };
  }),
  "login"
);

export const requiredRole = async (request: Request, roles?: UserRole[]) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  console.log(user);

  if (roles && roles.length && !roles.includes(user.role)) {
    throw new Response("Forbidden", {
      status: 403,
    });
  }

  return user;
};
