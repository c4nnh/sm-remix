import type { UserRole } from "@prisma/client";
import { redirect, Response } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import { FORM_STRATEGY, ROUTES } from "~/constants";
import { createUser, getUserByEmail } from "~/models/user.server";
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

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password || ""
    );
    if (!isPasswordMatched) {
      throw new AuthorizationError("error/invalid-password");
    }

    const { id, name, role, status } = user;

    return { id, email, name, role, status };
  }),
  FORM_STRATEGY.LOGIN
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const name = form.get("name");
    const password = form.get("password");

    invariant(typeof email === "string");
    invariant(typeof name === "string");
    invariant(typeof password === "string");

    const existedEmail = await getUserByEmail(email);

    if (existedEmail) {
      throw new AuthorizationError("error/duplicate-email");
    }

    const user = await createUser({ email, name, password });

    const { id, role, status } = user;

    return { id, email, name, role, status };
  }),
  FORM_STRATEGY.REGISTER
);

export const requiredRole = async (request: Request, roles?: UserRole[]) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(ROUTES.LOGIN);
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    throw new Response("Forbidden", {
      status: 403,
    });
  }

  return user;
};
