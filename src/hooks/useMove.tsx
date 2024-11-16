import React, { useCallback } from "react";
import { PositionType } from "../type/vectorType";
import { useAppStore } from "../data/store";

const useMove = (
  initPosition: PositionType,
  isGridElement: boolean,
  parentRef: React.RefObject<HTMLElement>,
  childRef: React.RefObject<HTMLElement>,
  needMoving: boolean = true,
  setNewIdGrid?: (id: number) => void,
  setAsMove?: (asMove: boolean) => void,
): {
  reset: () => void;
  position: PositionType;
  handleClick: (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => void;
  isClick: boolean;
} => {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<PositionType>(initPosition);
  const [initialPosition, setInitialPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });

  const { setTutoInactive } = useAppStore();

  React.useEffect(() => {
    setPosition(initPosition);
  }, [initPosition]);

  const handleClick = useCallback(
    (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
      if (!parentRef.current || !childRef.current) return;
      setInitialPosition({ x: mouse.clientX, y: mouse.clientY });
      setIsClick(true);
    },
    [parentRef, childRef],
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

      setTutoInactive(true);

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

  if (!needMoving) {
    return {
      reset: () => null,
      position: initPosition,
      handleClick: () => null,
      isClick,
    };
  }

  return { reset, position, handleClick, isClick };
};

export default useMove;
