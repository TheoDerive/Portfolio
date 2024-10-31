import React from "react";

export default function useDesktopUtilities() {
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

  return { date };
}
