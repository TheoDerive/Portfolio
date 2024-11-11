import React from "react";
import { Window } from "../../type/windowType";
import usePathContent from "../../hooks/usePathContent";
import { isFile } from "../../utils/verifElementType";

type Props = {
  windowProps: Window;
};

const TextReader = ({ windowProps }: Props) => {
  console.log("pass");
  const { getWindowContent } = usePathContent();
  const content = () => {
    const content = getWindowContent(windowProps.path);
    if (!isFile(content[0])) return;

    return content[0].content;
  };

  content();

  return (
    <section className="window-content-container">
      <div className="window-content">{content()}</div>
    </section>
  );
};

export default React.memo(TextReader);
