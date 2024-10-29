import { FileType } from "./filesGridType";

export type Window = {
  id: number;
  name: string;
  path: string;
  type: FileType;
  snooze: boolean;
};

export type WindowIdentification = {
  id: number;
  name: string;
  snooze: boolean;
};
