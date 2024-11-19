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
  const [index, setIndex] = React.useState<string>("start");
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
    const header = document
      .querySelector(`.header-window-active-type`)
      ?.getBoundingClientRect();
    let newBoxPosition;

    if (!folder || !file) return;

    for (let i = 0; i < tuto.length; i++) {
      const element = tuto[i];

      if (element.active) {
        setIndex(element.element);

        switch (element.element) {
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

          case "header":
            if (header) {
              newBoxPosition = {
                x: header.x,
                y: header.y - 3,
              };
            } else {
              newBoxPosition = {
                x: 0,
                y: 0,
              };
            }
            break;

          default:
            newBoxPosition = {
              x: 0,
              y: 0,
            };
            break;
        }
        setBoxPosition(newBoxPosition);

        return;
      }
    }
  }, [tuto]);

  React.useEffect(() => {
    const header = document
      .querySelector(`.header-window-active-type`)
      ?.getBoundingClientRect();
    if (index === "header" && header) {
      const newGridSize = {
        x: header.width,
        y: header.height + 4,
      };

      setGridSize(newGridSize);
      return;
    } else if (index === "header" && !header) {
      const newGridSize = {
        x: 60,
        y: 60,
      };

      setGridSize(newGridSize);
      return;
    }

    const grid = document.querySelector(".grid");
    if (!grid) return;

    const grid_size = {
      x: grid.clientWidth,
      y: grid.clientHeight,
    };

    setGridSize(grid_size);
  }, [boxPosition, index]);

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
        return "Lors que vous avez des fenetres d'ouvertes, vous pouvez visualiser les fenetres, minimiser ou non";

      default:
        return "";
    }
  }

  function skipAllTuto() {
    const newTuto = tuto.map((t) => ({ element: t.element, active: false }));
    setTuto(newTuto);
    setTutoPass(true);
  }

  return (
    <>
      {tutoInactive ? null : (
        <section className="tuto-container">
          <section
            style={
              index !== "start"
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
              index === "start"
                ? {
                    width: "0",
                    height: "0",
                    border: "0",
                  }
                : {
                    top: `${boxPosition.y}px`,
                    left: `${boxPosition.x}px`,
                    width: `${gridSize.x}px`,
                    height: `${gridSize.y}px`,
                  }
            }
            className={`active-tuto-square ${index}-square`}
          />
          <p
            className={`help-message-${index} info-font`}
            style={
              index === "start"
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
                    top: `${boxPosition.y + (index === "header" ? 5 : 20)}px`,
                    left: `${boxPosition.x + 10 + gridSize.x}px`,
                  }
            }
          >
            {getIndexContent()}
          </p>
          <button className="next-tuto info-font" onClick={() => nextTuto()}>
            Suivant
          </button>
          <button onClick={() => skipAllTuto()} className="pass-tuto info-font">
            Sauter la lecon
          </button>

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
