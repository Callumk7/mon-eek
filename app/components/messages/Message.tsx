import type { MessageWithUser } from "db/schema";
import clsx from "clsx";

interface MessageCardProps {
  message: MessageWithUser;
}

export function MessageCard({ message }: MessageCardProps) {
  const isMon = message.user.role === "monique";

  return (
    <div
      className={clsx(
        isMon ? "bg-primary" : "",
        "p-5 border border-foreground rounded-lg mx-4 my-3",
      )}
    >
      <p>{message.body}</p>
      <p>{message.user.name}</p>
      <form>
        <input
          type="text"
          name="comment"
          placeholder="Send a reply.."
          className="border-foreground border rounded-md mt-2 w-4/5 mx-auto text-foreground p-2"
        />
      </form>
    </div>
  );
}
