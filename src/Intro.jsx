import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import { IntroBackground } from "./components/IntroBackground";

export default function IntroElement() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false, depth: false, stencil: false }}
    >
      <IntroContent />
    </Canvas>
  );
}

function IntroContent() {
  const cameraRef = React.useRef();
  const { size } = useThree();

  React.useEffect(() => {
    if (cameraRef.current) {
      const aspect = size.width / size.height;
      const frustumSize = 5;

      cameraRef.current.left = -frustumSize * aspect;
      cameraRef.current.right = frustumSize * aspect;
      cameraRef.current.top = frustumSize;
      cameraRef.current.bottom = -frustumSize;

      cameraRef.current.updateProjectionMatrix();
    }
  }, [size]);
  return (
    <>
      <IntroBackground />
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        near={0.1}
        far={1000}
      />
    </>
  );
}
