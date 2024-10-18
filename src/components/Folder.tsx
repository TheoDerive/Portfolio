import React from "react";
import { FolderType } from "../type/filesType";

type Props = {
  folder: FolderType;
};

export default function Folder({ folder }: Props) {
  const folderRef = React.useRef<HTMLElement>(null);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<[number, number]>(
    folder.position,
  );

  const halfWidth = folder.size[0] / 2;
  const halfHeight = folder.size[1] / 2;

  return (
    <article
      ref={folderRef}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      className="folder"
      style={{
        background: "blue",
        top: `${position[0] + halfHeight}px`,
        left: `${position[1] + halfWidth}px`,
        width: `${folder.size[0]}px`,
        height: `${folder.size[1]}px`,
      }}
    >
      <p>{folder.name}</p>
    </article>
  );
}
