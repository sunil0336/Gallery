import { useAppStore } from "../../store/useAppStore";
import EmojiBar from "../interactions/EmojiBar";
import { db } from "../../db/instant";

export default function ImageCard({ image }) {
  const setSelectedImage = useAppStore((s) => s.setSelectedImage);

  const { data } = db.useQuery({
    comments: {
      $: { where: { imageId: image.id } }
    }
  });

  const commentCount = data?.comments?.length || 0;

  return (
    <div className="relative break-inside-avoid overflow-hidden rounded-xl shadow">
      
      {/* Image */}
      <img
        src={image.urls.small}
        alt=""
        className="w-full object-cover cursor-pointer"
        onClick={() => setSelectedImage(image)}
      />

      {/* Bottom-left emojis — FIXED HEIGHT */}
      <div className="absolute bottom-3 left-3">
        <div
          className="h-9 flex items-center px-3 rounded-full
                     bg-white/20 backdrop-blur-md border border-white/30
                     shadow-lg"
        >
          <EmojiBar imageId={image.id} />
        </div>
      </div>

      {/* Bottom-right comment icon — REFERENCE HEIGHT */}
      <div
        onClick={() => setSelectedImage(image)}
        className="absolute bottom-3 right-3 cursor-pointer"
      >
        <div
          className="h-9 flex items-center gap-1 px-3 rounded-full
                     bg-white/20 backdrop-blur-md border border-white/30
                     shadow-lg text-white text-sm hover:bg-white/30 transition"
        >
          <span>💬</span>
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
