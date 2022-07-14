import { useBVH, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { PART_COLOR } from "../../shared/dummy/unit-mapping";
import "./truck-cloud-gtlf.scss";
import TruckParams from "./truck-params";

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

  // const [eI, setEI] = useState(1);
  // const asset = PUMPS.find((x) => x["Pump Name"] === props.assetId);

  // const { engine, pe, trans } = DEFAULT_TRUCK_CONFIG;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (asset["Engine Load"] < 30 && props.node.name === engine) {
  //       setEI(eI === 0.7 ? 1 : 0.7);
  //     }
  //     if (asset["Discharge Pressure"] < 6500 && props.node.name === pe) {
  //       setEI(eI === 0.7 ? 1 : 0.7);
  //     }
  //     if (!asset["Trans Gear"] && props.node.name === trans) {
  //       setEI(eI === 0.7 ? 1 : 0.7);
  //     }
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, [asset, eI, props, engine, pe, trans]);

  return (
    <mesh
      geometry={props.node.geometry}
      material={props.node.material}
      ref={meshRef}
      onPointerOut={(e) => props.onHover(null)}
      onClick={(e) => {
        props.toggleActiveMesh(e, meshRef);
      }}
    >
      {props.node.children.length > 0 && (
        <group>
          {props.node.children.map((_, i) => (
            <TruckCloudGTLFGroup
              key={i + _.name}
              {...props}
              node={_}
              index={i}
            />
          ))}
        </group>
      )}
      <meshStandardMaterial
        color={PART_COLOR[props.index]}
        // emissiveIntensity={eI}
        // emissive={PART_COLOR[props.index]}
        metalness={0.4}
        roughness={0.4}
        ambientIntensity={0.5}
        aoMapIntensity={1}
        envMapIntensity={1}
        displacementScale={2.436143}
        normalScale={1.0}
      />
      <TruckParams {...props} />
    </mesh>
  );
}
