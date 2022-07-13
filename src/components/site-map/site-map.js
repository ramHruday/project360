import { Stack } from "@fluentui/react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import * as React from "react";
import { useState } from "react";
import { MODELS } from "../../shared/config/azure-gltf";

import CloudGLTF from "../../shared/cloud-gtlf/cloud-gtlf";
import DataCard from "../../shared/data-card";
import { PUMPS } from "../../shared/dummy/pumps";
import Loader from "../../shared/loader";
import TruckCloudGTLF from "../truck-cloud-gtlf/truck-cloud-gtlf";
import CameraButton from "./camera-btn";
import CameraHandler from "./camera-handler";
import "./site-map.scss";
// const CloudGLTF = React.lazy(() =>
//   import("../../shared/cloud-gtlf/cloud-gtlf")
// );

function SiteMap(props) {
  const [openModal, setOpenModal] = useState(false);
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
      {props.selected ? (
        <DataCard
          assetId={props.selected}
          openModal={openModal}
          hideModal={() => setOpenModal(false)}
        />
      ) : null}

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
          {PUMPS.slice(0).map((truck, i) => (
            <TruckCloudGTLF
              key={truck["Pump Name"]}
              position={[
                LEFT_POS_START < i ? 50 : -50,
                0,
                (i % LEFT_POS_START) * 40,
              ]}
              assetId={truck["Pump Name"]}
              onClick={(show) => {
                if (show) {
                  props.setSelected(truck["Pump Name"]);
                }
                setOpenModal(show);
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
              scale={[10, 9, 9]}
            />
          ))}

          <CloudGLTF
            cloudGlbURL={MODELS.MISSILE}
            assetId={4347}
            onClick={(show) => {
              if (show) {
                props.setSelected(4347);
              }
              setOpenModal(show);
            }}
            onHover={onHover}
            isActive={props.isAllSelected ? true : props.selected === 4347}
            scale={[8, 10, 15]}
            position={[0, 0, 120]}
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
        {/* <ViewControls /> */}

        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>
    </Stack>
  );
}

export default SiteMap;

useGLTF.preload(MODELS.TRUCK);
useGLTF.preload(MODELS.MISSILE);
