import { meshBounds, useBVH, useGLTF } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import { MODELS } from "../../config/azure-gltf";
import { DEFAULT_TRUCK_CONFIG } from "../../config/constants";
import "./truck-cloud-gtlf.scss";
import TruckParams from "./truck-params";
const TRUCK_PARAM_NODES = Object.values(DEFAULT_TRUCK_CONFIG);

export default function TruckCloudGTLF({ ...props }) {
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
  useBVH(meshRef);
  if (props.index > 500 || props.node?.geometry?.boundingSphere.radius < 10) {
    return;
  }

  if (props.node.type.toLowerCase() !== "mesh") {
    return (
      <group
        rotation={props.node.rotation}
        position={props.node.position}
        scale={props.node.scale}
      >
        {props.node.children.length > 0 &&
          props.node.children.map((_, i) => (
            <TruckCloudGTLFGroup
              key={i + _.name}
              {...props}
              node={_}
              index={i + props.index}
            />
          ))}
      </group>
    );
  }

  if (props.node.type.toLowerCase() === "mesh") {
    return (
      <mesh
        geometry={props.node.geometry}
        material={props.node.material}
        ref={meshRef}
        raycast={meshBounds}
        scale={props.node.scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          props.onHover(meshRef);
        }}
        onClick={(e) => {
          console.log(props.node.name);
          props.onHover(meshRef);
        }}
      >
        {props.node.children.length > 0 &&
          props.node.children.map((_, i) => (
            <TruckCloudGTLFGroup
              key={i + _.name}
              {...props}
              node={_}
              index={i + props.index}
            />
          ))}
        {props.isActive ? <TruckParams {...props} /> : null}
      </mesh>
    );
  }
}

useGLTF.preload(MODELS.TRUCK);
