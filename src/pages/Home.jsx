import Feed from "../components/feed/Feed";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ImageModal from "../components/gallery/ImageModal";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4">
      
      {/* Gallery */}
      <div className="col-span-3">
        <GalleryGrid />
      </div>

      {/* Live Feed */}
      <div className="col-span-1">
        <div className="sticky top-4 h-[85vh]">
          <h2 className="text-sm font-semibold mb-2 text-gray-400">
            Live Feed
          </h2>
          <Feed />
        </div>
      </div>

      <ImageModal />
    </div>
  );
}
