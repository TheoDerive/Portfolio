import React from "react";
import { Window } from "../../type/windowType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { PositionType } from "../../type/vectorType";
import useMove from "../../hooks/useMove";
import useWindowPriority from "../../hooks/useWindowPriority";
import { useAppStore } from "../../data/store";
import useTuto from "../../hooks/useTuto";
import useDesktopUtilities from "../../hooks/useDesktopUtilities";

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
  const [isTutoActive, setIsTutoActive] = React.useState(true);
  const windowHeaderRef = React.useRef<HTMLElement>(null);

  const { removeWindow, snoozeWindow } = useWindowPriority();
  const { reset, handleClick, position } = useMove(
    initPosition,
    false,
    windowRef,
    windowHeaderRef,
  );
  const { nextTuto } = useTuto();
  const { changeCursor } = useDesktopUtilities();

  React.useEffect(() => {
    setPosition(position);
  }, [position]);

  const { tuto, setTuto, setTutoInactive } = useAppStore();

  React.useEffect(() => {
    const tutoIndex = tuto.find((t) => t.element === "windows");
    if (!tutoIndex) return;
    setIsTutoActive(tutoIndex.active);
  }, [tuto]);

  const handleMouseDown = React.useCallback(
    (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
      if (
        isFullScreen ||
        !windowRef.current ||
        !windowHeaderRef.current ||
        isTutoActive
      )
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

    [isFullScreen, windowRef, windowHeaderRef, isTutoActive],
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
      <p className="window-header-name">{windowProps.name}</p>

      <div className="window-header-buttons">
        <button
          className="minimize-button"
          onClick={() => {
            snoozeWindow(windowProps.id);
            nextTuto();
          }}
        ></button>
        <button
          className="fullscreen-button"
          onClick={() => (isTutoActive ? null : setIsFullScreen(!isFullScreen))}
          onMouseEnter={() => (isTutoActive ? changeCursor("forbidden") : null)}
          onMouseLeave={() => (isTutoActive ? changeCursor("default") : null)}
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
          onClick={() => (isTutoActive ? null : removeWindow(windowProps.id))}
          onMouseEnter={() => (isTutoActive ? changeCursor("forbidden") : null)}
          onMouseLeave={() => (isTutoActive ? changeCursor("default") : null)}
        ></button>
      </div>
    </section>
  );
};

export default React.memo(WindowHeader);
