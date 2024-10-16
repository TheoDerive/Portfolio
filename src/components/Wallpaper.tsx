import { Canvas } from "@react-three/fiber";
import { Person } from "../model/Person";

export default function Wallpaper() {
  return (
    <>
      <h1 className="wallpaper-bottom">THYO</h1>
      <Canvas camera={{ position: [3, 0, 0] }}>
        <ambientLight />
        <Person position={[1.8, 0, 0]} />
      </Canvas>
      <h1 className="wallpaper-top">THYO</h1>
    </>
  );
}
