import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "db";
import { users } from "db/schema";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("action hit");
  const body = await request.formData();
  const name = body.get("name");
  const email = body.get("email");
  const password = body.get("password");

  console.log(`NAME: ${name}, EMAIL: ${email}`);

  const newUser = await db.insert(users).values({
    name: name?.toString(),
    email: email?.toString(),
    password: password?.toString(),
  });

  console.log(newUser);
  return null;
};

export default function NewUserPage() {
  return (
    <Form method="post">
      <input
        className="border text-black"
        type="text"
        name="name"
        placeholder="Your name please"
      />
      <input
        className="border text-black"
        type="email"
        name="email"
        placeholder="Your email please"
      />
      <input type="hidden" name="password" value="password" />
      <button>Submit</button>
    </Form>
  );
}
