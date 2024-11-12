import React, { RefObject } from "react";
import useFilesGrid from "../hooks/useFilesGrid";
import { File, GridType } from "../type/filesGridType";
import useMove from "../hooks/useMove";
import { PositionType } from "../type/vectorType";
import useWindowPriority from "../hooks/useWindowPriority";

const FileElement = ({
  file,
  grid,
  parentRef,
  needMoving = true,
}: {
  file: File;
  grid?: GridType;
  parentRef?: RefObject<HTMLDivElement>;
  needMoving?: boolean;
}) => {
  const [newIdGrid, setNewIdGrid] = React.useState<number | null>(null);
  const [initialPosition, setInitialPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });
  const [asMove, setAsMove] = React.useState<boolean>(false);

  const falseParentfRef = React.useRef<HTMLElement>(null);
  const childRef = React.useRef<HTMLElement>(null);
  const sendParentRef = parentRef ? parentRef : falseParentfRef;

  const { position, reset, handleClick } = useMove(
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
    console.log(position);
  }, [position]);

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
    if (!sendParentRef || !sendParentRef.current || !childRef.current) return;
    console.log("click file");

    const grid_size = {
      width: sendParentRef.current.clientWidth,
      height: sendParentRef.current.clientHeight,
    };

    childRef.current.style.width = `${grid_size.width}px`;
    childRef.current.style.height = `${grid_size.height}px`;

    sendParentRef.current.style.position = "unset";
    childRef.current.style.position = "absolute";

    handleClick(mouse);
  };

  const handleDoubleClick = () => {
    newWindow(file);
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
      onMouseDown={(mouse) => onClick(mouse)}
      onDoubleClick={() => handleDoubleClick()}
      ref={childRef}
      className="file"
      id={`${file.id}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="file-image-container">
        <img className="file-image" src="/images/File-text-top.svg" />
      </div>
      {file.name}
    </article>
  );
};

export default React.memo(FileElement);
