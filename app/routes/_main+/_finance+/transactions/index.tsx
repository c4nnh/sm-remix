import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Button } from "~/components/Button";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default function Transactions() {
  return (
    <div>
      Transactions
      <Button>Logout</Button>
    </div>
  );
}
