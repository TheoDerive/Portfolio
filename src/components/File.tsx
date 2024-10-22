import React, { RefObject } from "react";
import useFilesGrid from "../hooks/useFilesGrid";
import { File, GridType } from "../type/filesGridType";

export default function FileElement({
  file,
  grid,
  parentRef,
}: {
  file: File;
  grid: GridType;
  parentRef: RefObject<HTMLDivElement>;
}) {
  const [isClick, setIsClick] = React.useState(false);
  const [newIdGrid, setNewIdGrid] = React.useState<number | null>(null);
  const childRef = React.useRef<HTMLElement>(null);

  const { can_send_file_to } = useFilesGrid();

  const handleClick = () => {
    if (!parentRef.current || !childRef.current) return;

    const grid_size = {
      width: parentRef.current.clientWidth,
      height: parentRef.current.clientHeight,
    };

    childRef.current.style.width = `${grid_size.width}px`;
    childRef.current.style.height = `${grid_size.height}px`;

    parentRef.current.style.position = "unset";
    childRef.current.style.position = "absolute";
    childRef.current.style.transform = "translate(-50%, -50%)";
    childRef.current.style.pointerEvents = "none";

    setIsClick(true);
  };

  const reset = () => {
    if (!parentRef.current || !childRef.current) return;

    childRef.current.style.width = `100%`;
    childRef.current.style.height = `100%`;

    parentRef.current.style.position = "relative";
    childRef.current.style.position = "unset";
    childRef.current.style.transform = "translate(0%, 0%)";
    childRef.current.style.pointerEvents = "auto";

    setIsClick(false);

    if (newIdGrid) {
      can_send_file_to(grid, newIdGrid);
    }
  };

  React.useEffect(() => {
    const handleMove = (mouse: MouseEvent) => {
      if (!isClick || !childRef.current) return;

      childRef.current.style.top = `${mouse.clientY}px`;
      childRef.current.style.left = `${mouse.clientX}px`;

      if (mouse.target.className === "grid") {
        console.log(mouse.target.id);
        setNewIdGrid(Number(mouse.target.id));
      }

      if (mouse.target.className === "file") {
        setNewIdGrid(Number(mouse.target.parentElement.id));
      }

      setPosition({
        x: mouse.clientX,
        y: mouse.clientY,
      });
    };
    const handleMouseUp = () => {
      if (isClick) reset();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClick, newIdGrid, childRef]);

  return (
    <article
      onMouseDown={(e) => handleClick()}
      ref={childRef}
      className="file"
      id={`${file.id}`}
    >
      {file.name}
    </article>
  );
}
