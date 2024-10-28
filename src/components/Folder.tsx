import React, { RefObject } from "react";
import useFilesGrid from "../hooks/useFilesGrid";
import { Folder, GridType } from "../type/filesGridType";
import { useAppStore } from "../data/store";
import { Window } from "../type/windowType";
import useMove from "../hooks/useMove";
import { PositionType } from "../type/vectorType";

const FolderElement = ({
  folder,
  grid,
  parentRef,
}: {
  folder: Folder;
  grid: GridType;
  parentRef: RefObject<HTMLDivElement>;
}) => {
  const [newIdGrid, setNewIdGrid] = React.useState<number | null>(null);
  const [initialPosition, setInitialPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });
  const [asMove, setAsMove] = React.useState<boolean>(false);

  const childRef = React.useRef<HTMLElement>(null);

  const { position, reset, handleClick } = useMove(
    initialPosition,
    true,
    childRef,
    parentRef,
    setNewIdGrid,
    setAsMove,
  );
  const { can_send_file_to } = useFilesGrid();
  const { setWindow, windows } = useAppStore();

  React.useEffect(() => {
    if (!childRef.current) return;
    const elementPosition = childRef.current.getBoundingClientRect();
    setInitialPosition({
      x: elementPosition.x,
      y: elementPosition.y,
    });
  }, [childRef]);

  React.useEffect(() => {
    if (asMove && childRef.current) {
      childRef.current.style.pointerEvents = "none";
    }
  }, [asMove]);

  const onClick = (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
    if (!parentRef.current || !childRef.current) return;

    const grid_size = {
      width: parentRef.current.clientWidth,
      height: parentRef.current.clientHeight,
    };

    childRef.current.style.width = `${grid_size.width}px`;
    childRef.current.style.height = `${grid_size.height}px`;

    parentRef.current.style.position = "unset";
    childRef.current.style.position = "absolute";
    childRef.current.style.zIndex = "999";

    handleClick(mouse);
  };

  const handleDoubleClick = () => {
    const new_window: Window = {
      id: folder.id * 20,
      name: folder.name,
      path: `${folder.path}`,
      type: folder.type,
    };

    setWindow([...windows, new_window]);
  };

  const onReset = () => {
    if (!parentRef.current || !childRef.current) return;

    childRef.current.style.width = `100%`;
    childRef.current.style.height = `100%`;

    parentRef.current.style.position = "relative";
    childRef.current.style.position = "unset";
    childRef.current.style.pointerEvents = "auto";
    childRef.current.style.zIndex = "unset";

    reset();

    if (newIdGrid) {
      can_send_file_to(grid, newIdGrid);
    }
  };

  React.useEffect(() => {
    const handleMouseUp = () => {
      onReset();
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [newIdGrid, childRef]);

  return (
    <article
      onMouseDown={(mouse) => onClick(mouse)}
      onDoubleClick={() => handleDoubleClick()}
      ref={childRef}
      className="folder"
      id={`${folder.id}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="folder-image-container">
        <img className="folder-image" src="/images/Folder-top.svg" />
      </div>
      {folder.name}
    </article>
  );
};

export default React.memo(FolderElement);
