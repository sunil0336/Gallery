import { db } from "../../db/instant";
import { useAppStore } from "../../store/useAppStore";

const emojis = ["❤️", "😂", "👍"];

export default function EmojiBar({ imageId }) {
  const user = useAppStore((s) => s.user);

  const { data } = db.useQuery({
    reactions: {
      $: { where: { imageId } }
    }
  });

  const addReaction = (emoji) => {
    const id = crypto.randomUUID();

    db.transact(
      db.tx.reactions[id].update({
        imageId,
        emoji,
        user,
        createdAt: Date.now()
      })
    );
  };

  return (
    <div className="flex gap-2 mt-2 items-center">
      {emojis.map((e) => (
        <button
          key={e}
          onClick={() => addReaction(e)}
          className="text-lg"
        >
          {e}
        </button>
      ))}
      <span className="text-xs text-gray-500">
        {data?.reactions?.length || 0}
      </span>
    </div>
  );
}
