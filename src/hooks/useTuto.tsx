import React from "react";
import { useAppStore } from "../data/store";
import { PositionType } from "../type/vectorType";
import { Window } from "../type/windowType";

function useTuto() {
  const [index, setIndex] = React.useState<string>("start");
  const [boxPosition, setBoxPosition] = React.useState<PositionType>({
    y: (window.innerHeight / 8) * 2 - 68,
    x: 0,
  });
  const [gridSize, setGridSize] = React.useState<PositionType>({
    x: (window.innerWidth / 100) * 12,
    y: (window.innerHeight / 100) * 12,
  });

  const { tuto, setTuto, setTutoInactive, windows, setWindow } = useAppStore();

  React.useEffect(() => {
    for (let i = 0; i < tuto.length; i++) {
      const element = tuto[i];

      if (element.active) {
        setIndex(element.element);
        return;
      }
    }
  }, [tuto, index]);

  React.useEffect(() => {
    const target = tuto.filter((t) => t.element === index)[0];
    const elementToFind = document
      .querySelector(`#${index}-${target.elementActive}`)
      ?.getBoundingClientRect();

    if (
      !elementToFind ||
      !target.active ||
      index === "header" ||
      index === "windows"
    )
      return;

    const newBoxPosition = {
      x: elementToFind.x,
      y: elementToFind.y,
    };
    setBoxPosition(newBoxPosition);

    const grid = document.querySelector(".grid");
    if (!grid) return;

    const grid_size = {
      x: grid.clientWidth,
      y: grid.clientHeight,
    };

    setGridSize(grid_size);
  }, [tuto, index]);

  React.useEffect(() => {
    const header = document
      .querySelector(`.header-window-active-type`)
      ?.getBoundingClientRect();
    if (index === "header" && header) {
      const newGridSize = {
        x: header.width,
        y: header.height + 4,
      };
      const newBoxPosition = {
        x: header.x,
        y: header.y - 3,
      };

      setBoxPosition(newBoxPosition);
      setGridSize(newGridSize);
      return;
    } else if (index === "header" && !header) {
      const newGridSize = {
        x: 60,
        y: 60,
      };
      const newBoxPosition = {
        x: 0,
        y: 0,
      };

      setBoxPosition(newBoxPosition);
      setGridSize(newGridSize);
      return;
    }
  }, [index]);

  React.useEffect(() => {
    if (index === "windows") {
      const window = document
        .querySelector(`.window-header`)
        ?.getBoundingClientRect();

      if (window) {
        const newGridSize = {
          x: window.width,
          y: window.height + 4,
        };

        const newBoxPosition = {
          x: window.x,
          y: window.y,
        };

        setGridSize(newGridSize);
        setBoxPosition(newBoxPosition);

        return;
      }
    }
  }, [index]);

  function nextTuto() {
    let isEnd = false;
    const newTuto = tuto.map((t, i) => {
      if (t.element === index && t.active) {
        if (!tuto[i + 1]) isEnd = true;
        if (
          tuto[i + 1] &&
          tuto[i + 1].element === "windows" &&
          windows.length < 1
        ) {
          const new_window: Window = {
            id: 60000,
            name: "FileExplorer",
            path: "/Dossier 1",
            type: "folder",
            snooze: false,
          };
          setWindow([...windows, new_window]);
        }
        return {
          element: t.element,
          active: false,
        };
      } else {
        return t;
      }
    });

    setTuto(newTuto);
    if (isEnd) {
      setTutoInactive(true);
    }
  }

  function skipAllTuto() {
    const newTuto = tuto.map((t) => ({ element: t.element, active: false }));
    setTuto(newTuto);
    setTutoInactive(true);
  }

  function getIndexContent(): string {
    switch (index) {
      case "start":
        return "Bonjour et bienvenu sur mon portfolio, avant de commencer nous allons voir une grande partie des fonctionnaliter possible sur le site";

      case "file":
        return "Vous pouvez deplacer les fichiers, dossiers mais aussi les fenetres comme bon vous sembles";

      case "folder":
        return "Vous pouvez egalement double cliquer sur le dossier / fichier pour en voir son contenu";

      case "windows":
        return "Vous pouvez utiliser les boutons d'actions de la fenetre";

      case "header":
        return "Lors que vous avez des fenetres d'ouvertes, vous pouvez visualiser les fenetres, minimiser ou non et les reouvrir en cliquant dessus";

      case "end":
        return "Vous pouvez maintenant vous balader librement sur mon portfolio. Bien sur il reste encore quelque mecaniques a decouvrir.";

      default:
        return "";
    }
  }

  return {
    index,
    gridSize,
    boxPosition,
    nextTuto,
    skipAllTuto,
    getIndexContent,
  };
}

export default useTuto;
