import { useAppStore } from "../../store/useAppStore";
import EmojiBar from "../interactions/EmojiBar";

export default function ImageCard({ image }) {
  const setSelectedImage = useAppStore(s => s.setSelectedImage);

  return (
    <div className="relative">
      <img
        src={image.urls.small}
        className="rounded cursor-pointer"
        onClick={() => setSelectedImage(image)}
      />
      <EmojiBar imageId={image.id} />
    </div>
  );
}
