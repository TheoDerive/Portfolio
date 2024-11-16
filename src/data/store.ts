import { create } from "zustand";
import { StoreInterface } from "../interface/storeInterface";

export const useAppStore = create<StoreInterface>((set) => ({
  filesGrid: [],
  setFilesGrid: (filesGrid) => set({ filesGrid }),

  windows: [],
  setWindow: (windows) => set({ windows }),

  username: "thyo",
  setUsername: (username) => set({ username }),

  tuto: [
    {
      element: "file",
      active: true,
    },
    {
      element: "folder",
      active: true,
    },
    {
      element: "header",
      active: true,
    },
  ],
  setTuto: (tuto) => set({ tuto }),

  tutoInactive: false,
  setTutoInactive: (tutoInactive) => set({ tutoInactive }),
}));
