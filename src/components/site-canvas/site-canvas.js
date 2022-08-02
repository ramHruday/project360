import { Stack, Text } from "@fluentui/react";
import { AdaptiveEvents } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense, useEffect, useRef } from "react";
import { PUMPS } from "../../config/pumps";

import CircleLoader from "../../shared/loader";
import { isMobile } from "../../utils/utils";
import CameraButton from "./camera/camera-btn";
import CameraHandler from "./camera/camera-handler";
import "./site-canvas.scss";
import { canvasStyle, perf, siteCamera } from "./site-config";
import SiteLights from "./site-lights";
import SitePlayGround from "./site-playground/site-playground";
// const SitePlayGround = lazy(() => import("./site-playground/site-playground"));

function SiteCanvas(props) {
  const domNodeRef = useRef(null);
  const isMob = isMobile();
  const selectionOptions = useControls({ "Select All": false }, [
    props.pumpsData,
  ]);

  useEffect(() => {
    if (selectionOptions["Select All"]) {
      props.setSelected(null);
    }
  }, [selectionOptions, props]);

  return (
    <Stack className="position-relative site-map-content" verticalFill>
      {/* <SiteControls {...props} /> */}
      <div ref={domNodeRef} className="site-btns"></div>
      <Canvas
        id="site-map"
        style={canvasStyle}
        frameloop="demand"
        className="ms-depth-64"
        shadows
        camera={siteCamera}
        performance={perf}
        onPointerMissed={(e) => {
          e.stopPropagation();
          props.setSelected(null);
        }}
      >
        <Suspense fallback={<CircleLoader />}>
          <SiteLights />
          <SitePlayGround
            {...props}
            selectionOptions={selectionOptions}
            domNodeRef={domNodeRef}
          />
        </Suspense>

        <AdaptiveEvents />

        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>

      <CameraButton
        cameraType={props.cameraType}
        setCameraType={props.setCameraType}
      />
      <div className="site-controls">
        <Leva fill collapsed />
      </div>
      {props.selected ? (
        <div className="pump-stats">
          {Object.entries(
            PUMPS.find((x) => x["Pump Position"] === props.selected)
          )
            .filter((_, i) => i < 5)
            .map((e, i) => (
              <Text key={i} block variant="small">
                <span className="ms-fontWeight-bold ms-fontColor-white">
                  {e[0]}: {e[1]}
                </span>
              </Text>
            ))}
        </div>
      ) : null}
    </Stack>
  );
}

export default SiteCanvas;
