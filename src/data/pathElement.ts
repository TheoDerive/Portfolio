import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 3000,
    name: "File",
    type: "text",
    content: "coucou",
    path: "/File",
    onDesktop: {
      id: 120,
    },
  },
  {
    id: 3003,
    name: "Test",
    type: "text",
    content: "coucou",
    path: "/File",
    onDesktop: {
      id: 110,
    },
  },
  {
    id: 3001,
    name: "Folder",
    type: "folder",
    path: "/Folder",
    content: [],
    onDesktop: {
      id: 130,
    },
  },
];
