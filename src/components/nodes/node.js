import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

const context = createContext();
const Circle = forwardRef(
  (
    {
      children,
      opacity = 1,
      radius = 0.05,
      segments = 32,
      color = "#ff1050",
      ...props
    },
    ref
  ) => (
    <mesh ref={ref} {...props}>
      <circleGeometry args={[radius, segments]} />
      <meshBasicMaterial
        transparent={opacity < 1}
        opacity={opacity}
        color={color}
      />
      {children}
    </mesh>
  )
);

export function Nodes({ children }) {
  const group = useRef();
  const [nodes, set] = useState([]);
  const lines = useMemo(() => {
    const lines = [];
    for (let node of nodes)
      node.connectedTo
        .map((ref) => [node.position, ref.current.position])
        .forEach(([start, end]) =>
          lines.push({
            start: start.clone().add({ x: 0.35, y: 0, z: 0 }),
            end: end.clone().add({ x: -0.35, y: 0, z: 0 }),
          })
        );
    return lines;
  }, [nodes]);
  useFrame((_, delta) =>
    group.current.children.forEach(
      (group) =>
        (group.children[0].material.uniforms.dashOffset.value -= delta * 10)
    )
  );
  return (
    <context.Provider value={set}>
      <group ref={group}>
        {lines.map((line, index) => (
          <group key={index + "Bezier group"}>
            <QuadraticBezierLine
              key={index + "Bezier spot"}
              {...line}
              color="white"
              dashed
              dashScale={50}
              gapSize={20}
            />
            <QuadraticBezierLine
              key={index + "Bezier line"}
              {...line}
              color="red"
              lineWidth={3}
              transparent
              opacity={0.5}
            />
          </group>
        ))}
      </group>
      {children}
      {lines.map(({ start, end }, index) => (
        <group key={index + "Bezier circle"} position-z={1}>
          <Circle position={start} />
          <Circle position={end} />
        </group>
      ))}
    </context.Provider>
  );
}

export const Node = forwardRef(
  (
    { color = "black", name, connectedTo = [], position = [0, 0, 0], ...props },
    ref
  ) => {
    const set = useContext(context);
    const [pos] = useState(() => new THREE.Vector3(...position));
    const state = useMemo(
      () => ({ position: pos, connectedTo }),
      [pos, connectedTo]
    );
    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
      set((nodes) => [...nodes, state]);
      return () => void set((nodes) => nodes.filter((n) => n !== state));
    }, [state, pos, set]);
    // Drag n drop, hover
    return (
      <Circle
        ref={ref}
        opacity={0.2}
        radius={0.5}
        color={color}
        position={pos}
        {...props}
      ></Circle>
    );
  }
);
