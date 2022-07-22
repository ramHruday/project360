import { EffectComposer, Outline } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import { MODELS } from "../../../config/azure-gltf";

import CloudGLTF from "../../../shared/cloud-gtlf/cloud-gtlf";
import CircleLoader from "../../../shared/loader";
import TruckCloudGTLF from "../../../shared/truck-cloud-gtlf/truck-cloud-gtlf";

function SitePlayGround(props) {
  const LEFT_POS_START = props.pumpsData.length / 2;
  const ROTATION_LEFT = [0, -Math.PI / 2, 0];
  const ROTATION_RIGHT = [0, Math.PI / 2, 0];

  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        {props.pumpsData.map((pump, i) => (
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
              props.activePumps["Select All"]
                ? true
                : props.selected === pump["Pump Position"]
            }
            // show={props.activePumps[pump["Pump Position"]]}
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
          position={[0, 0, 20]}
        />
        {[1].map((pump, i) => (
          <CloudGLTF
            key={i + "bleh bleh"}
            cloudGlbURL={MODELS.WELL_HEAD}
            onClick={(show) => {
              console.log("clicked on missile");
            }}
            onHover={onHover}
            isActive={props.isAllSelected ? true : props.selected === 4347}
            position={[0, -1, -5]}
            scale={4}
          />
        ))}
      </Suspense>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          selection={selected}
          selectionLayer={1}
          visibleEdgeColor="white"
          edgeStrength={5}
        />
      </EffectComposer>
    </>
  );
}

export default SitePlayGround;
