import { useLoader } from "@react-three/fiber";

import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function GLTFLoad(props) {
  const { scene } = useLoader(GLTFLoader, props.obj);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <mesh
      userData={props.assetId}
      onClick={props.onSelect}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.getElementById("site-map").style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        switch (props.controlStyle) {
          case "map":
            document.getElementById("site-map").style.cursor = "grab";
            break;
          case "track":
            document.getElementById("site-map").style.cursor = "move";
            break;
          case "orbit":
            document.getElementById("site-map").style.cursor = "crosshair";
            break;

          default:
            document.getElementById("site-map").style.cursor = "auto";
            break;
        }
      }}
    >
      <group>
        <primitive object={copiedScene} {...props} />
      </group>
    </mesh>
  );
}

export default GLTFLoad;
