import { Spinner } from "@fluentui/react";
import { Html, useProgress } from "@react-three/drei";

function Loader(props) {
  const { progress, item, errors, loaded } = useProgress();
  console.log(errors, item, loaded);
  const text = progress >= 97 ? "Almost Loaded" : Math.round(progress) + " %";
  return (
    <Html style={{ color: "white", width: "3.5rem", textAlign: "center" }}>
      <Spinner ariaLive="assertive" labelPosition="top" />
      <div>{text}</div>
    </Html>
  );
}

export default Loader;
