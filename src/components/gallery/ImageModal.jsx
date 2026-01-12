import { useAppStore } from "../../store/useAppStore";
import CommentBox from "../interactions/CommentBox";

export default function ImageModal() {
  const image = useAppStore(s => s.selectedImage);
  const clear = useAppStore(s => s.clearSelectedImage);

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-[500px]">
        <img src={image.urls.small} className="rounded mb-3" />
        <CommentBox imageId={image.id} />
        <button onClick={clear} className="mt-3 text-sm text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}
