import { Link } from "@remix-run/react";
import { Input } from "../components";
import { Button } from "../components/Button";
import { AuthLayout } from "../layouts";

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
      <form className="flex flex-col space-y-4">
        <Input name="email" label="Email" />
        <Input
          name="password"
          inputProps={{ type: "password" }}
          label="Password"
        />
        <Button>Login</Button>
      </form>
    </AuthLayout>
  );
}
