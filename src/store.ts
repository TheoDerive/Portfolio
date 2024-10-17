import { create } from "zustand";
import { StoreInterface } from "./interface/storeInterface";

export const useAppStore = create<StoreInterface>((set) => ({
  windows: [],
  setWindows: (windows) => set({ windows }),
}));
