import { Stack } from "@fluentui/react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import * as React from "react";
import { useState } from "react";
import { MODELS } from "../../shared/config/azure-gltf";

import DataCard from "../../shared/data-card";
import { PUMPS } from "../../shared/dummy/pumps";
import Loader from "../../shared/loader";
import CameraButton from "./camera-btn";
import CameraHandler from "./camera-handler";
import "./site-map.scss";

const CloudGLTF = React.lazy(() =>
  import("../../shared/cloud-gtlf/cloud-gtlf")
);

function SiteMap(props) {
  const [openModal, setOpenModal] = useState(false);

  const LEFT_POS_START = PUMPS.length / 2;
  const ROTATION_LEFT = [0, 3.14, 0];
  const ROTATION_RIGHT = [0, 0, 0];

  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

  return (
    <Stack className="position-relative site-map-content" verticalFill>
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
        camera={{ position: [-10, 0, 15], fov: 30 }}
      >
        {/* <ambientLight intensity={1} color="lightblue" /> */}
        <directionalLight
          intensity={2}
          position={[150, 50, 20]}
          penumbra={1}
          castShadow
        />
        <ambientLight color={0xffffff} intensity={0.2} />
        {/* <spotLight intensity={0.3} position={[5, 10, 50]} /> */}
        <EffectComposer autoClear={true}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={100}
            width={500}
          />
        </EffectComposer>
        <React.Suspense fallback={<Loader />}>
          {PUMPS.map((truck, i) => (
            <CloudGLTF
              key={truck["Pump Name"]}
              position={[
                LEFT_POS_START < i ? 20 : -20,
                0,
                (i % LEFT_POS_START) * 10,
              ]}
              assetId={truck["Pump Name"]}
              onClick={() => {
                props.setSelected(truck["Pump Name"]);
                setOpenModal(true);
              }}
              onHover={onHover}
              activeMesh={selected}
              rotation={LEFT_POS_START < i ? ROTATION_LEFT : ROTATION_RIGHT}
              cloudGlbURL={MODELS.TRUCK}
              scale={[4, 4, 4]}
            />
          ))}

          <CloudGLTF
            position={[20, 20, 20]}
            onHover={onHover}
            activeMesh={selected}
            cloudGlbURL={MODELS.TRUCK}
          />
        </React.Suspense>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={selected}
            selectionLayer={1}
            visibleEdgeColor="white"
            edgeStrength={10}
          />
        </EffectComposer>
        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>
    </Stack>
  );
}

export default SiteMap;

useGLTF.preload(MODELS.TRUCK);
