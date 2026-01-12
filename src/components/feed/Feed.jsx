import FeedItem from "./FeedItem";
import { db } from "../../db/instant";

export default function Feed() {
  const { data } = db.useQuery({
    reactions: {},
    comments: {}
  });

  return (
  <div className="bg-zinc-900 text-gray-200 rounded-lg p-3 h-full overflow-y-auto">
    <div className="space-y-2">

      {/* Emoji reactions */}
      {data?.reactions?.map((r) => (
        <FeedItem
          key={r.id}
          text={`${r.user} reacted ${r.emoji} on this image`}
        />
      ))}

      {/* Comments */}
      {data?.comments?.map((c) => (
        <FeedItem
          key={c.id}
          text={`${c.user} commented "${c.text}" on this image`}
        />
      ))}

    </div>
  </div>
);



}
