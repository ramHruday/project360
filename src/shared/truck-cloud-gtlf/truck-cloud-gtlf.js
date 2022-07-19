import { Select, useBVH, useGLTF } from "@react-three/drei";
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
    return scene.clone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.uuid]);

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

  if (props.fast) {
    return (
      <group {...props} dispose={null}>
        <Select box multiple onChange={(m) => props.onHover(m)}>
          <primitive object={copiedScene} />
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
  // const [show, setShow] = useState(false);
  useBVH(meshRef);
  // useHelper(show && meshRef, BoxHelper, "cyan");
  // const { material, geometry } = useMemo(() => {}, []);
  // console.log(props.node?.geometry?.boundingSphere.radius);
  if (props.index > 200 || props.node?.geometry?.boundingSphere.radius < 45) {
    return;
  }

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
    // const geometry = new THREE.BufferGeometry({ ...props.node.geometry });
    return (
      <mesh
        geometry={props.node.geometry}
        material={props.node.material}
        ref={meshRef}
        scale={props.node.scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          props.onHover(meshRef);
        }}
        onClick={(e) => {
          console.log(props.node.name);
          props.onHover(meshRef);
          props.onClick(true);
        }}
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
        <TruckParams {...props} />
      </mesh>
    );
  }
}

useGLTF.preload(MODELS.TRUCK);
