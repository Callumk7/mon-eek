import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "db";
import { messages } from "db/schema";
import { MessageCard } from "~/components/messages/Message";

// THIS IS THE ACTION PART OF THIS FILE
export const action = async ({ request }: ActionFunctionArgs) => {
  //
  const body = await request.formData();
  const message = body.get("body");
  const userId = body.get("userId");

  const newMessage = await db.insert(messages).values({
    userId: Number(userId),
    body: message?.toString(),
  });

  return json({ newMessage });
};

// THIS IS THE LOADER PART OF THE FILE
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const messages = await db.query.messages.findMany({
    with: {
      user: true,
    },
  });

  const users = await db.query.users.findMany();
  return json({ messages, users });
};

export default function MessagesPage() {
  const { messages, users } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-red-700 underline">This is the messages page</h1>
      <div>
        {messages.map((message) => (
          <MessageCard message={message} key={message.id} />
        ))}
      </div>

      <Form method="post">
        <input type="text" name="body" placeholder="Leave a message" />
        <select name="userId">
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </Form>
    </div>
  );
}
