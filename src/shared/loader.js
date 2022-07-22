import { Spinner } from "@fluentui/react";
import { Html } from "@react-three/drei";

function Loader() {
  // const { progress } = useProgress();
  return (
    <Html>
      <Spinner ariaLive="assertive" labelPosition="top" />
    </Html>
  );
}

export default Loader;
