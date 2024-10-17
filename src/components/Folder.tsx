import React from "react";
import { FolderType } from "../type/filesType";

type Props = {
  folder: FolderType;
  prev_position: [number, number];
};

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export default function Folder({ folder, prev_position }: Props) {
  const folderRef = React.useRef<HTMLElement>(null);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] =
    React.useState<[number, number]>(prev_position);

  React.useEffect(() => {
    if (!folderRef.current) return;

    const moveFile = (mouse: MouseEvent) => {
      if (!isClick || !folderRef.current) return;
      const width = folderRef.current.getBoundingClientRect().width;
      const height = folderRef.current.getBoundingClientRect().height;
      const Top = folderRef.current.getBoundingClientRect().top;
      const Bottom = folderRef.current.getBoundingClientRect().bottom;
      const Left = folderRef.current.getBoundingClientRect().left;
      const Right = folderRef.current.getBoundingClientRect().right;

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
  }, [isClick, folderRef]);

  return (
    <article
      ref={folderRef}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      className="folder"
      style={{ top: `${position[0] + 15}px`, left: `${position[1] + 15}px` }}
    >
      <p>{folder.name}</p>
    </article>
  );
}
