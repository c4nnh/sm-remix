import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { ROUTES } from "~/constants";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: ROUTES.LOGIN });
};

export const loader: LoaderFunction = () => {
  return redirect(ROUTES.ROOT);
};
