import { useMemo } from "react";
import { MeshBasicMaterial, MeshStandardMaterial } from "three";
import { isMobile } from "../../../utils/utils";

export const useMemoisedScene = (scene) => {
  const isMob = isMobile();

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
        if (radius > 500) {
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

  return { copiedScene };
};

export const ROTATION_LEFT = [0, -Math.PI / 2, 0];
export const ROTATION_RIGHT = [0, Math.PI / 2, 0];

export const getPos = (LEFT_POS_START, i, isOnFocus) => {
  return [
    LEFT_POS_START < i ? 10 : -10,
    0 + isOnFocus * 10,
    (i % LEFT_POS_START) * 4,
  ];
};
