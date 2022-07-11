import { useLoader } from "@react-three/fiber";

import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SHOW_KEYS } from "../dummy/hide-keys";
import { PUMPS } from "../dummy/pumps";
import { UNIT_MAP } from "../dummy/unit-mapping";
import "./gtlf-load.scss";

function GLTFLoad(props) {
  const ref = useRef();

  const asset = PUMPS.find((x) => x["Pump Name"] === props.assetId);
  const { scene } = useLoader(GLTFLoader, props.obj);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <mesh
      userData={props.assetId}
      onClick={props.onSelect}
      onPointerOver={(e) => props.onHover(ref)}
      onPointerOut={(e) => props.onHover(null)}
      {...props}
    >
      <group>
        <primitive ref={ref} object={copiedScene} />
      </group>
      {asset && (
        <Html distanceFactor="20" className="truck-data-content">
          {props.isActive &&
            Object.entries(asset)
              .filter((x) => !!x[1] && SHOW_KEYS.includes(x[0]))
              .map((e, i) => (
                <span key={i + e[1]} className="ms-fontWeight-bold">
                  {e[0]} : {e[1]} {UNIT_MAP[e[0]]}
                </span>
              ))}
        </Html>
      )}
    </mesh>
  );
}

export default GLTFLoad;
