import { useBVH, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { MISSILE_COLOR } from "../dummy/unit-mapping";
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

  console.log(scene);

  const toggleActiveMesh = (e, meshId) => {
    e.stopPropagation();
    if (meshId === props.activeMesh) {
      props.onHover(null);
    } else {
      props.onHover(meshId);
    }
  };

  return (
    <group ref={group} {...props} dispose={null} className="cursor-pointer">
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
  useBVH(meshRef);

  if (props.node.type === "Group") {
    return (
      <group rotation={props.node.rotation}>
        {props.node.children.length > 0 &&
          props.node.children.map((_, i) => (
            <CloudGLTFGroup key={i + _.name} {...props} node={_} index={i} />
          ))}
      </group>
    );
  }
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
      // onClick={(e) => props.toggleActiveMesh(e, meshRef)}
      material-color={MISSILE_COLOR[props.index + 1]}
    >
      {props.node.children.length > 0 &&
        props.node.children.map((_, i) => (
          <CloudGLTFGroup key={i + _.name} {...props} node={_} index={i} />
        ))}
    </mesh>
  );
}
