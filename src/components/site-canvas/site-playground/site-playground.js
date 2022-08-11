import { IconButton } from "@fluentui/react";
import { Html, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { MODELS } from "../../../config/azure-gltf";
import { PUMPS as HARD_CODED_PUMPS } from "../../../config/pumps";

import CloudGLTF from "../../../shared/cloud-gtlf/cloud-gtlf";
import CircleLoader from "../../../shared/loader";
import TruckCloudGTLF from "../../../shared/truck-cloud-gtlf/truck-cloud-gtlf";
import { Node, Nodes } from "../../nodes/node";
import {
  DATA_VAN_POS,
  DATA_VAN_ROT,
  getPos,
  MISSILE_NODE_POS,
  MISSILE_POS,
  ROTATION_LEFT,
  ROTATION_RIGHT,
  useMemoisedScene,
  WELL_HEAD_POS,
} from "./site-scene";

// const TruckCloudGTLF = memo(
//   lazy(() => import("../../../shared/truck-cloud-gtlf/truck-cloud-gtlf"))
// );
// const CloudGLTF = lazy(() => import("../../../shared/cloud-gtlf/cloud-gtlf"));

function SitePlayGround(props) {
  const mRef = useRef(null);
  const nCRef = useRef(null);
  const wRef = useRef(null);
  const dRef = useRef(null);
  const [hovered, onHover] = useState(null);
  const [prevCam, setPrevCam] = useState(null);
  const [focussedTruck, onFocusTruck] = useState(null);
  const { scene } = useGLTF(MODELS.TRUCK);
  const cam = useThree(({ camera }) => camera);
  const cont = useThree(({ controls }) => controls);
  const PUMPS = props.pumpsData.length ? props.pumpsData : HARD_CODED_PUMPS;
  const { copiedScene } = useMemoisedScene(scene);
  const invalidate = useThree(({ invalidate }) => invalidate);
  const isOnFocus = (pump) =>
    !focussedTruck || pump["Pump Position"] === focussedTruck["Pump Position"];

  useEffect(() => {
    focussedTruck && props.setSelected(focussedTruck["Pump Position"]);
  }, [focussedTruck, props]);
  function restoreCamera() {
    cam.position.set(
      prevCam.position.x,
      prevCam.position.y,
      prevCam.position.z
    );
    cont?.reset();

    invalidate();
  }

  const isActive = (pump) => pump["Pump Position"] === props.selected;

  const LEFT_POS_START = PUMPS.length / 2;

  const selected = hovered ? [hovered] : undefined;

  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        <Nodes>
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
                  invalidate();
                }}
                onDoubleClick={() => {
                  if (isOnFocus(pump)) {
                    cont?.saveState();
                    const camToSave = {};
                    camToSave.position = cam.position.clone();
                    camToSave.rotation = cam.rotation.clone();
                    camToSave.controlCenter = cont?.target?.clone();

                    setPrevCam(camToSave);

                    props.setSelected(pump["Pump Position"]);
                    onFocusTruck(pump);
                    cam.position.set(4.5 * x, y + 9, 3 * z);
                    invalidate();
                  }
                }}
                onHover={onHover}
                isActive={
                  props.selectionOptions["Select All"] || isActive(pump)
                }
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
                ref={mRef}
                cloudGlbURL={MODELS.MISSILE}
                assetId={4347}
                onClick={(show) => {
                  console.log("clicked on missile");
                }}
                onHover={onHover}
                position={MISSILE_POS}
              />
              <Node
                ref={nCRef}
                name="missile"
                position={MISSILE_NODE_POS}
                connectedTo={[wRef]}
              />
              <CloudGLTF
                ref={wRef}
                cloudGlbURL={MODELS.WELL_HEAD}
                onClick={(show) => {
                  console.log("clicked on missile");
                }}
                onHover={onHover}
                position={WELL_HEAD_POS}
                scale={5}
              />

              <CloudGLTF
                ref={dRef}
                cloudGlbURL={MODELS.DATA_VAN}
                onClick={(show) => {
                  console.log("clicked on missile");
                }}
                onHover={onHover}
                position={DATA_VAN_POS}
                rotation={DATA_VAN_ROT}
              />
            </>
          ) : null}
        </Nodes>
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
                restoreCamera();
                invalidate();
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
