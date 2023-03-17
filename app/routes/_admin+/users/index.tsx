import { UserRole } from "@prisma/client";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Button } from "~/components/Button";
import { requiredRole } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return requiredRole(request, [UserRole.ADMIN]);
};

export default function Users() {
  return (
    <div>
      Users
      <Button>Logout</Button>
    </div>
  );
}
