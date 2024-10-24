import { File, Folder } from "../type/filesGridType";

export const pathElement: (File | Folder)[] = [
  {
    id: 3000,
    name: "File",
    type: "file",
    fileType: "text",
    onDesktop: {
      id: 120,
    },
  },
  {
    id: 3001,
    name: "Folder",
    type: "folder",
    content: [],
    onDesktop: {
      id: 130,
    },
  },
];
