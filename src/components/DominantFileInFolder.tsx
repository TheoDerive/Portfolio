import React, { memo } from "react";
import { FileType, Folder } from "../type/filesGridType";

const DominantFileInFolder = memo(({ folder }: { folder: Folder }) => {
  const [dominantFiles, setDominantFiles] = React.useState<FileType[]>([]);

  React.useEffect(() => {
    if (!folder.content) return;
    const result: {
      text: number;
      image: number;
      code: number;
      default: number;
    } = {
      text: 0,
      image: 0,
      code: 0,
      default: 0,
    };

    for (let index = 0; index < folder.content.length; index++) {
      const element = folder.content[index];

      if (element.type === "file") {
        result[element.fileType] = result[element.fileType] + 1;
      }
    }
    const sortedValues = Object.entries(result)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([key, value]) => (value > 0 ? key : null)) as FileType[];

    setDominantFiles(sortedValues);
  }, [folder]);

  return (
    <>
      {dominantFiles.map((file, index) => (
        <div
          key={Math.floor(Math.random() * 100)}
          className={`under-image ${file}-image`}
          style={{
            zIndex: `-${index + 1}`,
            left: `${-5 + index * 10}px`,
            top: `${index === 1 ? -30 : -25}px`,
            transform: `rotate(${-45 + index * 45}deg)`,
            scale: 0,
          }}
        />
      ))}
    </>
  );
});

export default DominantFileInFolder;