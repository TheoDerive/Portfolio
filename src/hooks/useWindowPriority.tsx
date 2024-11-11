import React, { useCallback } from "react";
import { useAppStore } from "../data/store";
import { File, Folder } from "../type/filesGridType";
import { Window, WindowIdentification } from "../type/windowType";
import usePathContent from "./usePathContent";

interface State {
  [key: string]: WindowIdentification[];
}

export default function useWindowPriority() {
  const [activeWindows, setActiveWindows] = React.useState<State>(init());

  const { windows, setWindow } = useAppStore();
  const { getWindowContent } = usePathContent();

  React.useEffect(() => {
    addWindowsActive();
  }, [windows]);

  function init() {
    const windowInit: State = {
      text: [],
      folder: [],
      console: [],
    };

    return windowInit;
  }

  const setWindowPriority = useCallback(
    (id: number) => {
      for (let index = 0; index < windows.length; index++) {
        const window = windows[index];
        const windowDOM = document.getElementById(String(window.id));

        if (windowDOM) {
          if (window.id === id) {
            windowDOM.style.zIndex = String(200);
          } else {
            windowDOM.style.zIndex = String(100);
          }
        }
      }
    },
    [windows],
  );

  const addWindowsActive = useCallback(() => {
    const prevWindowsActive = init();
    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];

      const content = getWindowContent(window.path);
      const contentType = content[0].type;

      const newActiveWindow: WindowIdentification = {
        id: window.id,
        name: window.name,
        snooze: window.snooze,
        type: contentType,
      };

      prevWindowsActive[contentType].push(newActiveWindow);
    }

    setActiveWindows(prevWindowsActive);
  }, [windows]);

  const newWindow = useCallback(
    (element: File | Folder) => {
      const windowAlreadyExist = windows.filter(
        (wind) => wind.id === element.id * 20,
      );

      if (windowAlreadyExist.length > 0) {
        setWindowPriority(windowAlreadyExist[0].id);
        return;
      }

      const headerTitle = () => {
        switch (element.type) {
          case "folder":
            return "FileExplorer";

          case "text":
            return "FileReader";

          default:
            return element.name;
        }
      };

      const new_window: Window = {
        id: element.id * 20,
        name: headerTitle(),
        path: `${element.path}`,
        type: element.type,
        snooze: false,
      };

      for (let index = 0; index < windows.length; index++) {
        const window = windows[index];
        const windowDOM = document.getElementById(String(window.id));

        if (windowDOM) {
          windowDOM.style.zIndex = String(100);
        }
      }

      setWindow([...windows, new_window]);
    },
    [windows],
  );

  const removeWindow = useCallback(
    (id: number) => {
      const remove_window = windows.filter((windowFil) => windowFil.id !== id);

      setWindow(remove_window);
    },
    [windows],
  );

  const snoozeWindow = useCallback(
    (id: number) => {
      const snooze = windows.map((wind) =>
        wind.id === id ? { ...wind, snooze: true } : wind,
      );

      setWindow(snooze);
    },
    [windows],
  );

  const unsnoozeWindow = useCallback(
    (id: number) => {
      const unsnooze = windows.map((wind) =>
        wind.id === id ? { ...wind, snooze: false } : wind,
      );

      setWindow(unsnooze);
      setWindowPriority(id);
    },
    [windows],
  );

  return {
    setWindowPriority,
    newWindow,
    removeWindow,
    snoozeWindow,
    unsnoozeWindow,
    activeWindows,
  };
}
