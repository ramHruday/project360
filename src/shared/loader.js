import { Spinner } from "@fluentui/react";
import { Html, useProgress } from "@react-three/drei";

function Loader(props) {
  const { progress } = useProgress();
  const text =
    progress.toFixed() === "100" ? "Almost Loaded" : progress.toFixed() + " %";
  return (
    <Html style={{ color: "white", width: "3.5rem", textAlign: "center" }}>
      <Spinner ariaLive="assertive" labelPosition="top" />
      <div>{text}</div>
    </Html>
  );
}

export default Loader;
