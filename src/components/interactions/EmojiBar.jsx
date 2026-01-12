import { db } from "../../db/instant";
import { useAppStore } from "../../store/useAppStore";

const emojis = ["❤️", "😂", "👍"];

export default function EmojiBar({ imageId }) {
  const user = useAppStore(s => s.user);
  const { data } = db.useQuery({
    reactions: { $: { where: { imageId } } }
  });

  const addReaction = (emoji) => {
    db.transact(
      db.tx.reactions.create({
        imageId,
        emoji,
        user
      })
    );
  };

  return (
    <div className="flex gap-2 mt-2">
      {emojis.map(e => (
        <button key={e} onClick={() => addReaction(e)}>
          {e}
        </button>
      ))}
      <span className="text-sm text-gray-500">
        {data?.reactions?.length || 0}
      </span>
    </div>
  );
}
