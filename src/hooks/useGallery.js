import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../api/unsplash";

export const useGallery = (page) => {
  return useQuery({
    queryKey: ["images", page],
    queryFn: () => fetchImages(page),
    keepPreviousData: true
  });
};
