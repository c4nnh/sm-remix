import { createCookieSessionStorage } from "@remix-run/node";
import { SESSION_SECRET } from "~/utils/env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 12 * 60 * 60,
    secrets: [SESSION_SECRET], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
