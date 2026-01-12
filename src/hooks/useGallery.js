import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../api/unsplash";

export const useGallery = () =>
  useQuery({
    queryKey: ["images"],
    queryFn: () => fetchImages(1)
  });
