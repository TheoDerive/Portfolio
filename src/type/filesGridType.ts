export type File = {
  id: number;
  name: string;
  content?: string;
  type: "file";
};

export type Folder = {
  id: number;
  name: string;
  content?: (File | Folder)[];
  type: "folder";
};

export type GridType = {
  id: number;
  content: File | Folder | null;
};

export type FilesGrid = [
  GridType[],
  GridType[],
  GridType[],
  GridType[],
  GridType[],
  GridType[],
  GridType[],
  GridType[],
];
