import {
  MapControls,
  OrbitControls,
  TrackballControls,
} from "@react-three/drei";

const CameraHandler = (props) => {
  if (props.controlStyle === "orbit") {
    return <OrbitControls makeDefault rotateSpeed={2} />;
  }

  if (props.controlStyle === "track") {
    return <TrackballControls makeDefault rotateSpeed={5} />;
  }

  return <MapControls makeDefault panSpeed={2} />;
};

export default CameraHandler;
