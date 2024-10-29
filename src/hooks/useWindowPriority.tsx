import React, { useCallback } from "react";
import { useAppStore } from "../data/store";
import { File, FileType, Folder } from "../type/filesGridType";
import { Window, WindowIdentification } from "../type/windowType";
import usePathContent from "./usePathContent";

interface State {
  [key: string]: WindowIdentification[];
}

export default function useWindowPriority() {
  const [activeWindows, setActiveWindows] = React.useState<State>(init());

  const { windows, setWindow } = useAppStore();
  const { getWindowContent } = usePathContent();

  React.useEffect(() => console.log(activeWindows), [activeWindows]);

  function init() {
    const windowInit: State = {
      text: [],
      folder: [],
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
            windowDOM.style.zIndex = String(999);
          } else {
            windowDOM.style.zIndex = String(100);
          }
        }
      }
    },
    [windows],
  );

  const newWindow = useCallback(
    (element: File | Folder) => {
      const windowAlreadyExist = windows.filter(
        (wind) => wind.id === element.id * 20,
      );

      if (windowAlreadyExist.length > 0) return;

      const new_window: Window = {
        id: element.id * 20,
        name: element.name,
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
    },
    [windows],
  );

  const getWindowsActive = useCallback(() => {
    if (windows.length < 1) {
      setActiveWindows(init());
      return;
    }
    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];

      const content = getWindowContent(window.path);
      const contentType = content[0].type;

      setActiveWindows({
        ...activeWindows,
        [contentType]: [
          {
            name: window.name,
            id: window.id,
            snooze: window.snooze,
          },
        ],
      });
    }
  }, [windows]);

  return {
    setWindowPriority,
    newWindow,
    removeWindow,
    snoozeWindow,
    unsnoozeWindow,
    getWindowsActive,
  };
}
