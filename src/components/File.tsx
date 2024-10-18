import React from "react";

import { FileType } from "../type/filesType";
import {
  pathElementCollision,
  windowCollision,
} from "../utils/movePathElement";

type Props = {
  file: FileType;
};

export default function File({ file }: Props) {
  const fileRef = React.useRef<HTMLElement>(null);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<[number, number]>(
    file.position,
  );

  const halfWidth = file.size[0] / 2;
  const halfHeight = file.size[1] / 2;

  React.useEffect(() => {
    const first_collision = windowCollision(file);
    console.log(pathElementCollision(file, first_collision));
  }, []);

  return (
    <article
      ref={fileRef}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      className="file"
      style={{
        top: `${position[0] + halfHeight}px`,
        left: `${position[1] + halfWidth}px`,
        width: `${file.size[0]}px`,
        height: `${file.size[1]}px`,
      }}
    >
      <p>{file.name}</p>
    </article>
  );
}
