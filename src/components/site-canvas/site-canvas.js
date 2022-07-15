import { Stack } from "@fluentui/react";
import { GizmoHelper, GizmoViewcube, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import * as React from "react";
import { useState } from "react";
import { MODELS } from "../../config/azure-gltf";

import { PUMPS } from "../../config/pumps";
import CloudGLTF from "../../shared/cloud-gtlf/cloud-gtlf";
import Loader from "../../shared/loader";
import CameraButton from "./camera/camera-btn";
import CameraHandler from "./camera/camera-handler";
import "./site-canvas.scss";

function SiteCanvas(props) {
  const LEFT_POS_START = PUMPS.length / 2;
  const ROTATION_LEFT = [Math.PI / 2, 3.14, 0];
  const ROTATION_RIGHT = [-Math.PI / 2, 0, 0];

  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

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
        className="ms-depth-64"
        shadows
        dpr={[1, 2]}
        camera={{
          position: [255, 200, 500],
          fov: 35,
          zoom: 1.2,
          near: 1,
          far: 5000,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        <React.Suspense fallback={<Loader />}>
          {/* {PUMPS.slice(0).map((truck, i) => (
            <Model
              key={truck["Pump Name"]}
              position={[
                LEFT_POS_START < i ? 60 : -60,
                0,
                (i % LEFT_POS_START) * 50,
              ]}
              assetId={truck["Pump Name"]}
              onClick={(show) => {
                if (show) {
                  props.setSelected(truck["Pump Name"]);
                }
              }}
              onHover={onHover}
              isActive={
                props.isAllSelected
                  ? true
                  : props.selected === truck["Pump Name"]
              }
              setAlertedParts={props.setAlertedParts}
              rotation={LEFT_POS_START < i ? ROTATION_LEFT : ROTATION_RIGHT}
              cloudGlbURL={MODELS.TRUCK}
              // scale={[10, 9, 9]}
            />
          ))} */}
          <CloudGLTF
            cloudGlbURL={MODELS.MISSILE}
            assetId={4347}
            onClick={(show) => {
              console.log("clicked on missile");
            }}
            onHover={onHover}
            isActive={props.isAllSelected ? true : props.selected === 4347}
            scale={[14, 14, 15]}
            position={[0, -10, 140]}
          />
        </React.Suspense>
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

useGLTF.preload(MODELS.TRUCK);
// useGLTF.preload(MODELS.MISSILE);
