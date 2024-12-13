import React from "react";
import useTuto from "../hooks/useTuto";

const TutoComponent = () => {
  const {
    index,
    boxPosition,
    gridSize,
    nextTuto,
    skipAllTuto,
    getIndexContent,
  } = useTuto();
  return (
    <>
      <section className="tuto-container">
        <section
          style={
            index !== "start" && index !== "end"
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
            index === "start" || index === "end"
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
            index === "start" || index === "end"
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
              : index === "windows"
                ? {
                    top: `${boxPosition.y - 30}px`,
                    left: `${boxPosition.x}px`,
                  }
                : {
                    top: `${boxPosition.y + (index === "header" ? 5 : 20)}px`,
                    left: `${boxPosition.x + 10 + gridSize.x}px`,
                  }
          }
        >
          {getIndexContent()}
        </p>
        <button
          className={
            index === "end"
              ? "next-tuto info-font end-button"
              : "next-tuto info-font"
          }
          onClick={() => nextTuto()}
        >
          {index === "end" ? "Bon voyage" : "Suivant"}
        </button>
        {index !== "end" && (
          <button onClick={() => skipAllTuto()} className="pass-tuto info-font">
            Sauter le tuto
          </button>
        )}

        {index === "start" ? (
          <span className="signalisation">
            <img src="/public/images/Finger_pointing.svg" />
          </span>
        ) : null}
      </section>
    </>
  );
};

export default React.memo(TutoComponent);
