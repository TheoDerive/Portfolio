import { files } from "../data/files";
import { FileType, FolderType } from "../type/filesType";
import {
  collisionBottomLeft,
  collisionBottomRight,
  collisionTopLeft,
  collisionTopRight,
  isAnElementBottom,
} from "./conditionsFunction";

export function windowCollision(
  current_element: FileType | FolderType,
): [number, number] {
  let position = current_element.position;
  if (current_element.position[0] < 10) {
    position = [15, position[1]];
  } else if (
    current_element.position[0] + current_element.size[0] >
    window.innerHeight - 10
  ) {
    position = [window.innerHeight - current_element.size[0] - 15, position[1]];
  }

  if (current_element.position[1] < 10) {
    position = [position[0], 15];
  } else if (
    current_element.position[1] + current_element.size[1] >
    window.innerWidth - 10
  ) {
    position = [position[0], window.innerWidth - current_element.size[1] - 15];
  }

  return position;
}

export function pathElementCollision(
  element: FileType | FolderType,
  prev_position: [number, number],
): [number, number] {
  const position = prev_position;

  for (let index = 0; index < files.length; index++) {
    const el = files[index];
    if (el.id === element.id && el.name === element.name) continue;

    console.log(isAnElementBottom(el, element));

    if (collisionTopLeft(el, element)) {
      console.log("collision Top Left");
    } else if (collisionTopRight(el, element)) {
      console.log("collision Top Right");
    } else if (collisionBottomLeft(el, element)) {
      console.log("collision Bottom Left");
    } else if (collisionBottomRight(el, element)) {
      console.log("collision Bottom Right");
    }
  }

  return position;
}
