import React from "react";
import { CursorType } from "../type/desktopUtilsTypes";

export default function useDesktopUtilities() {
  const [cursorState, setCursorState] = React.useState<CursorType>("default");
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    let milliseconds = new Date().getSeconds();
    const interval = setInterval(
      () => {
        const currentDate = new Date();
        milliseconds = 0;

        setDate(currentDate);
      },
      60000 - milliseconds * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const html = document.querySelector("html");

    console.log("pass");
    if (!html) return;
    html.classList.forEach((el) => {
      if (!el) return;

      html.classList.remove(el);
    });

    html.classList.add(`${cursorState}-cursor`);
  }, [cursorState]);

  const changeCursor = (type: CursorType) => {
    console.log(type);
    setCursorState(type);
  };

  return { date, changeCursor, cursorState };
}
