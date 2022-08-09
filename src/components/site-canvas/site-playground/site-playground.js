import { IconButton } from "@fluentui/react";
import { Html, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { lazy, memo, Suspense, useState } from "react";
import { MODELS } from "../../../config/azure-gltf";
import { PUMPS } from "../../../config/pumps";

import CircleLoader from "../../../shared/loader";
import {
  getPos,
  ROTATION_LEFT,
  ROTATION_RIGHT,
  useMemoisedScene,
} from "./site-scene";

const TruckCloudGTLF = memo(
  lazy(() => import("../../../shared/truck-cloud-gtlf/truck-cloud-gtlf"))
);
const CloudGLTF = lazy(() => import("../../../shared/cloud-gtlf/cloud-gtlf"));

function SitePlayGround(props) {
  const [hovered, onHover] = useState(null);
  const [prevCam, setPrevCam] = useState(null);
  const [focussedTruck, onFocusTruck] = useState(null);
  const { scene } = useGLTF(MODELS.TRUCK);
  const cam = useThree(({ camera }) => camera);
  // useFrame(({ camera }) => console.log(camera));
  // const PUMPS = props.pumpsData;

  const { copiedScene } = useMemoisedScene(scene);

  const isOnFocus = (pump) =>
    !focussedTruck || pump["Pump Position"] === focussedTruck["Pump Position"];

  const isActive = (pump) => pump["Pump Position"] === props.selected;

  const LEFT_POS_START = PUMPS.length / 2;

  const selected = hovered ? [hovered] : undefined;

  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        {PUMPS.map((pump, i) => {
          const [x, y, z] = getPos(
            LEFT_POS_START,
            i,
            focussedTruck &&
              pump["Pump Position"] === focussedTruck["Pump Position"]
          );
          return (
            <TruckCloudGTLF
              key={pump["Pump Position"]}
              position={[x, y, z]}
              onClick={() => {
                props.setSelected(pump["Pump Position"]);
              }}
              onDoubleClick={() => {
                if (isOnFocus(pump)) {
                  setPrevCam(cam.position);
                  props.setSelected(pump["Pump Position"]);
                  onFocusTruck(pump);
                  cam.position.set(4.5 * x, y + 11, 3 * z);
                  cam.updateMatrixWorld();
                }
              }}
              onHover={onHover}
              isActive={props.selectionOptions["Select All"] || isActive(pump)}
              show={isOnFocus(pump)}
              isFocussed={
                focussedTruck &&
                pump["Pump Position"] === focussedTruck["Pump Position"]
              }
              scene={copiedScene}
              pump={pump}
              setAlertedParts={props.setAlertedParts}
              rotation={LEFT_POS_START < i ? ROTATION_LEFT : ROTATION_RIGHT}
              cloudGlbURL={MODELS.TRUCK}
              scale={focussedTruck ? 2 : 1}
            />
          );
        })}
        {!focussedTruck ? (
          <>
            <CloudGLTF
              cloudGlbURL={MODELS.MISSILE}
              assetId={4347}
              onClick={(show) => {
                console.log("clicked on missile");
              }}
              onHover={onHover}
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
                position={[0, -1, -5]}
                scale={5}
              />
            ))}
          </>
        ) : null}
      </Suspense>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          selection={selected}
          selectionLayer={1}
          visibleEdgeColor="white"
          edgeStrength={5}
        />
      </EffectComposer>
      <Html left portal={props.domNodeRef}>
        {focussedTruck ? (
          <div>
            <IconButton
              className="text-neutralPrimary bg-themeLighterAlt"
              iconProps={{ iconName: "Back" }}
              onClick={() => {
                onFocusTruck(null);
                console.log(prevCam);
                cam.position.set(prevCam);
                cam.updateMatrixWorld();
              }}
              text="Back to Frac site"
            />
          </div>
        ) : null}
      </Html>
    </>
  );
}

export default SitePlayGround;
