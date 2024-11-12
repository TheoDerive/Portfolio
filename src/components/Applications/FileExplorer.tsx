import React from "react";
import { Window } from "../../type/windowType";
import usePathContent from "../../hooks/usePathContent";
import { isFile, isFolder } from "../../utils/verifElementType";
import FileElement from "../File";
import FolderElement from "../Folder";

type Props = {
  windowProps: Window;
};

const FileExplorer = ({ windowProps }: Props) => {
  const [path, setPath] = React.useState(windowProps.path);

  const { getWindowContent } = usePathContent();

  const printContent = React.useCallback(() => {
    const content = getWindowContent(path);

    if (content.length > 1) {
      return content.map((element) => <p>{element.name}</p>);
    } else if (content.length === 1 && isFolder(content[0])) {
      return content[0].content.map((element) =>
        isFile(element) ? (
          <FileElement file={element} />
        ) : (
          <FolderElement folder={element} setPath={setPath} />
        ),
      );
    } else if (content.length === 1 && isFile(content[0])) {
      return <p>{content[0].content}</p>;
    }
  }, [path]);

  return (
    <section className="window-content-container">
      <div className="window-content">{printContent()}</div>
    </section>
  );
};

export default React.memo(FileExplorer);
