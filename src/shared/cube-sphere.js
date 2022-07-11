import { useGLTF } from "@react-three/drei";
import { createRef, useMemo, useRef } from "react";
import { PART_COLOR } from "./dummy/unit-mapping";
import "./sample-pump.scss";

const cloudGlbURL =
  "https://site3d.blob.core.windows.net/site3d-models/fluid-end.glb?sp=r&st=2022-07-07T22:06:52Z&se=2022-07-28T06:06:52Z&spr=https&sv=2021-06-08&sr=b&sig=gIEwiMYgAE71CBUTzLuWQaVrLs7BJLZ3pjjB0qNsF2M%3D";

export default function SampleTruck({ ...props }) {
  const { scene } = useGLTF(cloudGlbURL);
  const group = useRef();
  const meshRefs = useRef([]);
  const copiedScene = useMemo(() => {
    scene.children.forEach(function (object) {
      if (object.isMesh) {
        object.material = { ...object.material };
      }
    });
    return scene.clone();
  }, [scene]);

  meshRefs.current = copiedScene.children[0].children.map(
    (_, i) => meshRefs.current[i] ?? createRef()
  );

  copiedScene.children.map((_, i) => meshRefs.current[i] ?? createRef());

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
      scale={[4, 4, 4]}
      rotateX={3.14}
      className="cursor-pointer"
    >
      {copiedScene.children.map((_, i) => (
        <mesh
          key={i}
          geometry={_.geometry}
          material={_.material}
          // ref={meshRefs.current[i]}
          // onPointerOver={() => {
          //   hover(i);
          // }}
          // onPointerOut={() => {
          //   hover(undefined);
          //   document.getElementById("site-map").style.cursor = "auto";
          // }}
          // onPointerOver={(e) => props.onHover(meshRefs.current[i])}
          // onPointerOut={(e) => props.onHover(null)}
        >
          <meshStandardMaterial
            roughness={0.75}
            emissive="#404057"
            color={PART_COLOR[i]}
          />
          {/* <Edges /> */}
          {_.children.map((j, i) => (
            <mesh
              key={i}
              geometry={j.geometry}
              material={j.material}
              ref={meshRefs.current[i]}
              onPointerOver={(e) => {
                e.stopPropagation();
                props.onHover(meshRefs.current[i]);
              }}
              onPointerOut={(e) => props.onHover(null)}
              onClick={(e) => toggleActiveMesh(e, meshRefs.current[i])}
            >
              <meshStandardMaterial color={PART_COLOR[i]} />
              {/* <Edges /> */}
            </mesh>
          ))}
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload(cloudGlbURL);
