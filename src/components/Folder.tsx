import React, { RefObject } from "react";
import useFilesGrid from "../hooks/useFilesGrid";
import { Folder, GridType } from "../type/filesGridType";
import useMove from "../hooks/useMove";
import { PositionType } from "../type/vectorType";
import DominantFileInFolder from "./DominantFileInFolder";
import useWindowPriority from "../hooks/useWindowPriority";
import { useAppStore } from "../data/store";

const FolderElement = ({
  folder,
  grid,
  parentRef,
  setPath,
  needMoving = true,
}: {
  folder: Folder;
  grid?: GridType;
  parentRef?: RefObject<HTMLDivElement>;
  setPath?: (path: string) => void;
  needMoving?: boolean;
}) => {
  const [newIdGrid, setNewIdGrid] = React.useState<number | null>(null);
  const [initialPosition, setInitialPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });
  const [asMove, setAsMove] = React.useState<boolean>(false);
  const [isTutoActive, setIsTutoActive] = React.useState(true);

  const falseParentfRef = React.useRef<HTMLElement>(null);
  const childRef = React.useRef<HTMLElement>(null);
  const sendParentRef = parentRef ? parentRef : falseParentfRef;

  const { tuto, setTuto, setTutoInactive } = useAppStore();
  const { position, reset, handleClick, isClick } = useMove(
    initialPosition,
    true,
    childRef,
    sendParentRef,
    needMoving,
    setNewIdGrid,
    setAsMove,
  );
  const { can_send_file_to } = useFilesGrid();
  const { newWindow } = useWindowPriority();

  React.useEffect(() => {
    const tutoIndex = tuto.find((t) => t.element === "folder");
    if (!tutoIndex) return;
    setIsTutoActive(tutoIndex.active);
  }, [tuto]);

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
    if (!sendParentRef || !grid || !sendParentRef.current || !childRef.current)
      return;

    const grid_size = {
      width: sendParentRef.current.clientWidth,
      height: sendParentRef.current.clientHeight,
    };

    childRef.current.style.width = `${grid_size.width}px`;
    childRef.current.style.height = `${grid_size.height}px`;

    sendParentRef.current.style.position = "unset";
    childRef.current.style.position = "absolute";
    childRef.current.style.zIndex = "900";

    handleClick(mouse);
  };

  const handleDoubleClick = () => {
    if (setPath) {
      setPath(folder.path);
    } else {
      newWindow(folder);

      for (let i = 0; i < tuto.length; i++) {
        const element = tuto[i];

        if (element.element === "folder" && element.active) {
          const newTuto = tuto.map((t) =>
            t.element === element.element
              ? { element: t.element, active: false }
              : t,
          );
          setTuto(newTuto);
          return;
        }
      }
    }
  };

  const onReset = () => {
    if (!sendParentRef || !grid || !sendParentRef.current || !childRef.current)
      return;

    childRef.current.style.width = `100%`;
    childRef.current.style.height = `100%`;

    sendParentRef.current.style.position = "relative";
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
      onMouseDown={(mouse) => (isTutoActive ? null : onClick(mouse))}
      onDoubleClick={() => handleDoubleClick()}
      onMouseEnter={() => (isTutoActive ? setTutoInactive(true) : null)}
      onMouseOut={() => (isTutoActive ? setTutoInactive(false) : null)}
      ref={childRef}
      className="folder"
      id={`folder-${grid ? grid.id * 10 : ""}`}
      style={
        isClick
          ? {
              top: `${position.y}px`,
              left: `${position.x}px`,
            }
          : {}
      }
    >
      <div className="folder-image-container">
        <img className="folder-image" src="/images/Folder-top.svg" />
        <DominantFileInFolder folder={folder} />
      </div>
      {folder.name}
    </article>
  );
};

export default React.memo(FolderElement);
