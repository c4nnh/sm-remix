import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Input } from "~/components";
import { FORM_STRATEGY, ROUTES } from "~/constants";
import { AuthLayout } from "~/layouts";
import { authenticator } from "~/services/auth.server";

export default function Login() {
  return (
    <AuthLayout
      header={
        <p className="mt-6 text-center text-sm text-text">
          No account?{" "}
          <Link to={ROUTES.REGISTER}>
            <span className="font-semibold text-primary hover:text-primary-accent">
              Register
            </span>
          </Link>
        </p>
      }
    >
      <form className="flex flex-col space-y-4" method="post">
        <Input name="email" label="Email" />
        <Input
          name="password"
          inputProps={{ type: "password" }}
          label="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </AuthLayout>
  );
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  return authenticator.authenticate(FORM_STRATEGY.LOGIN, request, {
    successRedirect: ROUTES.ROOT,
    failureRedirect: ROUTES.LOGIN,
  });
};
