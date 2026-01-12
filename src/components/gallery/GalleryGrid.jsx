import { useEffect, useRef, useState } from "react";
import { useGallery } from "../../hooks/useGallery";
import ImageCard from "./ImageCard";

export default function GalleryGrid() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const loadMoreRef = useRef(null);
  const isFetchingRef = useRef(false);

  const { data, isLoading } = useGallery(page);

  // Append images when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setImages((prev) => [...prev, ...data]);
      isFetchingRef.current = false;
    }
  }, [data]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoading &&
          !isFetchingRef.current
        ) {
          isFetchingRef.current = true;
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0,
        rootMargin: "200px"
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {/* Masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>

      {/* Observer target */}
      <div ref={loadMoreRef} className="h-20" />

      {isLoading && (
        <p className="text-center mt-4 text-sm text-gray-500">
          Loading more images...
        </p>
      )}
    </>
  );
}
