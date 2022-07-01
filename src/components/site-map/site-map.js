import { Stack } from "@fluentui/react";
import { ContactShadows, Select } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { useState } from "react";
import DataCard from "../../shared/data-card";
import { TRUCKS } from "../../shared/dummy/sites";
import Loader from "../../shared/loader";
import CameraButton from "./camera-btn";
import CameraHandler from "./camera-handler";
import "./site-map.scss";

const GLTFLoad = React.lazy(() => import("../../shared/gltf-load"));

function SiteMap(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Stack className="position-relative site-map-content" verticalFill>
      <CameraButton
        cameraType={props.cameraType}
        setCameraType={props.setCameraType}
      />
      <DataCard
        assetId={props.selected}
        openModal={openModal}
        hideModal={() => setOpenModal(false)}
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
        camera={{ position: [150, 50, 20] }}
      >
        <ambientLight intensity={0.5} color="lightblue" />
        <directionalLight
          intensity={2}
          position={[-10, 2, 5]}
          penumbra={1}
          castShadow
        />
        <Select
        // onChange={() => (props.selected ? props.setSelected(null) : null)}
        >
          <React.Suspense fallback={<Loader />}>
            {TRUCKS.map((truck, i) => (
              <GLTFLoad
                key={truck.assetId}
                obj="https://site3d.blob.core.windows.net/site3d-models/truck.glb?sp=r&st=2022-07-01T13:27:22Z&se=2022-07-01T21:27:22Z&sv=2021-06-08&sr=b&sig=83LNA7zB1WF3RMm5V0wocUTnFAUdAFVarLDG46qJXnM%3D"
                position={[truck.coordinates[0], 0, truck.coordinates[1]]}
                assetId={truck.assetId}
                controlStyle={props.cameraType}
                onSelect={() => {
                  props.setSelected(truck.assetId);
                  setOpenModal(true);
                }}
                rotation={truck.rotation}
              />
            ))}
          </React.Suspense>
        </Select>
        <ContactShadows
          frames={1}
          position={[0, -0.5, 0]}
          scale={10}
          opacity={0.4}
          far={1}
          blur={2}
        />
        <CameraHandler controlStyle={props.cameraType} />
      </Canvas>
    </Stack>
  );
}

export default SiteMap;
