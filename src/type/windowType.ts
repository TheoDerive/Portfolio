import { PathType } from "./filesType";

export type WindowType = {
  id: number;
  name: string;
  content: PathType | string;
  isMinimize: boolean;
  isActive: boolean;
};
