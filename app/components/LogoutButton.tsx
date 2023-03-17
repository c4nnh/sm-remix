import { Form } from "@remix-run/react";
import { Button } from "./Button";

export const LogoutButton = () => {
  return (
    <Form action="/logout" method="post">
      <Button type="submit">Logout</Button>
    </Form>
  );
};
