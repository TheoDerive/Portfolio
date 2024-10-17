import { Canvas } from "@react-three/fiber";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import * as THREE from "three";

import { Person } from "../model/Person";
import { GlitchMode } from "postprocessing";

export default function Wallpaper() {
  return (
    <>
      <h1 className="wallpaper-bottom">THYO</h1>
      <Canvas camera={{ position: [3, 0, 0] }}>
        <ambientLight intensity={1.5} />
        <Person position={[1.8, 0, 0]} />

        <EffectComposer>
          <Glitch
            delay={new THREE.Vector2(3.5, 7.5)}
            duration={new THREE.Vector2(0.6, 1.0)}
            mode={GlitchMode.SPORADIC}
            strength={new THREE.Vector2(0.1, 0.3)}
            ratio={0.3}
          />
        </EffectComposer>
      </Canvas>
      <h1 className="wallpaper-top">THYO</h1>
    </>
  );
}
