export type FileType = "text" | "image" | "code" | "default";

export type File = {
  id: number;
  name: string;
  content?: string;
  type: "file";
  fileType: FileType;
  onDesktop?: {
    id: number;
  };
};

export type Folder = {
  id: number;
  name: string;
  content: (File | Folder)[];
  type: "folder";
  onDesktop?: {
    id: number;
  };
};

export type GridType = {
  id: number;
  content: File | Folder | null;
};

export type FilesGrid = GridType[][];
