import { files } from "../data/files";
import { FileType, FolderType } from "../type/filesType";

export function collisionTopLeft(
  el: FileType | FolderType,
  element: FileType | FolderType,
): boolean {
  const halfHeight = el.size[0] / 2;
  const halfWidth = el.size[1] / 2;
  if (
    //top
    el.position[0] <= element.position[0] + element.size[0] &&
    el.position[0] + halfHeight > element.position[0] + element.size[0] &&
    // left
    el.position[1] <= element.position[1] &&
    el.position[1] + halfWidth > element.position[1]
  ) {
    return true;
  }

  return false;
}

export function collisionTopRight(
  el: FileType | FolderType,
  element: FileType | FolderType,
): boolean {
  const halfHeight = el.size[0] / 2;
  const halfWidth = el.size[1] / 2;
  if (
    //top
    el.position[0] <= element.position[0] + element.size[0] &&
    el.position[0] + halfHeight > element.position[0] + element.size[0] &&
    // right
    el.position[1] + el.size[1] >= element.position[1] + element.size[1] &&
    el.position[1] + halfWidth < element.position[1] + element.size[1]
  ) {
    return true;
  }

  return false;
}

export function collisionBottomLeft(
  el: FileType | FolderType,
  element: FileType | FolderType,
): boolean {
  const halfHeight = el.size[0] / 2;
  const halfWidth = el.size[1] / 2;
  if (
    //bottom
    el.position[0] <= element.position[0] &&
    el.position[0] + halfHeight < element.position[0] &&
    // left
    el.position[1] <= element.position[1] &&
    el.position[1] + halfWidth > element.position[1]
  ) {
    return true;
  }

  return false;
}

export function collisionBottomRight(
  el: FileType | FolderType,
  element: FileType | FolderType,
): boolean {
  const halfHeight = el.size[0] / 2;
  const halfWidth = el.size[1] / 2;
  if (
    //bottom
    el.position[0] <= element.position[0] &&
    el.position[0] + halfHeight < element.position[0] &&
    // right
    el.position[1] + el.size[1] >= element.position[1] + element.size[1] &&
    el.position[1] + halfWidth < element.position[1] + element.size[1]
  ) {
    return true;
  }

  return false;
}

export function isAnElementBottom(
  el: FileType | FolderType,
  initial_element: FileType | FolderType,
): [number, number] {
  let position: [number, number] = initial_element.position;
  let toppestElement = 1000000;

  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    if (
      (element.id === el.id && element.name === el.name) ||
      (element.id === initial_element.id &&
        element.name === initial_element.name)
    )
      continue;

    if (
      el.position[0] + el.size[0] < element.position[0] &&
      element.position[0] < toppestElement
    ) {
      toppestElement = element.position[0];
    }
  }

  console.log(toppestElement);

  if (
    toppestElement < 100000 &&
    toppestElement - (el.position[0] + el.size[0]) >= 70
  ) {
    position = [el.position[0] + el.size[0], position[1]];
    console.log(position);
  }

  return position;
}
