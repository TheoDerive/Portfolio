import React from "react";

import { FileType } from "../type/filesType";
import { useAppStore } from "../store";
import { new_window } from "../utils/window_gestion";

type Props = {
  file: FileType;
  prev_position: [number, number];
};

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export default function File({ file, prev_position }: Props) {
  const fileRef = React.useRef<HTMLElement>(null);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] =
    React.useState<[number, number]>(prev_position);

  const { setWindows, windows } = useAppStore();

  React.useEffect(() => {
    if (!fileRef.current) return;

    const moveFile = (mouse: MouseEvent) => {
      if (!isClick || !fileRef.current) return;
      const width = fileRef.current.getBoundingClientRect().width;
      const height = fileRef.current.getBoundingClientRect().height;
      const Top = fileRef.current.getBoundingClientRect().top;
      const Bottom = fileRef.current.getBoundingClientRect().bottom;
      const Left = fileRef.current.getBoundingClientRect().left;
      const Right = fileRef.current.getBoundingClientRect().right;
      console.log(Left);

      if (Top - 1 < 9) {
        setPosition([15, mouse.clientX - 15]);
        setIsClick(false);
        return;
      } else if (Bottom - 1 > windowHeight - 9) {
        setPosition([windowHeight - height - 15, mouse.clientX - 15]);
        setIsClick(false);
        return;
      } else if (Left - 1 < 9) {
        setPosition([mouse.clientY - 15, 15]);
        setIsClick(false);
        return;
      } else if (Right - 1 > windowWidth - 9) {
        setPosition([mouse.clientY - 15, windowWidth - width - 15]);
        setIsClick(false);
        return;
      }

      setPosition([mouse.clientY - 15, mouse.clientX - 15]);
    };

    window.addEventListener("mousemove", moveFile);

    return () => {
      window.removeEventListener("mousemove", moveFile);
    };
  }, [isClick, fileRef]);

  return (
    <article
      ref={fileRef}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      onDoubleClick={() =>
        new_window(windows, setWindows, {
          name: "window_test",
          content: "test",
          id: 50,
          isActive: true,
          isMinimize: false,
        })
      }
      className="file"
      style={{ top: `${position[0] + 15}px`, left: `${position[1] + 15}px` }}
    >
      <p>{file.name}</p>
    </article>
  );
}
