import { WindowType } from "../type/windowType";

export function new_window(
  windows: WindowType[],
  setWindows: (windows: WindowType[]) => void,
  new_window: WindowType,
) {
  const isExist = windows.filter(
    (window) => window.id === new_window.id && window.name === new_window.name,
  );

  if (isExist.length > 0) return;

  setWindows([...windows, new_window]);
}
