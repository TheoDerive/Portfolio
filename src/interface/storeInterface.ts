import { FilesGrid } from "../type/filesGridType";
import { Window } from "../type/windowType";

export interface StoreInterface {
  filesGrid: FilesGrid | [];
  setFilesGrid: (filesGrid: FilesGrid) => void;

  windows: Window[];
  setWindow: (windows: Window[]) => void;
}
