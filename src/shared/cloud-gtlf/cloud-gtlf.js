import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { PART_COLOR } from "../dummy/unit-mapping";
import "./cloud-gtlf.scss";

export default function CloudGLTF({ ...props }) {
  const { scene } = useGLTF(props.cloudGlbURL);
  const group = useRef();
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
    } else {
      props.onHover(meshId);
    }
  };

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
      rotateOnAxis={{ axis: [0, 0, 0], angle: 3.14 / 2 }}
    >
      {copiedScene.children.map((_, i) => (
        <CloudGLTFGroup
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

function CloudGLTFGroup({ ...props }) {
  const meshRef = useRef();
  console.log(props.node);
  return (
    <mesh
      geometry={props.node.geometry}
      material={props.node.material}
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        props.onHover(meshRef);
      }}
      onPointerOut={(e) => props.onHover(null)}
      onClick={(e) => props.toggleActiveMesh(e, meshRef)}
    >
      {props.node.children.length > 0 && (
        <group>
          {props.node.children.map((_, i) => (
            <CloudGLTFGroup key={i + _.name} {...props} node={_} index={i} />
          ))}
        </group>
      )}
      <meshStandardMaterial
        color={
          props.node.name === "Chassis" ? 0xffffff : PART_COLOR[props.index]
        }
        // metalness={1}
        // roughness={0.4}
        // ambientIntensity={0.2}
        // aoMapIntensity={1}
        // envMapIntensity={1}
        // displacementScale={2.436143}
        // normalScale={1.0}
      />
    </mesh>
  );
}
