import { Link } from "@remix-run/react";
import { Input } from "../components";
import { Button } from "../components/Button";
import { AuthLayout } from "../layouts";

export default function Register() {
  return (
    <AuthLayout
      header={
        <p className="mt-6 text-center text-sm text-text">
          <Link to="/login">
            Already have an account?
            <span className="font-semibold text-primary hover:text-primary-accent">
              Login
            </span>
          </Link>
        </p>
      }
    >
      <form className="flex flex-col space-y-4">
        <Input name="email" label="Email" />
        <Input name="name" label="Name" />
        <Input
          name="password"
          inputProps={{ type: "password" }}
          label="Password"
        />
        <Button>Register</Button>
      </form>
    </AuthLayout>
  );
}
