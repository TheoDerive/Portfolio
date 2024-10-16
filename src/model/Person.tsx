import * as THREE from "three";
import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName = "Fly";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    male_player: THREE.SkinnedMesh;
    Object_7: THREE.Mesh;
    pelvis: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    hero: THREE.MeshBasicMaterial;
  };
  animations: GLTFAction[];
};

export function Person(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>();
  const { scene, animations } = useGLTF("/model/Person.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    actions[Object.keys(actions)[0]]?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig" rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={nodes.pelvis} />
          <skinnedMesh
            name="male_player"
            geometry={nodes.male_player.geometry}
            material={materials.Material}
            skeleton={nodes.male_player.skeleton}
          />
        </group>
        <mesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.hero}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/model/Person.glb");
