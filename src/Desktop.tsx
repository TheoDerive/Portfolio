import React from "react";
import Wallpaper from "./components/Wallpaper";
import useFilesGrid from "./hooks/useFilesGrid";
import { useAppStore } from "./data/store";
import FileElement from "./components/File";
import FolderElement from "./components/Folder";
import WindowElement from "./components/Window";

export default function Desktop() {
  const gridParentRef = React.useRef<HTMLDivElement>(null);

  const { filesGrid, setFilesGrid, windows } = useAppStore();
  const { init } = useFilesGrid();

  React.useEffect(() => {
    setFilesGrid(init());
  }, []);

  return (
    <section className="desktop">
      <Wallpaper />

      {filesGrid.map((column, index) => (
        <section key={index + 1} id={`${index + 1}`} className="column">
          {column.map((grid) => (
            <div
              key={grid.id}
              id={`${grid.id}`}
              ref={gridParentRef}
              className="grid"
            >
              {grid.content ? (
                <>
                  {grid.content.type === "file" ? (
                    <FileElement
                      key={grid.content.id}
                      grid={grid}
                      file={grid.content}
                      parentRef={gridParentRef}
                    />
                  ) : (
                    <FolderElement
                      key={grid.content.id}
                      grid={grid}
                      folder={grid.content}
                      parentRef={gridParentRef}
                    />
                  )}
                </>
              ) : null}
            </div>
          ))}
        </section>
      ))}

      {windows.map((window) => (
        <WindowElement key={window.id} windowProps={window} />
      ))}
    </section>
  );
}
