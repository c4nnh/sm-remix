import { UserRole } from "@prisma/client";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { LogoutButton } from "~/components/LogoutButton";
import { requiredRole } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return requiredRole(request, [UserRole.ADMIN]);
};

export default function Currencies() {
  return (
    <div>
      Currencies
      <LogoutButton />
    </div>
  );
}
