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
      element: "start",
      active: true,
    },
    {
      element: "file",
      active: true,
      elementActive: 110,
    },
    {
      element: "folder",
      active: true,
      elementActive: 100,
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
