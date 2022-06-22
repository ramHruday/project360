import { Edges, useCursor, useSelect } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function GLTFLoad(props) {
  const { scene } = useLoader(GLTFLoader, props.obj);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  const [hovered, setHover] = useState(false);
  const selected = useSelect().map((sel) => sel.userData.assetId);

  const isSelected = !!selected.find((sel) => sel === props.assetId);

  useCursor(hovered);

  return (
    <mesh>
      <group
        userData={props.assetId}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => setHover(false)}
      >
        <primitive object={copiedScene} {...props} />
        <Edges visible={isSelected} scale={1.1} renderOrder={1000}>
          <meshBasicMaterial transparent color="#333" depthTest={false} />
        </Edges>
      </group>
    </mesh>
  );
}

export default GLTFLoad;
