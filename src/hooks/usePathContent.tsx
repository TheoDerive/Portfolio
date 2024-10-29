import { useCallback } from "react";
import { pathElement } from "../data/pathElement";
import { File, Folder } from "../type/filesGridType";

const usePathContent = (path: string) => {
  const getWindowContent = useCallback(() => {
    if (path === "/") return pathElement;

    const pathSplit = path.split("/").slice(1, undefined);

    let brutForce = false;
    let find = false;
    let timer = 0;

    let findElement = pathElement.filter((find) => find.name === pathSplit[0]);
    timer++;

    while (!find && !brutForce) {
      if (findElement[0].name === pathSplit[pathSplit.length - 1]) {
        find = true;
        break;
      }

      if (typeof findElement[0].content !== "string") {
        findElement = findElement[0].content.filter(
          (find: File | Folder) => find.name === pathSplit[timer],
        );
        if (findElement.length === 0) {
          brutForce = true;
        } else {
          timer++;
        }
      }
    }

    return findElement;
  }, [path]);

  return { getWindowContent };
};

export default usePathContent;
