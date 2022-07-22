import { Stack } from "@fluentui/react";
import { AdaptiveEvents } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";

import CameraButton from "./camera/camera-btn";
import CameraHandler from "./camera/camera-handler";
import "./site-canvas.scss";
import { canvasStyle, siteCamera } from "./site-config";
import SiteLights from "./site-lights";
import SitePlayGround from "./site-playground/site-playground";

function SiteCanvas(props) {
  // const bleh = props.pumpsData
  //   .map((x) => x["Pump Position"])
  //   .reduce((a, v) => ({ ...a, [v]: true }), {});
  // const activePumps = useControls(bleh, bleh, [props.pumpsData]);
  const activePumps = useControls({ "Select All": false }, [props.pumpsData]);

  useEffect(() => {
    if (activePumps["Select All"]) {
      props.setSelected(null);
    }
  }, [activePumps, props]);

  return (
    <Stack className="position-relative site-map-content" verticalFill>
      {/* <SiteControls {...props} /> */}
      <Canvas
        id="site-map"
        style={canvasStyle}
        frameloop="demand"
        className="ms-depth-64"
        shadows
        camera={siteCamera}
        performance={performance}
        onPointerMissed={(e) => {
          e.stopPropagation();
          props.setSelected(null);
        }}
      >
        <SiteLights />
        <SitePlayGround {...props} activePumps={activePumps} />
        <AdaptiveEvents />

        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>
      <CameraButton
        cameraType={props.cameraType}
        setCameraType={props.setCameraType}
      />
    </Stack>
  );
}

export default SiteCanvas;
