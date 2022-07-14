import {
  MapControls,
  OrbitControls,
  TrackballControls,
} from "@react-three/drei";

const CameraHandler = (props) => {
  return (
    <>
      <OrbitControls
        makeDefault
        enabled={props.controlStyle === "orbit"}
        rotateSpeed={2}
        enableDamping
      />
      <TrackballControls
        enabled={props.controlStyle === "track"}
        rotateSpeed={5}
      />
      <MapControls enabled={props.controlStyle === "map"} panSpeed={2} />
    </>
  );
};

export default CameraHandler;
