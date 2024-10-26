import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Window } from "../type/windowType";
import React from "react";
import {
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { PositionType } from "../type/positionType";
import { useAppStore } from "../data/store";

type Props = {
  windowProps: Window;
};

const initPosition: PositionType = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

export default function WindowElement({ windowProps }: Props) {
  const [position, setPosition] = React.useState<PositionType>(initPosition);
  const [prevSize, setPrevSize] = React.useState({
    x: (window.innerWidth / 100) * 70,
    y: (window.innerHeight / 100) * 70,
  });
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [isClick, setIsClick] = React.useState(false);
  const [initialPosition, setInitalPosition] = React.useState<PositionType>({
    x: 0,
    y: 0,
  });

  const windowMoveRef = React.useRef<HTMLElement>(null);
  const windowRef = React.useRef<HTMLElement>(null);

  const { windows, setWindow } = useAppStore();

  const reset = () => {
    if (!windowMoveRef.current) return;

    setIsClick(false);
    setInitalPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (
    mouse: React.MouseEvent<HTMLElement | MouseEvent>,
  ) => {
    if (isFullScreen || !windowRef.current || !windowMoveRef.current) return;
    const mouseTarget = mouse.target as HTMLElement;

    if (
      mouseTarget.childNodes.length !== 3 ||
      mouseTarget.className === "window-header-name" ||
      windowMoveRef.current
    ) {
      windowRef.current.style.zIndex = "999";
      windowMoveRef.current.style.transform = "unset";
      setIsClick(true);
      setInitalPosition({
        x: mouse.clientX,
        y: mouse.clientY,
      });
    }
  };

  React.useEffect(() => {
    const handleMove = (mouse: MouseEvent) => {
      if (!windowMoveRef.current || !isClick) return;

      const position_offset: PositionType = {
        x: mouse.clientX - initialPosition.x,
        y: mouse.clientY - initialPosition.y,
      };

      console.log(position_offset);

      setPosition({
        x: position.x + position_offset.x,
        y: position.y + position_offset.y,
      });
    };

    const handleMouseUp = () => {
      if (isClick) reset();
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMove);
    };
  }, [isClick, windowMoveRef]);

  React.useEffect(() => {
    if (!windowRef.current) return;

    if (isFullScreen) {
      windowRef.current.style.width = "100vw";
      windowRef.current.style.height = "100vh";
      windowRef.current.style.transform = "unset";
      windowRef.current.style.top = "0";
      windowRef.current.style.left = "0";
      windowRef.current.style.zIndex = "999";
    } else {
      windowRef.current.style.width = `${prevSize.x}px`;
      windowRef.current.style.height = `${prevSize.y}px`;
      windowRef.current.style.transform = "translate(-50%, -50%)";
      windowRef.current.style.top = `${position.y}px`;
      windowRef.current.style.left = `${position.x}px`;
    }
  }, [isFullScreen, windowRef]);

  const handleResizeMouseDown = (
    e: React.MouseEvent<HTMLDivElement | MouseEvent>,
    direction: string,
  ) => {
    if (!windowRef.current) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowRef.current.offsetWidth;
    const startHeight = windowRef.current.offsetHeight;

    const handleResizeMouseMove = (e: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      if (direction === "right") newWidth += e.clientX - startX;
      if (direction === "left") newWidth -= e.clientX - startX;
      if (direction === "bottom") newHeight += e.clientY - startY;
      if (direction === "top") newHeight -= e.clientY - startY;

      setPrevSize({ x: newWidth, y: newHeight });
    };

    const handleResizeMouseUp = () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  return (
    <section
      ref={windowRef}
      className="window"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${prevSize.x}px`,
        height: `${prevSize.y}px`,
      }}
    >
      <section
        onMouseDown={(e) => handleMouseDown(e)}
        className="window-header"
        ref={windowMoveRef}
      >
        <div style={{ width: "110px" }}></div>
        <p className="window-header-name">{windowProps.name}</p>

        <div className="window-header-buttons">
          <button className="minimize-button"></button>
          <button
            className="fullscreen-button"
            onClick={() => setIsFullScreen((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={
                isFullScreen
                  ? faUpRightAndDownLeftFromCenter
                  : faDownLeftAndUpRightToCenter
              }
              style={{ width: "10px" }}
            />
          </button>
          <button
            className="close-button"
            onClick={() => {
              const remove_window = windows.filter(
                (windowFil) => windowFil.id !== windowProps.id,
              );

              setWindow(remove_window);
            }}
          ></button>
        </div>
      </section>

      <div
        className="right-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "right")}
      />
      <div
        className="left-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "left")}
      />
      <div
        className="top-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top")}
      />
      <div
        className="bottom-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
      />
    </section>
  );
}
