import React from "react";
import { WindowType } from "../type/windowType";

type Props = {
  window_element: WindowType;
  prev_position: [number, number];
};

export default function Window({ window_element, prev_position }: Props) {
  const windowRef = React.useRef<HTMLElement>(null);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] =
    React.useState<[number, number]>(prev_position);

  return (
    <article
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      ref={windowRef}
      className="window"
      style={{
        top: `${position[0] + (windowRef.current ? windowRef.current?.offsetHeight / 2 : 0)}px`,
        left: `${position[1] + (windowRef.current ? windowRef.current?.offsetWidth / 2 : 0)}px`,
      }}
    >
      <p> {window_element.name}</p>

      <button>reduce</button>
      <button>close</button>
    </article>
  );
}
