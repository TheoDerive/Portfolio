import React from "react";
import { WindowType } from "../type/windowType";

type Props = {
  window: WindowType;
  prev_position: [number, number];
};

export default function Window({ window, prev_position }: Props) {
  const [position, setPosition] =
    React.useState<[number, number]>(prev_position);

  return (
    <article
      className="window"
      style={{ top: `${position[0] + 15}px`, left: `${position[1] + 15}px` }}
    >
      <p> {window.name}</p>
    </article>
  );
}
