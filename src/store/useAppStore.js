import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedImage: null,
  user: `User_${Math.floor(Math.random() * 1000)}`,

  setSelectedImage: (image) => set({ selectedImage: image }),
  clearSelectedImage: () => set({ selectedImage: null })
}));
