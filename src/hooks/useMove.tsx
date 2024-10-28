import React, { useCallback } from "react";
import { PositionType } from "../type/vectorType";

const useMove = (
  initPosition: PositionType,
  isGridElement: boolean,
  parentRef: React.RefObject<HTMLElement>,
  childRef: React.RefObject<HTMLElement>,
  setNewIdGrid?: (id: number) => void,
  setAsMove?: (asMove: boolean) => void,
) => {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<PositionType>(initPosition);
  const [initialPosition, setInitialPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    setPosition(initPosition);
  }, [initPosition]);

  const handleClick = useCallback(
    (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
      if (!parentRef.current || !childRef.current) return;
      setIsClick(true);
      setInitialPosition({ x: mouse.clientX, y: mouse.clientY });
    },
    [initPosition],
  );

  const reset = useCallback(() => {
    setIsClick(false);
    setInitialPosition({
      x: 0,
      y: 0,
    });
    if (setAsMove) {
      setAsMove(false);
    }
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (mouse: MouseEvent) => {
      if (!parentRef.current || !childRef.current || !isClick) return;

      if (setAsMove) {
        setAsMove(true);
      }
      const position_offset: PositionType = {
        x: mouse.clientX - initialPosition.x,
        y: mouse.clientY - initialPosition.y,
      };

      if (isGridElement && setNewIdGrid) {
        childRef.current.style.pointerEvents = "none";
        const mouseTarget = mouse.target as HTMLElement;

        if (mouseTarget.className === "grid") {
          setNewIdGrid(Number(mouseTarget.id));
        }

        if (
          (mouseTarget.className === "file" && mouseTarget.parentElement) ||
          (mouseTarget.className === "folder" && mouseTarget.parentElement)
        ) {
          setNewIdGrid(Number(mouseTarget.parentElement.id));
        }
      }

      setPosition({
        x: position.x + position_offset.x,
        y: position.y + position_offset.y,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [initialPosition, childRef, parentRef, isClick]);

  return { reset, handleClick, position };
};

export default useMove;
