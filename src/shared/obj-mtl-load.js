import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjMtlLoad(props) {
  const materials = useLoader(MTLLoader, props.mtl);
  const object = useLoader(OBJLoader, props.obj, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={object} />;
}

export default ObjMtlLoad;
