import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjLoad(props) {
  const object = useLoader(OBJLoader, props.obj);
  return <primitive object={object} />;
}

export default ObjLoad;
