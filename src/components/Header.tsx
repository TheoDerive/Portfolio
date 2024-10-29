import React from "react";
import useDesktopUtilities from "../hooks/useDesktopUtilities";
import useWindowPriority from "../hooks/useWindowPriority";

const Header = () => {
  const { date } = useDesktopUtilities();
  const { getWindowsActive } = useWindowPriority();

  React.useEffect(() => {
    getWindowsActive();
  }, [getWindowsActive]);

  return (
    <header className="desktop-header">
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
