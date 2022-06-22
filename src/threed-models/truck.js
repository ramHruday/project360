import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function Truck() {
  const obj = useLoader(OBJLoader, "/obj/blender.obj");
  return <primitive object={obj} />;
}

export default Truck;
