import { create } from "zustand";

export const useShopStore = create((set) => ({
  sneakers: [],
  setSneakers: (sneakers) => set({ sneakers }),
}));
