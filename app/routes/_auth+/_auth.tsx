import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ROUTES } from "~/constants";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return authenticator.isAuthenticated(request, {
    successRedirect: ROUTES.ROOT,
  });
};

export default function Auth() {
  return <Outlet />;
}
