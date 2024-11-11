import React from "react";
import Wallpaper from "./components/Wallpaper";
import useFilesGrid from "./hooks/useFilesGrid";
import { useAppStore } from "./data/store";
import FileElement from "./components/File";
import FolderElement from "./components/Folder";
import WindowContainer from "./components/Window";
import { isFile } from "./utils/verifElementType";
import Header from "./components/Header";

const Desktop = () => {
  const gridParentRef = React.useRef<HTMLDivElement>(null);

  const filesGrid = useAppStore((state) => state.filesGrid);
  const setFilesGrid = useAppStore((state) => state.setFilesGrid);
  const windows = useAppStore((state) => state.windows);
  const { init } = useFilesGrid();

  React.useEffect(() => {
    setFilesGrid(init());
  }, []);

  return (
    <section className="desktop">
      <Header />
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
                  {isFile(grid.content) ? (
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

      {windows.map((window) =>
        window.snooze ? null : (
          <WindowContainer key={window.id} windowProps={window} />
        ),
      )}
    </section>
  );
};

export default React.memo(Desktop);
