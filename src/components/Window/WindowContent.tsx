import React, { useCallback } from "react";
import { isFile, isFolder } from "../../utils/verifElementType";
import FileElement from "../File";
import FolderElement from "../Folder";
import usePathContent from "../../hooks/usePathContent";

type Props = {
  initPath: string;
};

const WindowContent = ({ initPath }: Props) => {
  const [path, setPath] = React.useState(initPath);

  const { getWindowContent } = usePathContent();

  const printContent = useCallback(() => {
    const content = getWindowContent(path);

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
  }, []);

  return (
    <section className="window-content-container">
      <div className="window-content">{printContent()}</div>
    </section>
  );
};

export default React.memo(WindowContent);
