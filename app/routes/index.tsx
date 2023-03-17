import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AppLayout } from "~/layouts";
import { requiredRole } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return requiredRole(request);
};

export default function Index() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
