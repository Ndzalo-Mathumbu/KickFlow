import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchedSneaker: [],
  setSearchedSneaker: (searchedSneaker) => {
    set({ searchedSneaker });
  },
}));
