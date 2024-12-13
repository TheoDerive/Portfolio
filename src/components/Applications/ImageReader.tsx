import React from "react";
import { Window } from "../../type/windowType";
import usePathContent from "../../hooks/usePathContent";

type Props = {
  windowProps: Window;
};

const ImageReader = ({ windowProps }: Props) => {
  const { getWindowContent } = usePathContent();

  const printContent = React.useCallback(() => {
    const content = getWindowContent(windowProps.path);

    return (
      <>
        {content[0].content.map((img: string) => (
          <img src={img} />
        ))}
      </>
    );
  }, []);

  return (
    <section className="window-content-container">
      <div className="window-image-content">{printContent()}</div>
    </section>
  );
};

export default React.memo(ImageReader);
