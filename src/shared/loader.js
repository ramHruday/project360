import { Spinner } from "@fluentui/react";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <Spinner ariaLive="assertive" labelPosition="top" />
    </Html>
  );
}

export default Loader;
