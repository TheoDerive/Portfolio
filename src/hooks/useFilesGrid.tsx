import { File, FilesGrid, Folder, GridType } from "../type/filesGridType";
import { pathElement } from "../data/pathElement";
import { useAppStore } from "../data/store";
import { useCallback } from "react";

export default function useFilesGrid() {
  const { filesGrid, setFilesGrid } = useAppStore();

  const init = useCallback((): FilesGrid => {
    // Create an empty array to prepare the return value
    const result_array: FilesGrid = [];

    // Create column display
    for (let colunmIndex = 1; colunmIndex < 13; colunmIndex++) {
      const colunm: GridType[] = [];

      // Create grid display
      for (let gridIndex = 0; gridIndex < 8; gridIndex++) {
        const grid: GridType = {
          id: colunmIndex * 10 + gridIndex,
          content: null,
        };

        // Search in pathElement file if un element id is equal to the id of the grid
        for (let fileIndex = 0; fileIndex < pathElement.length; fileIndex++) {
          const element = pathElement[fileIndex];

          if (element.onDesktop && element.onDesktop.id === grid.id * 10) {
            // Add it if it's true
            grid.content = element;
          }
        }

        colunm.push(grid);
      }

      result_array.push(colunm);
    }

    return result_array;
  }, []);

  // This function is essential for the movement of the desktop element
  // It pre calculate if there is a place for all the moved element
  const can_send_file_to = useCallback(
    (grid: GridType, to: number) => {
      // Get the index of the wanted column
      let columnIndex = check_id_size(to) - 1;

      // Set the default value to the id case container
      let good_place = to;

      // Check if a good place was find
      let find: boolean = false;

      // Brute force if we can't find a good place
      let brut_force: boolean = false;

      // Continu if we need to change column
      while (find !== true && brut_force !== true) {
        // Iterate each grid of the column
        for (let index = 0; index < filesGrid[columnIndex].length; index++) {
          const element = filesGrid[columnIndex][index];

          // Check grids after the wanted grid
          if (element.id === good_place) {
            // If the grid has no content just set good_place to the grid id
            // and break the for boucle
            if (element.content === null) {
              good_place = element.id;
              find = true;
              break;
            } else {
              // If the element was the last one of the grid and he has content,
              // brut force the while boucle
              if (good_place === 127) {
                brut_force = true;
                good_place += 1;
                break;
              }

              // If the last number of good_place is a 7,
              // change column
              if (
                Number(
                  String(good_place)[Number(String(good_place).length) - 1],
                ) === 7
              ) {
                good_place += 3;
                columnIndex += 1;
                break;
              }

              // Else just go to the next grid
              good_place += 1;
            }
          }
        }
      }

      // if good_place is not the end of the grid,
      // run sendTo
      if (good_place <= 127) {
        sendTo(grid, to);
      }
    },
    [filesGrid],
  );

  const sendTo = useCallback(
    (fromCase: GridType, toCaseId: number) => {
      // Set initial grid content
      const grid_saved: {
        current_id: number;
        current_content: File | Folder | null;
        current_destination: number;
        timer: number; // How many type he pass over element
        current_destinationColumnIndex: number; // The index of the destination column
        need_modification: boolean; // If it is needed to remove the element
      } = {
        current_id: fromCase.id,
        current_content: fromCase.content,
        current_destination: toCaseId,
        timer: 0,
        current_destinationColumnIndex: check_id_size(toCaseId),
        need_modification: true,
      };

      // Get column index
      const fromColumnId = check_id_size(grid_saved.current_id);

      // Return an array without the move element
      const removeFromObject = filesGrid.map((column, index) => {
        // Create a variable for modify an instance
        let current_column = column;

        // Check if the column index in equal to the wanted column index
        if (index + 1 === fromColumnId) {
          current_column = current_column.map((grid): GridType => {
            // Find the wanted grid
            if (grid.id === grid_saved.current_id) {
              // And remove his content
              return {
                id: grid.id,
                content: null,
              };
            }

            // If grid wasn't find, just return grid
            return grid;
          });
        }

        return current_column;
      }) as FilesGrid;

      // Add the element to the wanted position and modify others if needed
      const displayToDestination = removeFromObject.map((column, index) => {
        let current_column = column;

        // Find the wanted column
        if (index + 1 === grid_saved.current_destinationColumnIndex) {
          current_column = current_column.map((grid): GridType => {
            // Find the wanted grid
            if (grid.id === grid_saved.current_destination) {
              // If grid has content
              if (grid.content !== null) {
                // If it was the second iteration of this part
                if (grid_saved.timer > 0) {
                  // Save the current grid_saved
                  const new_grid: GridType = {
                    id: grid_saved.current_id,
                    content: grid_saved.current_content,
                  };

                  // If the grid is the last one of the column
                  if (
                    Number(
                      String(grid.id)[Number(String(grid.id).length) - 1],
                    ) === 7
                  ) {
                    //Say to grid_saved to go to the next column
                    grid_saved.current_id = grid.id + 3;
                    grid_saved.current_destination =
                      grid_saved.current_destination + 3;

                    grid_saved.current_content = grid.content;
                    grid_saved.current_destinationColumnIndex += 1;
                  } else {
                    // Else say to grid_saved to go to the next grid
                    grid_saved.current_content = grid.content;
                    grid_saved.current_id = grid.id + 1;
                    grid_saved.current_destination += 1;
                  }

                  // Set the good value to the content of the grid
                  if (grid_saved.current_content) {
                    grid_saved.current_content.id += 10;
                  }

                  return new_grid;
                }

                // If it is the first iteration
                // If the grid is the last one of the column
                if (
                  Number(
                    String(grid.id)[Number(String(grid.id).length) - 1],
                  ) === 7
                ) {
                  //Say to grid_saved to go to the next column
                  grid_saved.current_id = grid.id + 3;
                  grid_saved.current_destination += 3;

                  grid_saved.current_destinationColumnIndex += 1;
                } else {
                  // Else say to grid_saved to go to the next grid
                  grid_saved.current_id = grid.id + 1;
                  grid_saved.current_destination += 1;
                }

                // Add the first iteration
                grid_saved.timer = 1;

                if (grid_saved.current_content) {
                  grid_saved.current_content.id += 10;
                }

                return grid;
              }

              // If the grid has no content
              // Fit their id and add the grid_saved content to the current grid content
              grid_saved.current_id = grid.id + 1;

              if (grid_saved.current_content) {
                grid_saved.current_content.id += 10;
              }

              return {
                id: grid.id,
                content: grid_saved.current_content,
              };
            }

            // Return grid if we didn't find the grid wanted
            return grid;
          });
        }

        return current_column;
      }) as FilesGrid;

      // Set the result to setFilesGrid
      setFilesGrid(displayToDestination);
    },
    [filesGrid],
  );

  const check_id_size = useCallback((id: number) => {
    const numberToString = String(id);

    // If the id has 3 numbers
    if (numberToString.length === 3) {
      // Get the first and the second ones
      const first = Number(numberToString[0]) * 10;
      const second = Number(numberToString[1]);
      return first + second;
    } else {
      // Else get the first one
      return Number(numberToString[0]);
    }
  }, []);

  return { init, can_send_file_to };
}
