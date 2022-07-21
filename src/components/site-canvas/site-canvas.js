import { Stack } from "@fluentui/react";
import { AdaptiveEvents, GizmoHelper, GizmoViewcube } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { MODELS } from "../../config/azure-gltf";

import CloudGLTF from "../../shared/cloud-gtlf/cloud-gtlf";
import Loader from "../../shared/loader";
import TruckCloudGTLF from "../../shared/truck-cloud-gtlf/truck-cloud-gtlf";
import CameraButton from "./camera/camera-btn";
import CameraHandler from "./camera/camera-handler";
import "./site-canvas.scss";

function SiteCanvas(props) {
  const LEFT_POS_START = props.pumpsData.length / 2;
  const ROTATION_LEFT = [0, -Math.PI / 2, 0];
  const ROTATION_RIGHT = [0, Math.PI / 2, 0];

  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

  useEffect(() => {
    const interval = setTimeout(() => {
      // props.setIsAllSelected(true);
    }, 120000);
    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack className="position-relative site-map-content" verticalFill>
      <div id="reset-cam-btn"></div>
      <CameraButton
        cameraType={props.cameraType}
        setCameraType={props.setCameraType}
      />
      <Canvas
        id="site-map"
        style={{
          background: "#354c74",
          borderRadius: "8px",
        }}
        frameloop="demand"
        className="ms-depth-64"
        shadows
        camera={{
          position: [10, 15, 30],
          fov: 50,
          near: 0.01,
          far: 5000,
        }}
        onPointerMissed={(e) => {
          e.stopPropagation();
          props.setSelected(null);
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          {props.pumpsData.slice(0, 20).map((pump, i) => (
            <TruckCloudGTLF
              key={pump["Pump Position"]}
              position={[
                LEFT_POS_START < i ? 10 : -10,
                0,
                (i % LEFT_POS_START) * 4,
              ]}
              onClick={(show) => {
                props.setSelected(pump["Pump Position"]);
                console.log(props.selected);
              }}
              onHover={onHover}
              isActive={
                props.isAllSelected
                  ? true
                  : props.selected === pump["Pump Position"]
              }
              pump={pump}
              setAlertedParts={props.setAlertedParts}
              rotation={LEFT_POS_START < i ? ROTATION_LEFT : ROTATION_RIGHT}
              cloudGlbURL={MODELS.TRUCK}
            />
          ))}
          <CloudGLTF
            cloudGlbURL={MODELS.MISSILE}
            assetId={4347}
            onClick={(show) => {
              console.log("clicked on missile");
            }}
            onHover={onHover}
            isActive={props.isAllSelected ? true : props.selected === 4347}
            position={[0, 0, 15]}
          />

          <CloudGLTF
            cloudGlbURL={MODELS.WELL_HEAD}
            onClick={(show) => {
              console.log("clicked on missile");
            }}
            onHover={onHover}
            isActive={props.isAllSelected ? true : props.selected === 4347}
            position={[0, -1, -10]}
            scale={4}
          />
        </Suspense>
        {/* <AdaptiveDpr pixelated /> */}
        <AdaptiveEvents />
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={selected}
            selectionLayer={1}
            visibleEdgeColor="white"
            edgeStrength={5}
          />
        </EffectComposer>
        <GizmoHelper alignment="top-right" renderPriority={2}>
          <GizmoViewcube />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>

        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>
    </Stack>
  );
}

export default SiteCanvas;
