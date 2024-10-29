import React from "react";
import { Window } from "../../type/windowType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { PositionType } from "../../type/vectorType";
import { useAppStore } from "../../data/store";
import useMove from "../../hooks/useMove";

type Props = {
  windowProps: Window;
  windowRef: React.RefObject<HTMLElement>;
  setPosition: (position: PositionType) => void;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
};

const initPosition: PositionType = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const WindowHeader = ({
  windowProps,
  windowRef,
  setPosition,
  isFullScreen,
  setIsFullScreen,
}: Props) => {
  const windowHeaderRef = React.useRef<HTMLElement>(null);

  const { windows, setWindow } = useAppStore();
  const { reset, handleClick, position } = useMove(
    initPosition,
    false,
    windowRef,
    windowHeaderRef,
  );

  React.useEffect(() => {
    setPosition(position);
  }, [position]);

  const handleMouseDown = React.useCallback(
    (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
      if (isFullScreen || !windowRef.current || !windowHeaderRef.current)
        return;
      const mouseTarget = mouse.target as HTMLElement;
      if (
        mouseTarget.childNodes.length !== 3 ||
        mouseTarget.className === "window-header-name" ||
        windowHeaderRef.current
      ) {
        windowRef.current.style.zIndex = "999";
        windowHeaderRef.current.style.transform = "unset";
      }

      handleClick(mouse);
    },

    [isFullScreen, windowRef, windowHeaderRef],
  );

  React.useEffect(() => {
    const handleMouseUp = () => {
      reset();
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [windowHeaderRef, reset]);

  return (
    <section
      onMouseDown={(e) => handleMouseDown(e)}
      className="window-header"
      ref={windowHeaderRef}
    >
      <div style={{ width: "110px" }}></div>
      <p className="window-header-name">File Explorer</p>

      <div className="window-header-buttons">
        <button className="minimize-button"></button>
        <button
          className="fullscreen-button"
          onClick={() => setIsFullScreen(!isFullScreen)}
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
  );
};

export default React.memo(WindowHeader);
