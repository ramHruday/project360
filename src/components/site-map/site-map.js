import { ContactShadows, Select } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { TRUCKS } from "../../shared/dummy/sites";
import Loader from "../../shared/loader";
import CameraButton from "./camera-btn";
import CameraHandler from "./camera-handler";

const GLTFLoad = React.lazy(() => import("../../shared/gltf-load"));

function SiteMap(props) {
  return (
    <>
      <CameraButton
        cameraType={props.cameraType}
        setCameraType={props.setCameraType}
      />
      <Canvas
        id="site-map"
        style={{ background: "#172B4D" }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [50, 50, 50] }}
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
                obj="/obj/truck/truck.glb"
                position={[truck.coordinates[0], 0, truck.coordinates[1]]}
                assetId={truck.assetId}
                controlStyle={props.cameraType}
                onSelect={() => props.setSelected(truck.assetId)}
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
    </>
  );
}

export default SiteMap;
