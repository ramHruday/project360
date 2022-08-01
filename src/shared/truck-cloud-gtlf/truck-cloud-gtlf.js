import { Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Box3, Box3Helper } from "three";
import { DEFAULT_TRUCK_CONFIG } from "../../config/constants";
import { TruckCloudGTLFGroup } from "./truck-cloud-gtlf-group";
import "./truck-cloud-gtlf.scss";
// const TRUCK_PARAM_NODES = Object.values(DEFAULT_TRUCK_CONFIG);

const highlighter = new Box3();
export default function TruckCloudGTLF({ ...props }) {
  const group = useRef();

  useEffect(() => {
    highlighter.setFromObject(props.scene);
  }, [props.scene]);

  const [indexSet, setIndexSet] = useState(new Set());

  useFrame(() => (group.current.visible = props.show), []);

  const [eI, setEI] = useState(1);
  const asset = props.pump;

  const { engine, pe, trans } = DEFAULT_TRUCK_CONFIG;

  useEffect(() => {
    const interval = setInterval(() => {
      if (asset["Engine Load"] < 30) {
        var box3Helper = new Box3Helper(highlighter, 0x00ff00);
        box3Helper.material.linewidth = 3;
      }
      // if (asset["Horse Power"] < 1000 && props.node.name === pe) {
      //   group.current.material.emissive.setHex(0xfe8b8b);
      // }
      // if (!asset["Trans Gear"] && props.node.name === trans) {
      //   meshRef.current.material.emissive = 0x3f7b9d;
      // }
    }, 500);
    return () => clearInterval(interval);
  }, [asset, eI, props, engine, pe, trans]);

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
