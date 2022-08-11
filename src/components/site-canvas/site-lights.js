import { Environment, GizmoHelper, GizmoViewcube } from "@react-three/drei";

function SiteLights(props) {
  return (
    <>
      {/* <pointLight position={[10, 10, 10]} intensity={0.5} />
      <spotLight position={[0, -1, -5]} intensity={1} castShadow /> */}
      <Environment preset="apartment" />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <GizmoHelper alignment="top-right" renderPriority={99}>
        <GizmoViewcube />
      </GizmoHelper>
    </>
  );
}

export default SiteLights;
