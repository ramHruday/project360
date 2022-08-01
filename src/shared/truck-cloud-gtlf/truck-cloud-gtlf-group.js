import { useBVH, useCursor } from "@react-three/drei";
import React, { useRef, useState } from "react";
import "./truck-cloud-gtlf.scss";
import TruckParams from "./truck-params";

export function TruckCloudGTLFGroup({ ...props }) {
  const meshRef = useRef();
  const [hovered, set] = useState();
  useCursor(hovered, "pointer");
  useBVH(meshRef);
  const onPointerOver = (e) => {
    e.stopPropagation();

    if (!props.show) {
      return;
    }
    props.onHover(meshRef);
    set(true);
  };

  const onPointerOut = () => {
    if (!props.show) {
      return;
    }
    set(false);
    props.onHover(null);
  };

  const onClick = (e) => {
    e.stopPropagation();

    if (!props.show) {
      return;
    }
    props.onClick(true);
  };

  const onDoubleClick = (e) => {
    e.stopPropagation();

    if (!props.show) {
      return;
    }
    props.onDoubleClick();
  };

  if (props.node.type.toLowerCase() !== "mesh") {
    return (
      <group
        rotation={props.node.rotation}
        position={props.node.position}
        scale={props.node.scale}
        frustumCulled
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
    // const geometry = new BufferGeometry({ ...props.node.geometry });
    return (
      <mesh
        geometry={props.node.geometry}
        material={props.node.material}
        rotation={props.node.rotation}
        position={props.node.position}
        ref={meshRef}
        scale={props.node.scale}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        frustumCulled
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
