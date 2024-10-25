import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 3000,
    name: "File",
    type: "file",
    path: "/",
    fileType: "text",
    onDesktop: {
      id: 120,
    },
  },
  {
    id: 3001,
    name: "Folder",
    type: "folder",
    path: "/",
    content: [],
    onDesktop: {
      id: 130,
    },
  },
];
