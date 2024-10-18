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
    position: [150, 30],
    size: [70, 70],
  },
  {
    id: 1,
    type: "folder",
    folderType: "default",
    icon: "",
    name: "folder",
    childs: [],
    path: "/folder",
    position: [100, 15],
    size: [70, 70],
  },
  {
    id: 3,
    type: "file",
    name: "test",
    path: "/test",
    icon: "",
    author: "Thyo",
    fileType: "text",
    position: [240, 15],
    size: [70, 70],
  },
];
