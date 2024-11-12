import { useCallback } from "react";
import { cat, echo } from "../utils/commands";
import { useAppStore } from "../data/store";

type ReturnValueType = {
  command: string;
  value: string;
};

export default function useConsole() {
  const { username } = useAppStore();

  const command = useCallback(
    (
      command: string,
      returnValue: ReturnValueType[],
      setReturnValue: (returnValue: ReturnValueType[]) => void,
      path: string,
    ) => {
      const commandValue = command.split(" ")[0];

      switch (commandValue) {
        case "cat":
          returnCommand(
            command,
            cat(command),
            returnValue,
            setReturnValue,
            path,
          );
          break;

        case "echo":
          returnCommand(
            command,
            echo(command),
            returnValue,
            setReturnValue,
            path,
          );
          break;

        default:
          break;
      }
    },
    [],
  );

  const returnCommand = useCallback(
    (
      command: string,
      returnCommandValue: string,
      returnValue: ReturnValueType[],
      setReturnValue: (returnValue: ReturnValueType[]) => void,
      path: string,
    ) => {
      const returnNewValue = {
        command: `[ ${username} ${path}] ${command}`,
        value: returnCommandValue,
      };

      setReturnValue([...returnValue, returnNewValue]);
    },
    [username],
  );

  return { command };
}
