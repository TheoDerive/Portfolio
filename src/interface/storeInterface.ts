import { FilesGrid } from "../type/filesGridType";
import { TutoPass } from "../type/tutoTypes";
import { Window } from "../type/windowType";

export interface StoreInterface {
  filesGrid: FilesGrid | [];
  setFilesGrid: (filesGrid: FilesGrid) => void;

  windows: Window[];
  setWindow: (windows: Window[]) => void;

  username: string;
  setUsername: (username: string) => void;

  tuto: TutoPass[];
  setTuto: (tuto: TutoPass[]) => void;

  tutoInactive: boolean;
  setTutoInactive: (tutoInactive: boolean) => void;
}
