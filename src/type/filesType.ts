export type FileType = {
  id: number;
  name: string;
  fileType: "text" | "image";
  path: string;
  icon: string;
  author: string;
  type: "file";
  content?: string;
  position: [number, number];
  size: [number, number];
};

export type FolderType = {
  id: number;
  folderType: "galerie" | "default";
  name: string;
  path: string;
  childs: Array<FileType | FolderType>;
  icon: string;
  type: "folder";
  position: [number, number];
  size: [number, number];
};

export type PathType = (FileType | FolderType)[];
