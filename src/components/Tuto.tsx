import React from "react";
import { useAppStore } from "../data/store";
import { PositionType } from "../type/vectorType";

const TutoComponent = ({
  setTutoPass,
}: {
  setTutoPass: (tuto: boolean) => void;
}) => {
  const [boxPosition, setBoxPosition] = React.useState<PositionType>({
    y: (window.innerWidth / 100) * 17.6 - 60,
    x: 0,
  });
  const [index, setIndex] = React.useState<string>("folder");
  const { tuto, setTuto, tutoInactive } = useAppStore();

  React.useEffect(() => {
    for (let index = 0; index < tuto.length; index++) {
      const element = tuto[index];

      if (element.active) {
        setIndex(element.element);

        if (element.elementActive) {
          console.log(element.elementActive);
          const findElement = document.querySelector(
            `#${element.elementActive}`,
          ) as HTMLElement;
          const newPosition: PositionType = {
            x: Number(findElement.style.left),
            y: Number(findElement.style.top),
          };

          setBoxPosition(newPosition);
        }

        return;
      }
    }
  }, [tuto]);

  function getIndexContent(): string {
    switch (index) {
      case "file":
        return "File";

      default:
        return "";
    }
  }

  return (
    <>
      {tutoInactive ? null : (
        <section className="tuto-container">
          <section className={`tuto-overlay ${index}-tuto`}></section>
          <section
            style={{ top: `${boxPosition.y}px`, left: `${boxPosition.x}px` }}
            className={`active-tuto-square ${index}-square`}
          />
          <p className={`help-message-${index} info-font`}>
            {getIndexContent()}
          </p>
          <button>Suivant</button>
          <button>Sauter la lecon</button>
        </section>
      )}
    </>
  );
};

export default React.memo(TutoComponent);
