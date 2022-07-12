import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PART_COLOR } from "../../shared/dummy/unit-mapping";
import "./truck-cloud-gtlf.scss";
import TruckParams from "./truck-params";

export default function TruckCloudGTLF({ ...props }) {
  const { scene } = useGLTF(props.cloudGlbURL);
  const group = useRef();

  useFrame(({ camera }) => console.log(camera));
  const copiedScene = useMemo(() => {
    scene.children.forEach(function (object) {
      if (object.isMesh) {
        object.material = { ...object.material };
      }
    });
    return scene.clone();
  }, [scene]);

  const toggleActiveMesh = (e, meshId) => {
    e.stopPropagation();
    if (meshId === props.activeMesh) {
      props.onHover(null);
      props.onClick(false);
    } else {
      props.onHover(meshId);
      props.onClick(true);
    }
  };

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      className="cursor-pointer"
      rotateOnAxis={{ axis: [0, 0, 0], angle: 3.14 / 2 }}
    >
      {copiedScene.children.map((_, i) => (
        <TruckCloudGTLFGroup
          key={i + _.name}
          {...props}
          node={_}
          toggleActiveMesh={toggleActiveMesh}
          index={i}
        />
      ))}
    </group>
  );
}

function TruckCloudGTLFGroup({ ...props }) {
  const meshRef = useRef();
  return (
    <mesh
      geometry={props.node.geometry}
      material={props.node.material}
      ref={meshRef}
      onPointerOut={(e) => props.onHover(null)}
      onClick={(e) => {
        props.toggleActiveMesh(e, meshRef);
      }}
    >
      {props.node.children.length > 0 && (
        <group>
          {props.node.children.map((_, i) => (
            <TruckCloudGTLFGroup
              key={i + _.name}
              {...props}
              node={_}
              index={i}
            />
          ))}
        </group>
      )}
      <meshStandardMaterial color={PART_COLOR[props.index]} />
      <TruckParams {...props} />
    </mesh>
  );
}
