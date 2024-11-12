export function cat(command: string) {
  return command;
}

export function echo(command: string) {
  const echoReturn = command.split(" ").slice(1).join(" ");
  return echoReturn;
}
