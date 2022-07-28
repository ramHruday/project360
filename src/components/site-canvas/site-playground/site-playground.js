import { IconButton } from "@fluentui/react";
import { Html, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { lazy, Suspense, useMemo, useState } from "react";
import { MeshBasicMaterial, MeshStandardMaterial } from "three";
import { MODELS } from "../../../config/azure-gltf";
import { PUMPS } from "../../../config/pumps";

import CircleLoader from "../../../shared/loader";

import { isMobile } from "../../../utils/utils";

const TruckCloudGTLF = lazy(() =>
  import("../../../shared/truck-cloud-gtlf/truck-cloud-gtlf")
);
const CloudGLTF = lazy(() => import("../../../shared/cloud-gtlf/cloud-gtlf"));

function SitePlayGround(props) {
  const [hovered, onHover] = useState(null);
  const [focussedTruck, onFocusTruck] = useState(null);
  const isMob = isMobile();
  const { scene } = useGLTF(MODELS.TRUCK);
  const { camera } = useThree();

  const copiedScene = useMemo(() => {
    const smallObj = [];
    scene.traverse((o) => {
      if (!o.isMesh) return;
      var prevMaterial = o.material;
      let radius = o.geometry?.boundingSphere.radius;
      // if (radius > 10 && radius < 30) {
      //   smallObj.push(o);
      //   console.log(o);
      // }
      if (isMob) {
        o.material = new MeshBasicMaterial({
          color: prevMaterial.color,
        });
      } else {
        if (radius > 200) {
          o.material = new MeshStandardMaterial({
            color: prevMaterial.color,
          });
        } else {
          o.material = new MeshBasicMaterial({
            color: prevMaterial.color,
          });
        }
      }
    });

    smallObj.forEach((o) => {
      o.removeFromParent();
    });

    return scene.clone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.uuid]);

  const LEFT_POS_START = PUMPS.length / 2;
  const ROTATION_LEFT = [0, -Math.PI / 2, 0];
  const ROTATION_RIGHT = [0, Math.PI / 2, 0];

  const selected = hovered ? [hovered] : undefined;

  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        {PUMPS.filter(
          (x) =>
            !focussedTruck ||
            (focussedTruck &&
              x["Pump Position"] === focussedTruck["Pump Position"])
        ).map((pump, i) => (
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
            onDoubleClick={(show) => {
              props.setSelected(null);
              camera.lookAt(
                scene.position.x,
                scene.position.y,
                scene.position.z
              );
              onFocusTruck(pump);
            }}
            onHover={onHover}
            isActive={
              props.selectionOptions["Select All"]
                ? true
                : props.selected === pump["Pump Position"]
            }
            scene={copiedScene}
            pump={pump}
            setAlertedParts={props.setAlertedParts}
            rotation={LEFT_POS_START < i ? ROTATION_LEFT : ROTATION_RIGHT}
            cloudGlbURL={MODELS.TRUCK}
            scale={focussedTruck ? 2 : 1}
          />
        ))}
        {!focussedTruck ? (
          <>
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
      <Html>
        <IconButton
          className="text-ThemePrimary"
          iconProps={{ iconName: "Back" }}
          onClick={() => onFocusTruck(null)}
        />
      </Html>
    </>
  );
}

export default SitePlayGround;
