import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "db";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const users = await db.query.users.findMany();

  return json({ users });
};

export default function MessagesPage() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
