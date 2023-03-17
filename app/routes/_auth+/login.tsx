import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Input } from "../../components";
import { Button } from "../../components/Button";
import { AuthLayout } from "../../layouts";

export default function Login() {
  return (
    <AuthLayout
      header={
        <p className="mt-6 text-center text-sm text-text">
          No account?{" "}
          <Link to="/register">
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
  return authenticator.authenticate("login", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
