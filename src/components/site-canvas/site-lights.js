import { GizmoHelper, GizmoViewcube } from "@react-three/drei";

function SiteLights(props) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <GizmoHelper alignment="top-right" renderPriority={99}>
        <GizmoViewcube />
      </GizmoHelper>
    </>
  );
}

export default SiteLights;
