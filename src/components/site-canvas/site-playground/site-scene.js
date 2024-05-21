import { useMemo } from "react";
import { MeshBasicMaterial, MeshStandardMaterial } from "three";
import { isMobile } from "../../../utils/utils";

export const useMemoisedScene = (scene, isFast) => {
  const isMob = isMobile();

  const copiedScene = useMemo(() => {
    const smallObj = [];
    scene.traverse((o) => {
      if (!o.isMesh) {
        return;
      }
      var prevMaterial = o.material;
      let radius = o.geometry?.boundingSphere.radius;
      if (radius > 10 && radius < 30) {
        smallObj.push(o);
      }
      if (isMob || radius < 100000) {
        o.material = new MeshBasicMaterial({
          color: prevMaterial.color,
          reflectivity: 1,
        });
      } else {
        o.material = new MeshStandardMaterial({
          color: prevMaterial.color,
          metalness: 1,
          emissive: 1,
          roughness: prevMaterial.roughness ?? 0.5,
        });
      }
    });

    smallObj.forEach((o) => {
      o.removeFromParent();
    });

    return scene.clone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.uuid]);

  return { copiedScene };
};

export const ROTATION_LEFT = [0, -Math.PI / 2, 0];
export const ROTATION_RIGHT = [0, Math.PI / 2, 0];

export const getPos = (LEFT_POS_START, i, isOnFocus) => {
  return [
    LEFT_POS_START < i ? 15 : -15,
    0 + isOnFocus * 10,
    (i % LEFT_POS_START) * 5,
  ];
};

export const WELL_HEAD_POS = [0, -1, -20];
export const DATA_VAN_POS = [15, 1, -10];
export const BLENDER_VAN_POS = [10, -1, 35];
export const MISSILE_POS = [0, 0, 20];
export const MISSILE_NODE_POS = [0, 1, 20];
export const DATA_VAN_ROT = [0, Math.PI / 2, 0];
