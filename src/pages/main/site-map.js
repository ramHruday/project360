import { ContactShadows, Select } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import Loader from "../../shared/loader";
import { range } from "../../utils/common";
import CameraHandler from "./camera-handler";
const GLTFLoad = React.lazy(() => import("../../shared/gltf-load"));

function SiteMap(props) {
  const [selected, setSelected] = React.useState([]);
  return (
    <Canvas
      style={{ background: "#a8a8a8" }}
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 5, 10] }}
    >
      <ambientLight intensity={0.5} color="lightblue" />
      <directionalLight
        intensity={2}
        position={[-10, 2, 5]}
        penumbra={1}
        castShadow
      />

      <React.Suspense fallback={<Loader />}>
        <Select multiple box onChange={setSelected}>
          {range(1, 10).map((assetId, i) => (
            <GLTFLoad
              key={assetId}
              obj="/obj/truck/truck.glb"
              position={[0, 0, 5 * i]}
              assetId={`Frac Pump ${assetId}`}
            />
          ))}
          {range(11, 20).map((assetId, i) => (
            <GLTFLoad
              key={assetId}
              obj="/obj/truck/truck.glb"
              position={[20, 0, 5 * i]}
              assetId={`Frac Pump ${assetId}`}
            />
          ))}
        </Select>
      </React.Suspense>
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
  );
}

export default SiteMap;
