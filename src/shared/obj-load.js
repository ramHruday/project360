import { Select } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjLoad(props) {
  const ref = useRef();
  const [hovered, hover] = useState(null);
  const object = useLoader(
    OBJLoader,
    "https://site3d.blob.core.windows.net/site3d-models/Bed%20Assembly%20v38.obj?sp=r&st=2022-07-05T19:34:04Z&se=2022-10-27T03:34:04Z&sv=2021-06-08&sr=b&sig=WmySdkB50q9LzYWHkY0UxrS2ftRLCVARJY0VEWXzDeU%3D"
  );
  return (
    <Select enabled={hovered}>
      <mesh ref={ref} userData={props.assetId} onClick={props.onSelect}>
        <primitive object={object} />;
      </mesh>
    </Select>
  );
}

export default ObjLoad;
