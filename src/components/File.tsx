import React from "react";
import { FileType } from "../type/filesType";

type Props = {
  file: FileType;
  prev_position: [number, number];
};

export default function File({ file, prev_position }: Props) {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] =
    React.useState<[number, number]>(prev_position);

  React.useEffect(() => {
    const moveFile = (mouse: MouseEvent) => {
      if (!isClick) return;
      setPosition([mouse.clientY - 15, mouse.clientX - 15]);
    };

    window.addEventListener("mousemove", moveFile);

    return () => {
      window.removeEventListener("mousemove", moveFile);
    };
  }, [isClick]);

  return (
    <article
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      className="file"
      style={{ top: `${position[0] + 15}px`, left: `${position[1] + 15}px` }}
    >
      <p>{file.name}</p>
    </article>
  );
}
