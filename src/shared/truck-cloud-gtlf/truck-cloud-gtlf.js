import { Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { TruckCloudGTLFGroup } from "./truck-cloud-gtlf-group";
import "./truck-cloud-gtlf.scss";
// const TruckCloudGTLFGroup = lazy(() => import("./truck-cloud-gtlf-group"));

export default function TruckCloudGTLF({ ...props }) {
  const group = useRef();

  useFrame(() => {
    group.current.visible = props.show;
  });

  if (props.fast) {
    return (
      <group ref={group} {...props} dispose={null}>
        <Select
          box
          multiple
          onChange={(m) => {
            if (m[0]) {
              props.onHover(m[0]);
              props.onClick(true);
            }
          }}
        >
          <primitive object={props.scene} />
        </Select>
      </group>
    );
  }

  return (
    <group ref={group} {...props} dispose={null} frustumCulled>
      {props.scene.children.map((_, i) => (
        <TruckCloudGTLFGroup key={i + _.name} {...props} node={_} index={i} />
      ))}
    </group>
  );
}
