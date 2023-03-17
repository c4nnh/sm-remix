import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Button } from "~/components/Button";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default function Projects() {
  return (
    <div>
      Projects
      <Button>Logout</Button>
    </div>
  );
}
