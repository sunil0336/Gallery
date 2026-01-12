import GalleryGrid from "../components/gallery/GalleryGrid";
import Feed from "../components/feed/Feed";
import ImageModal from "../components/gallery/ImageModal";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <GalleryGrid />
      </div>

      <div className="col-span-1 bg-white p-3 rounded shadow">
        <h2 className="font-semibold mb-2">Live Feed</h2>
        <Feed />
      </div>

      <ImageModal />
    </div>
  );
}
