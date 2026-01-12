import { useState } from "react";
import { db } from "../../db/instant";
import { useAppStore } from "../../store/useAppStore";

export default function CommentBox({ imageId }) {
  const [text, setText] = useState("");
  const user = useAppStore(s => s.user);

  const { data } = db.useQuery({
    comments: { $: { where: { imageId } } }
  });

  const submit = () => {
    if (!text.trim()) return;
    db.transact(
      db.tx.comments.create({
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
      <div className="space-y-2">
        {data?.comments?.map(c => (
          <p key={c.id}><b>{c.user}:</b> {c.text}</p>
        ))}
      </div>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        className="border p-2 w-full mt-2"
        placeholder="Add comment..."
      />
      <button onClick={submit}>Send</button>
    </div>
  );
}
