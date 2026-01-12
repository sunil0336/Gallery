import { useState } from "react";
import { db } from "../../db/instant";
import { useAppStore } from "../../store/useAppStore";

export default function CommentBox({ imageId }) {
  const [text, setText] = useState("");
  const user = useAppStore((s) => s.user);

  const { data } = db.useQuery({
    comments: {
      $: { where: { imageId } }
    }
  });

  const submit = () => {
    if (!text.trim()) return;

    const id = crypto.randomUUID();

    db.transact(
      db.tx.comments[id].update({
        imageId,
        text,
        user,
        createdAt: Date.now()
      })
    );

    setText("");
  };

  return (
    <div>
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {data?.comments?.map((c) => (
          <p key={c.id}>
            <b>{c.user}:</b> {c.text}
          </p>
        ))}
      </div>

      <input
        className="border p-2 w-full mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />

      <button
        onClick={submit}
        className="mt-2 text-blue-600 text-sm"
      >
        Send
      </button>
    </div>
  );
}
