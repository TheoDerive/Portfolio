import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Wallpaper from "./Wallpaper";

export default function IntroPortfolio({
  setIntroPortfolio,
}: {
  setIntroPortfolio: (introPortfolio: boolean) => void;
}) {
  const inputMessage = React.useRef<HTMLInputElement>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
    }
  }

  return (
    <section style={{ background: "black", width: "100vw", height: "100vh" }}>
      <Wallpaper />
      <div className="init-portfolio">
        <span className="login-image-container">
          <img src="/images/login-image.jpg" className="login-image" />
        </span>
        <div className="input-container">
          <input
            className="login-input"
            type="text"
            placeholder="A qui puis-je m'adresser ?"
            onChange={(e) => handleInput(e)}
            ref={inputMessage}
          />
          <button className="confirm-name" />
        </div>
      </div>
    </section>
  );
}
