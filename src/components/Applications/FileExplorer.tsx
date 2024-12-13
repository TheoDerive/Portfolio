import React from "react";
import { Window } from "../../type/windowType";
import usePathContent from "../../hooks/usePathContent";
import { isFile, isFolder } from "../../utils/verifElementType";
import FileElement from "../File";
import FolderElement from "../Folder";
import { File, Folder } from "../../type/filesGridType";

type Props = {
  windowProps: Window;
};

const FileExplorer = ({ windowProps }: Props) => {
  const [path, setPath] = React.useState(windowProps.path);

  const { getWindowContent } = usePathContent();

  const printContent = React.useCallback(() => {
    const content = getWindowContent(path);

    if (content.length === 1 && isFolder(content[0])) {
      return content[0].content.map((element: File | Folder) =>
        isFile(element) ? (
          <FileElement file={element} />
        ) : (
          <FolderElement folder={element} setPath={setPath} />
        ),
      );
    } else if (content.length > 1) {
      let test = [];
      content.forEach((element) => {
        if (isFile(element)) {
          console.log(element);
          test = [...test, <FileElement file={element} />];
        } else {
          test = [
            ...test,
            <FolderElement folder={element} setPath={setPath} />,
          ];
        }
      });

      return test;
    }
  }, [path, getWindowContent]);

  const prevFolder = React.useCallback(() => {
    const elements = path.split("/").slice(1, undefined);
    elements.pop();
    const result = `/${elements.join("/")}`;
    console.log(result);
    setPath(result);
  }, [path]);

  return (
    <section className="window-content-container">
      <div className="window-content">
        {path !== "/" ? (
          <article className="return-file" onClick={() => prevFolder()}>
            <img className="return-image" src="/images/arrow.svg" />
            Retour
          </article>
        ) : null}

        {printContent()}
      </div>
    </section>
  );
};

export default React.memo(FileExplorer);
