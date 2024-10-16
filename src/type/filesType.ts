export type FileType = {
  id: number;
  name: string;
  fileType: "text" | "image";
  path: string;
  icon: string;
  author: string;
  type: "file";
  content?: string;
};

export type FolderType = {
  id: number;
  folderType: "galerie" | "default";
  name: string;
  path: string;
  childs: Array<FileType | FolderType>;
  icon: string;
  type: "folder";
};

export type PathType = (FileType | FolderType)[];
