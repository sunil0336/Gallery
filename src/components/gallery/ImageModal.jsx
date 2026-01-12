import { useAppStore } from "../../store/useAppStore";
import CommentBox from "../interactions/CommentBox";
import EmojiBar from "../interactions/EmojiBar";

export default function ImageModal() {
  const image = useAppStore((s) => s.selectedImage);
  const clear = useAppStore((s) => s.clearSelectedImage);

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
  <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">

        
        {/* Image section */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <img
            src={image.urls.regular}
            alt=""
            className="max-h-[90vh] w-auto object-contain"
          />
        </div>

        {/* Interaction section */}
        <div className="w-full md:w-[350px] p-4 flex flex-col gap-3 overflow-y-auto">
          
          {/* Emojis */}
          <EmojiBar imageId={image.id} />

          {/* Comments */}
          <CommentBox imageId={image.id} />

          <button
            onClick={clear}
            className="mt-auto text-sm text-red-500 self-end"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
