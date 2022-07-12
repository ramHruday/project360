import { IconButton } from "@fluentui/react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import ReactDOM from "react-dom";
import "./view-controls.scss";

function ViewControls(props) {
  const { camera, size } = useThree();

  const resetCamera = () => {
    camera.position.set(130, 100, 250);
    camera.updateMatrixWorld();
  };

  const btn = document.getElementById("reset-cam-btn");
  return ReactDOM.createPortal(
    <Html>
      <IconButton
        iconProps={{ iconName: "Home" }}
        title="Home"
        ariaLabel="Home"
        onClick={resetCamera}
      />
    </Html>,
    btn
  );
}

export default ViewControls;
