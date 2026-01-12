import ImageCard from "./ImageCard";
import { useGallery } from "../../hooks/useGallery";

export default function GalleryGrid() {
  const { data, isLoading } = useGallery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map(img => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
}
