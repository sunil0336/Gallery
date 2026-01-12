import FeedItem from "./FeedItem";
import { db } from "../../db/instant";

export default function Feed() {
  const { data } = db.useQuery({
    reactions: {},
    comments: {}
  });

  return (
    <div>
      {data?.reactions?.map(r => (
        <FeedItem
          key={r.id}
          text={`${r.user} reacted ${r.emoji}`}
        />
      ))}

      {data?.comments?.map((c) => (
  <FeedItem
    key={c.id}
    text={`${c.user} commented: "${c.text.slice(0, 20)}${
      c.text.length > 20 ? "..." : ""
    }"`}
  />
))}

    </div>
  );
}
