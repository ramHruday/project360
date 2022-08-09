import { Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { TruckCloudGTLFGroup } from "./truck-cloud-gtlf-group";
import "./truck-cloud-gtlf.scss";

export default function TruckCloudGTLF({ ...props }) {
  const group = useRef();

  const [indexSet, setIndexSet] = useState(new Set());

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
              console.log(m[0]);
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
    <group
      ref={group}
      {...props}
      dispose={null}
      rotateOnAxis={{ axis: [0, 0, 0], angle: 3.14 / 2 }}
      frustumCulled
    >
      {props.scene.children.map((_, i) => (
        <TruckCloudGTLFGroup
          key={i + _.name}
          {...props}
          node={_}
          index={i}
          indexSet={indexSet}
          setIndexSet={setIndexSet}
        />
      ))}
    </group>
  );
}
