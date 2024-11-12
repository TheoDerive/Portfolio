import React from "react";
import { useAppStore } from "../../data/store";
import useConsole from "../../hooks/useConsole";

type ReturnValueType = {
  command: string;
  value: string;
};

const Console = () => {
  const [path, setPath] = React.useState<string>("/");
  const [returnValue, setReturnValue] = React.useState<ReturnValueType[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { username } = useAppStore();
  const { command } = useConsole();

  React.useEffect(() => {
    if (!inputRef.current) return;

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        command(inputValue, returnValue, setReturnValue, path);
        setInputValue("");
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [inputValue, inputRef, returnValue]);

  return (
    <section className="console-window">
      <section className="return-value">
        {returnValue.map((val) => (
          <>
            <p className="command-prompt">{val.command}</p>
            <p className="command-result">{val.value}</p>
          </>
        ))}
      </section>
      <span className="command-prompt">
        [ {username} {path} ]:
        <input
          ref={inputRef}
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </span>
    </section>
  );
};

export default React.memo(Console);
