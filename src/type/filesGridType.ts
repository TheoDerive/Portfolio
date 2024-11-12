export type FileType =
  | "text"
  | "image"
  | "code"
  | "default"
  | "folder"
  | "console";

export type File = {
  id: number;
  name: string;
  content: string;
  type: FileType;
  path: string;
  onDesktop?: {
    id: number;
  };
  help?: string;
};

export type Folder = {
  id: number;
  name: string;
  path: string;
  content: (File | Folder)[];
  type: FileType;
  onDesktop?: {
    id: number;
  };
  help?: string;
};

export type GridType = {
  id: number;
  content: File | Folder | null;
};

export type FilesGrid = GridType[][];
