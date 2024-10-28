import { File, Folder } from "../type/filesGridType";

export const isFolder = (content: Folder | File): content is Folder => {
  return (content as Folder).type === "folder";
};

export const isFile = (content: Folder | File): content is File => {
  return !isFolder(content);
};
