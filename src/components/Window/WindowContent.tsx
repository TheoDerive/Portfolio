import React, { useCallback } from "react";
import { File, Folder } from "../../type/filesGridType";
import { isFile, isFolder } from "../../utils/verifElementType";
import FileElement from "../File";
import FolderElement from "../Folder";

type Props = {
  content: (File | Folder)[];
  setPath: (path: string) => void;
};

const WindowContent = ({ content, setPath }: Props) => {
  const printContent = useCallback(() => {
    if (content.length > 1) {
      return content.map((element) => <p>{element.name}</p>);
    } else if (content.length === 1 && isFolder(content[0])) {
      return content[0].content.map((element) =>
        isFile(element) ? (
          <FileElement file={element} setPath={setPath} />
        ) : (
          <FolderElement folder={element} setPath={setPath} />
        ),
      );
    } else if (content.length === 1 && isFile(content[0])) {
      return <p>{content[0].content}</p>;
    }
  }, [content]);

  return (
    <section className="window-content-container">
      <div className="window-content">{printContent()}</div>
    </section>
  );
};

export default React.memo(WindowContent);
