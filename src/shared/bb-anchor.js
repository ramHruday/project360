import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

const boundingBox = new THREE.Box3();
const boundingBoxSize = new THREE.Vector3();

export const BBAnchor = ({ anchor, ...props }) => {
  const ref = React.useRef(null);
  const parentRef = React.useRef(null);

  // Reattach group created by this component to the parent's parent,
  // so it becomes a sibling of its initial parent.
  // We do that so the children have no impact on a bounding box of a parent.
  React.useEffect(() => {
    if (ref.current?.parent?.parent) {
      parentRef.current = ref.current.parent;
      ref.current.parent.parent.add(ref.current);
    }
  }, []);

  useFrame(() => {
    if (parentRef.current) {
      boundingBox.setFromObject(parentRef.current);
      boundingBox.getSize(boundingBoxSize);
      let { pX, pY, pZ } = parentRef.current.position;
      // if (pX && pY && pZ) {
      ref.current.position.set(
        parentRef.current.position.x + (boundingBoxSize.x * anchor[0]) / 2,
        parentRef.current.position.y + (boundingBoxSize.y * anchor[1]) / 2,
        parentRef.current.position.z + (boundingBoxSize.z * anchor[2]) / 2
      );
      // } else {
      //   ref.current.position.set(
      //     parentRef.current.geometry.boundingBox.min.x + anchor[0],
      //     parentRef.current.geometry.boundingBox.min.y + anchor[1],
      //     parentRef.current.geometry.boundingBox.min.z + anchor[2]
      //   );
      // }
    }
  });

  return <group ref={ref} {...props} />;
};
