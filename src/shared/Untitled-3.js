/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Select, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";

export default function CubeSphere({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://site3d.blob.core.windows.net/site3d-models/yellow.glb?sp=r&st=2022-07-06T20:03:49Z&se=2022-11-02T04:03:49Z&sv=2021-06-08&sr=b&sig=O3PqzwdPQvHqo%2Bxel4JYKzdHQR%2BfHNZoUDg5nOEfvPg%3D"
  );
  const cube = useRef();
  const sphere = useRef();
  const [hovered, hover] = useState("none");

  return (
    <Select enabled={hovered}>
      <group ref={group} {...props} dispose={null} scale={[0.1, 0.1, 0.1]}>
        <mesh
          geometry={nodes.Body1.geometry}
          material={nodes.Body1.material}
          ref={cube}
          onPointerOver={() => {
            hover("sphere");
            cube.current.material.color.setHex("0xff0000");
          }}
          onPointerOut={() => {
            hover("none");
            cube.current.material.color.setHex("0xFFA500");
          }}
        />
        <mesh
          ref={sphere}
          geometry={nodes.Body2.geometry}
          material={nodes.Body2.material}
          onPointerOver={() => {
            hover("sphere");
            sphere.current.material.color.setHex("0xff0000");
          }}
          onPointerOut={() => {
            hover("none");
            sphere.current.material.color.setHex("0xFFA500");
          }}
        >
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh geometry={nodes.Body3.geometry} material={nodes.Body3.material} />
        <mesh geometry={nodes.Body4.geometry} material={nodes.Body4.material} />
        <mesh geometry={nodes.Body5.geometry} material={nodes.Body5.material} />
        <mesh geometry={nodes.Body6.geometry} material={nodes.Body6.material} />
        <mesh geometry={nodes.Body7.geometry} material={nodes.Body7.material} />
        <mesh geometry={nodes.Body8.geometry} material={nodes.Body8.material} />
        <mesh geometry={nodes.Body9.geometry} material={nodes.Body9.material} />
        <mesh
          geometry={nodes.Body10.geometry}
          material={nodes.Body10.material}
        />
      </group>
    </Select>
  );
}

useGLTF.preload(
  "https://site3d.blob.core.windows.net/site3d-models/yellow.glb?sp=r&st=2022-07-06T20:03:49Z&se=2022-11-02T04:03:49Z&sv=2021-06-08&sr=b&sig=O3PqzwdPQvHqo%2Bxel4JYKzdHQR%2BfHNZoUDg5nOEfvPg%3D"
);