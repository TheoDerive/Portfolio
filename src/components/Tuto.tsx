import React from "react";
import { useAppStore } from "../data/store";
import { PositionType } from "../type/vectorType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TutoComponent = ({
  setTutoPass,
}: {
  setTutoPass: (tuto: boolean) => void;
}) => {
  const [boxPosition, setBoxPosition] = React.useState<PositionType>({
    y: (window.innerHeight / 8) * 2 - 68,
    x: 0,
  });
  const [index, setIndex] = React.useState<string>("file");
  const [gridSize, setGridSize] = React.useState<PositionType>({
    x: (window.innerWidth / 100) * 12,
    y: (window.innerHeight / 100) * 12,
  });

  const { tuto, setTuto, tutoInactive } = useAppStore();

  React.useEffect(() => {
    const file = document.querySelector(`#file-110`)?.getBoundingClientRect();
    const folder = document
      .querySelector(`#folder-100`)
      ?.getBoundingClientRect();

    if (!folder || !file) return;

    let newBoxPosition;

    switch (index) {
      case "file":
        newBoxPosition = {
          x: file.x,
          y: file.y - 3,
        };
        break;

      case "folder":
        newBoxPosition = {
          x: folder.x,
          y: folder.y - 3,
        };
        break;

      default:
        newBoxPosition = {
          x: 0,
          y: 0,
        };
        break;
    }

    setBoxPosition(newBoxPosition);
  }, [index]);

  React.useEffect(() => {
    for (let index = 0; index < tuto.length; index++) {
      const element = tuto[index];

      if (element.active) {
        setIndex(element.element);

        if (element.elementActive) {
          console.log(element.elementActive);
          const findElement = document.querySelector(
            `#file-${element.elementActive}`,
          ) as HTMLElement;
          console.log(findElement.getBoundingClientRect());
          const elementPosition = findElement.getBoundingClientRect();
          const newPosition: PositionType = {
            x: Number(elementPosition.x),
            y: Number(elementPosition.y) - 3,
          };

          setBoxPosition(newPosition);
        }

        return;
      }
    }
  }, [tuto]);

  React.useEffect(() => {
    const grid = document.querySelector(".grid");
    if (!grid) return;

    const grid_size = {
      x: grid.clientWidth,
      y: grid.clientHeight,
    };

    setGridSize(grid_size);
  }, [boxPosition]);

  function nextTuto() {
    let isEnd = false;
    const newTuto = tuto.map((t, i) => {
      if (t.element === index && t.active) {
        if (!tuto[i + 1]) isEnd = true;
        return {
          element: t.element,
          active: false,
          elementActive: t.elementActive,
        };
      } else {
        return t;
      }
    });

    setTuto(newTuto);
    if (isEnd) {
      setTutoPass(true);
    }
  }

  function getIndexContent(): string {
    switch (index) {
      case "start":
        return "Bonjour et bienvenu sur mon portfolio, avant de commencer nous allons voir une grande partie des fonctionnaliter possible sur le site";
      case "file":
        return "Vous pouvez deplacer les fichiers comme bon vous sembles";

      case "folder":
        return "Vous pouvez egalement double cliquer sur le dossier / fichier pour en voir son contenu";

      case "header":
        return "Vous pouvez visualiser les fenetres, minimiser ou non";

      default:
        return "";
    }
  }

  return (
    <>
      {tutoInactive ? null : (
        <section className="tuto-container">
          <section
            style={
              index !== "header" && index !== "start"
                ? {
                    clipPath: `polygon(
    0 0,
    100% 0,
    100% 100%,
    0 100%,
    ${boxPosition.x}px ${boxPosition.y}px,
    ${boxPosition.x}px ${boxPosition.y + gridSize.y}px,
    ${boxPosition.x + gridSize.x}px ${boxPosition.y + gridSize.y}px,
${boxPosition.x + gridSize.x}px ${boxPosition.y}px,
    ${boxPosition.x}px ${boxPosition.y}px,
    0 100%,
    0 0
  )`,
                  }
                : {}
            }
            className={`tuto-overlay ${index}-tuto`}
          ></section>
          <section
            style={
              index === "header"
                ? { top: "0px", left: "0px", width: "4.5%", height: "6%" }
                : index === "start"
                  ? {
                      width: "0",
                      height: "0",
                      border: "0",
                    }
                  : { top: `${boxPosition.y}px`, left: `${boxPosition.x}px` }
            }
            className={`active-tuto-square ${index}-square`}
          />
          <p
            className={`help-message-${index} info-font`}
            style={
              index === "header"
                ? {
                    top: `${boxPosition.y + 20}px`,
                    left: `${boxPosition.x + gridSize.x - 40}px`,
                  }
                : index === "start"
                  ? {
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80vw",
                      position: "absolute",
                      color: "white",
                      fontSize: "1.8rem",
                      textAlign: "center",
                      zIndex: "999",
                    }
                  : {
                      top: `${boxPosition.y + 20}px`,
                      left: `${boxPosition.x + 10 + gridSize.x}px`,
                    }
            }
          >
            {getIndexContent()}
          </p>
          <button className="next-tuto info-font" onClick={() => nextTuto()}>
            Suivant
          </button>
          <button className="pass-tuto info-font">Sauter la lecon</button>

          {index === "start" ? (
            <span className="signalisation">
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          ) : null}
        </section>
      )}
    </>
  );
};

export default React.memo(TutoComponent);
