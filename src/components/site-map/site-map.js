import { ContactShadows, Select } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import Loader from "../../shared/loader";
import { range } from "../../utils/common";
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
            {range(1, 10).map((assetId, i) => (
              <GLTFLoad
                key={assetId}
                obj="/obj/truck/truck.glb"
                position={[0, 0, 5 * i]}
                assetId={`Frac Pump ${assetId}`}
                controlStyle={props.cameraType}
                onSelect={() => props.setSelected(assetId)}
              />
            ))}
            {range(11, 20).map((assetId, i) => (
              <GLTFLoad
                key={assetId}
                obj="/obj/truck/truck.glb"
                position={[20, 0, 5 * i]}
                assetId={`Frac Pump ${assetId}`}
                controlStyle={props.cameraType}
                onSelect={() => props.setSelected(assetId)}
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
