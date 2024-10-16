import { PathType } from "../type/filesType";

export const files: PathType = [
  {
    id: 0,
    type: "file",
    name: "test",
    path: "/test",
    icon: "",
    author: "Thyo",
    fileType: "text",
  },
  {
    id: 1,
    type: "folder",
    folderType: "default",
    icon: "",
    name: "folder",
    childs: [],
    path: "/folder",
  },
];
