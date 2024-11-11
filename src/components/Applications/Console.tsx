import React from "react";

const Console = () => {
  const [path, setPath] = React.useState<string>("/");
  const [consoleInfo, setConsoleInfo] = React.useState(`[ thyo ${path}]`);

  React.useEffect(() => {
    setConsoleInfo(`[ thyo ${path}]`);
  }, [path]);

  return (
    <section className="console-window">
      {consoleInfo}: <input autoFocus />
    </section>
  );
};

export default React.memo(Console);
