import { Html, useProgress } from "@react-three/drei";
import { ProgressBar } from "react-bootstrap";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <ProgressBar animated now={progress} />
    </Html>
  );
}

export default Loader;
