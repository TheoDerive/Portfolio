import { WindowType } from "../type/windowType";

export interface StoreInterface {
  windows: WindowType[];
  setWindows: (windows: WindowType[]) => void;
}
