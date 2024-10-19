import React from "react";
import { File, FilesGrid, Folder, GridType } from "../type/filesGridType";
import { color } from "three/webgpu";

export default function useFilesGrid() {
  const [filesGrid, setFilesGrid] = React.useState<FilesGrid>([
    [
      {
        id: 10,
        content: {
          id: 100,
          name: "pipi",
          type: "file",
        },
      },
      {
        id: 11,
        content: {
          id: 110,
          name: "pipi2",
          type: "file",
        },
      },
      {
        id: 12,
        content: null,
      },
      {
        id: 13,
        content: null,
      },
      {
        id: 14,
        content: null,
      },
      {
        id: 15,
        content: null,
      },
    ],
    [
      {
        id: 20,
        content: {
          id: 200,
          name: "pipi3",
          type: "file",
        },
      },
      {
        id: 21,
        content: null,
      },
      {
        id: 22,
        content: null,
      },
      {
        id: 23,
        content: null,
      },
      {
        id: 24,
        content: null,
      },
      {
        id: 25,
        content: null,
      },
    ],
    [
      {
        id: 30,
        content: null,
      },
      {
        id: 31,
        content: null,
      },
      {
        id: 32,
        content: null,
      },
      {
        id: 33,
        content: null,
      },
      {
        id: 34,
        content: null,
      },
      {
        id: 35,
        content: null,
      },
    ],
    [
      {
        id: 40,
        content: null,
      },
      {
        id: 41,
        content: null,
      },
      {
        id: 42,
        content: null,
      },
      {
        id: 43,
        content: null,
      },
      {
        id: 44,
        content: null,
      },
      {
        id: 45,
        content: null,
      },
    ],
    [
      {
        id: 50,
        content: null,
      },
      {
        id: 51,
        content: null,
      },
      {
        id: 52,
        content: null,
      },
      {
        id: 53,
        content: null,
      },
      {
        id: 54,
        content: null,
      },
      {
        id: 55,
        content: null,
      },
    ],
    [
      {
        id: 60,
        content: null,
      },
      {
        id: 61,
        content: null,
      },
      {
        id: 62,
        content: null,
      },
      {
        id: 63,
        content: null,
      },
      {
        id: 64,
        content: null,
      },
      {
        id: 65,
        content: null,
      },
    ],
    [
      {
        id: 70,
        content: null,
      },
      {
        id: 71,
        content: null,
      },
      {
        id: 72,
        content: null,
      },
      {
        id: 73,
        content: null,
      },
      {
        id: 74,
        content: null,
      },
      {
        id: 75,
        content: null,
      },
    ],
    [
      {
        id: 80,
        content: null,
      },
      {
        id: 81,
        content: null,
      },
      {
        id: 82,
        content: null,
      },
      {
        id: 83,
        content: null,
      },
      {
        id: 84,
        content: null,
      },
      {
        id: 85,
        content: null,
      },
    ],
  ]);

  function sendTo(fromCaseId: number, toCaseId: number) {
    const fromRowId = Number(String(fromCaseId)[0]);
    const toRowId = Number(String(toCaseId)[0]);

    let fromCaseContent: File | Folder | null = null;

    setFilesGrid((prev): FilesGrid => {
      const result = prev.map((column, index) => {
        let columnResult: GridType[] = column;

        if (index + 1 === fromRowId) {
          columnResult = columnResult.map((grid): GridType => {
            if (grid.id === fromCaseId) {
              fromCaseContent = grid.content;
              return {
                id: grid.id,
                content: null,
              };
            }

            return grid;
          }) as GridType[];
        }
        console.log("opass", index + 1, toRowId);

        if (index + 1 === toRowId) {
          columnResult = columnResult.map((grid): GridType => {
            console.log(grid.id, toCaseId);
            if (grid.id === toCaseId) {
              return {
                id: grid.id,
                content: fromCaseContent,
              };
            }

            return grid;
          }) as GridType[];
        }

        return columnResult;
      }) as FilesGrid;

      return result;
    });

    console.log(fromCaseContent);
  }

  return { filesGrid, sendTo };
}
