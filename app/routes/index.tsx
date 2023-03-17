import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AppLayout } from "~/layouts";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default function Index() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
