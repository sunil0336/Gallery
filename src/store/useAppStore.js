import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedImage: null,
  imagesMap: {},   // 👈 store images by id
  user: `User_${Math.floor(Math.random() * 1000)}`,

  setSelectedImage: (image) => set({ selectedImage: image }),

  addImages: (images) =>
    set((state) => {
      const map = { ...state.imagesMap };
      images.forEach((img) => {
        map[img.id] = img;
      });
      return { imagesMap: map };
    }),

  clearSelectedImage: () => set({ selectedImage: null })
}));
