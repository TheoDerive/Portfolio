import { Window } from "../type/windowType";
import React from "react";
import WindowHeader from "./Window/WindowHeader";
import { PositionType } from "../type/vectorType";
import useWindowPriority from "../hooks/useWindowPriority";
import Console from "./Applications/Console";
import TextReader from "./Applications/TextReading";
import FileExplorer from "./Applications/FileExplorer";
import { useAppStore } from "../data/store";

type Props = {
  windowProps: Window;
};

const initPosition: PositionType = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const WindowContainer = ({ windowProps }: Props) => {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<PositionType>(initPosition);
  // const [prevSize, setPrevSize] = React.useState<SizeType>({
  // });
  const prevSize = {
    w: (window.innerWidth / 100) * 70,
    h: (window.innerHeight / 100) * 70,
  };

  const windowRef = React.useRef<HTMLElement>(null);

  const { setWindowPriority } = useWindowPriority();

  const initWindow = () => {
    const getWindowContent = () => {
      switch (windowProps.type) {
        case "folder":
          return <FileExplorer windowProps={windowProps} />;

        case "text":
          return <TextReader windowProps={windowProps} />;

        case "console":
          return <Console />;

        default:
          break;
      }
    };

    return (
      <section
        ref={windowRef}
        id={`window-${windowProps.id}`}
        onClick={() => setWindowPriority(windowProps.id)}
        className={isFullScreen ? "window window-fullscreen" : "window"}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `${prevSize.w}px`,
          height: `${prevSize.h}px`,
        }}
      >
        <WindowHeader
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setPosition={setPosition}
          windowRef={windowRef}
          windowProps={windowProps}
        />

        {getWindowContent()}

        {/* <div */}
        {/*   className="right-resize" */}
        {/*   onMouseDown={(e) => handleResizeMouseDown(e, "right")} */}
        {/* /> */}
        {/* <div */}
        {/*   className="left-resize" */}
        {/*   onMouseDown={(e) => handleResizeMouseDown(e, "left")} */}
        {/* /> */}
        {/* <div */}
        {/*   className="top-resize" */}
        {/*   onMouseDown={(e) => handleResizeMouseDown(e, "top")} */}
        {/* /> */}
        {/* <div */}
        {/*   className="bottom-resize" */}
        {/*   onMouseDown={(e) => handleResizeMouseDown(e, "bottom")} */}
        {/* /> */}
      </section>
    );
  };

  // const handleResizeMouseDown = (
  //   e: React.MouseEvent<HTMLDivElement | MouseEvent>,
  //   direction: string,
  // ) => {
  //   if (!windowRef.current) return;
  //
  //   const startX = e.clientX;
  //   const startY = e.clientY;
  //   const startWidth = windowRef.current.offsetWidth;
  //   const startHeight = windowRef.current.offsetHeight;
  //
  //   const handleResizeMouseMove = (e: MouseEvent) => {
  //     let newWidth = startWidth;
  //     let newHeight = startHeight;
  //     if (direction === "right") newWidth += e.clientX - startX;
  //     if (direction === "left") newWidth -= e.clientX - startX;
  //     if (direction === "bottom") newHeight += e.clientY - startY;
  //     if (direction === "top") newHeight -= e.clientY - startY;
  //
  //     setPrevSize({ x: newWidth, y: newHeight });
  //   };
  //
  //   const handleResizeMouseUp = () => {
  //     document.removeEventListener("mousemove", handleResizeMouseMove);
  //     document.removeEventListener("mouseup", handleResizeMouseUp);
  //   };
  //
  //   document.addEventListener("mousemove", handleResizeMouseMove);
  //   document.addEventListener("mouseup", handleResizeMouseUp);
  // };

  return initWindow();
};

export default React.memo(WindowContainer);
