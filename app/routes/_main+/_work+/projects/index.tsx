import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { LogoutButton } from "~/components/LogoutButton";
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
      <LogoutButton />
    </div>
  );
}
