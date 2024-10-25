import { create } from "zustand";
import { StoreInterface } from "../interface/storeInterface";

export const useAppStore = create<StoreInterface>((set) => ({
  filesGrid: [],
  setFilesGrid: (filesGrid) => set({ filesGrid }),

    windows: [],
    setWindow: (windows) => set({ windows })
}));
