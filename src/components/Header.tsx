import React from "react";
import useDesktopUtilities from "../hooks/useDesktopUtilities";
import useWindowPriority from "../hooks/useWindowPriority";
import { WindowIdentification } from "../type/windowType";

const Header = () => {
  const { date } = useDesktopUtilities();
  const { activeWindows, unsnoozeWindow, setWindowPriority } =
    useWindowPriority();

  const getWindowsActiveImage = (type: string): string => {
    switch (type) {
      case "text":
        return "/images/File-text-top.svg";

      case "folder":
        return "/images/Folder-top.svg";

      default:
        return "/images/File-empty-top.svg";
    }
  };

  const displayActiveWindow = React.useCallback(
    (key: string, content: WindowIdentification[]) => {
      return (
        <div className="windows-active-container">
          {content.map((wind) => (
            <div
              className={`window-active ${wind.snooze ? "window-active-snooze" : ""}`}
              onClick={() =>
                wind.snooze
                  ? unsnoozeWindow(wind.id)
                  : setWindowPriority(wind.id)
              }
            >
              <img
                className="window-active-image"
                src={getWindowsActiveImage(key)}
              />
              <p>{wind.name}</p>
            </div>
          ))}
        </div>
      );
    },
    [activeWindows],
  );

  const displayActiveWindowType = React.useCallback(
    (key: string, content: WindowIdentification[]) => {
      return (
        <div
          className={`header-window-active-type ${key}-active-window`}
          onClick={() => {
            console.log(content);
            if (content.length !== 1) return;

            unsnoozeWindow(content[0].id);
            setWindowPriority(content[0].id);
          }}
        >
          <span className="header-window-active-type-counter"></span>
          {displayActiveWindow(key, content)}
        </div>
      );
    },
    [activeWindows],
  );

  return (
    <header className="desktop-header">
      <section className="windows-active-type">
        {Object.keys(activeWindows).map((key) =>
          activeWindows[key].length > 0
            ? displayActiveWindowType(key, activeWindows[key])
            : null,
        )}
      </section>
      <section className="left">
        <p className="time">
          {date.getHours()}:{date.getMinutes()}
        </p>
        <p className="date">
          {date.getFullYear()}/{date.getMonth()}/{date.getDay()}
        </p>
      </section>
    </header>
  );
};

export default React.memo(Header);
