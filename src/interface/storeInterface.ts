import { FilesGrid } from "../type/filesGridType";

export interface StoreInterface {
  filesGrid: FilesGrid | [];
  setFilesGrid: (filesGrid: FilesGrid) => void;
}
