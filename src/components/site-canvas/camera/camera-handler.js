import { MapControls, OrbitControls } from "@react-three/drei";

const CameraHandler = (props) => {
  if (props.controlStyle === "orbit") {
    return <OrbitControls makeDefault rotateSpeed={2} />;
  }
  return <MapControls makeDefault panSpeed={2} />;
};

export default CameraHandler;
