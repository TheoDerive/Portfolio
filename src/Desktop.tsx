import React from "react";
import Wallpaper from "./components/Wallpaper";
import useFilesGrid from "./hooks/useFilesGrid";
import { useAppStore } from "./store";
import FileElement from "./components/File";

export default function Desktop() {
  const { filesGrid, setFilesGrid } = useAppStore();
  const { init, can_send_file_to } = useFilesGrid();

  React.useEffect(() => {
    setFilesGrid(init());
  }, []);

  return (
    <section className="desktop">
      <Wallpaper />

      {filesGrid.map((column, index) => (
        <section key={index + 1} id={`${index + 1}`} className="column">
          {column.map((grid) => (
            <div key={grid.id} id={`${grid.id}`} className="grid">
              {grid.content ? (
                <>
                  {grid.content.type === "file" ? (
                    <FileElement
                      key={grid.content.id}
                      grid={grid}
                      file={grid.content}
                    />
                  ) : null}
                </>
              ) : null}
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}
