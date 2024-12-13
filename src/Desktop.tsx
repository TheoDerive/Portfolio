import React from "react";
import Wallpaper from "./components/Wallpaper";
import useFilesGrid from "./hooks/useFilesGrid";
import { useAppStore } from "./data/store";
import FileElement from "./components/File";
import FolderElement from "./components/Folder";
import WindowContainer from "./components/Window";
import { isFile } from "./utils/verifElementType";
import Header from "./components/Header";
import TutoComponent from "./components/Tuto";
import IntroElement from "./Intro.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Desktop = () => {
  const gridParentRef = React.useRef<HTMLDivElement>(null);
  const desktopRef = React.useRef<HTMLDivElement>(null);
  const introRef = React.useRef<HTMLElement>(null);
  const logoRef = React.useRef<HTMLImageElement>(null);
  const punchlineRef = React.useRef<HTMLHeadingElement>(null);

  const filesGrid = useAppStore((state) => state.filesGrid);
  const setFilesGrid = useAppStore((state) => state.setFilesGrid);
  const windows = useAppStore((state) => state.windows);
  const tutoInactive = useAppStore((state) => state.tutoInactive);
  const intro = useAppStore((state) => state.intro);
  const setIntro = useAppStore((state) => state.setIntro);
  const { init } = useFilesGrid();

  React.useEffect(() => {
    setFilesGrid(init());
    console.log("rented");

    const isIntroPass = JSON.parse(window.localStorage.getItem("intro"));
    if (isIntroPass) {
      setIntro(isIntroPass);
    }
  }, []);

  useGSAP(() => {
    if (intro) {
      gsap.to(desktopRef.current, {
        opacity: 1,
        duration: 0.01,
      });
    }

    if (!logoRef.current || !punchlineRef.current || !introRef.current || intro)
      return;

    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        delay: 1,
      },
    );

    gsap.to(logoRef.current, {
      opacity: 0,
      duration: 2,
      delay: 5,
    });

    gsap.fromTo(
      punchlineRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        delay: 7,
      },
    );

    gsap.to(introRef.current, {
      opacity: 0,
      duration: 2,
      delay: 10,
      onComplete: () => {
        window.localStorage.setItem("intro", JSON.stringify(true));
        setIntro(true);
      },
    });
  }, [intro, logoRef, punchlineRef, introRef]);

  return (
    <>
      {intro ? (
        <section className="desktop" ref={desktopRef}>
          <Header />
          <Wallpaper />

          <section className="desktop-display">
            {filesGrid.map((column, index) => (
              <section key={index + 1} id={`${index + 1}`} className="column">
                {column.map((grid) => (
                  <div
                    key={grid.id}
                    id={`${grid.id}`}
                    ref={gridParentRef}
                    className="grid"
                  >
                    {grid.content ? (
                      <>
                        {isFile(grid.content) ? (
                          <FileElement
                            key={grid.content.id}
                            grid={grid}
                            file={grid.content}
                            parentRef={gridParentRef}
                          />
                        ) : (
                          <FolderElement
                            key={grid.content.id}
                            grid={grid}
                            folder={grid.content}
                            parentRef={gridParentRef}
                          />
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}

            {windows.map((window) =>
              window.snooze ? null : (
                <WindowContainer key={window.id} windowProps={window} />
              ),
            )}

            <section className="info info-font">
              Ce site est un portfolio
            </section>
          </section>

          {tutoInactive ? null : <TutoComponent />}
        </section>
      ) : (
        <section className="intro-container" ref={introRef}>
          <img className="logo" ref={logoRef} src="./images/logo.png" />
          <h1 className="punchline" ref={punchlineRef}>
            "Voici l'alliance entre la créativité d'un artiste et la précision
            d'un développeur"
          </h1>
          <IntroElement />
        </section>
      )}
    </>
  );
};

export default React.memo(Desktop);
