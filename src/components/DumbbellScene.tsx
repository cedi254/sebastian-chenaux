"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { useRubberSurface, WeightMarks } from "./DumbbellSurface";
import { DUMBBELL_MODEL_PATH } from "@/lib/dumbbell-loading";

useGLTF.preload(DUMBBELL_MODEL_PATH);

function Dumbbell({
  progress,
  reduced,
}: {
  progress: React.RefObject<number>;
  reduced: boolean;
}) {
  const { scene: source } = useGLTF(DUMBBELL_MODEL_PATH);
  const scene = useRubberSurface(source);
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    const p = reduced ? 0.45 : progress.current;
    group.current.rotation.set(
      0.18 + p * 1.3 + (reduced ? 0 : pointer.y * 0.05),
      0.3 + p * 0.65 + (reduced ? 0 : pointer.x * 0.08),
      -0.45 + p * 0.2,
    );
    group.current.position.set(-0.04 + p * 0.06, 0, 0);
    group.current.scale.setScalar(0.96 + p * 0.08);
  });
  return (
    <group ref={group}>
      <primitive object={scene} />
      <WeightMarks />
    </group>
  );
}
function RenderOnScroll({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (!active) return;
    invalidate();
    if (reduced) return;
    const render = () => invalidate();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("training-progress", render);
    window.addEventListener("pointermove", render, { passive: true });
    return () => {
      window.removeEventListener("scroll", render);
      window.removeEventListener("training-progress", render);
      window.removeEventListener("pointermove", render);
    };
  }, [active, reduced, invalidate]);
  return null;
}
function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}
export default function DumbbellScene({
  progress,
  reduced,
  active,
  onFailure,
}: {
  progress: React.RefObject<number>;
  reduced: boolean;
  active: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      className="dumbbell-canvas"
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 4]} intensity={3} />
      <directionalLight position={[-4, -2, 2]} intensity={1.7} />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer
            intensity={4}
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[8, 3, 1]}
          />
          <Lightformer
            intensity={3}
            position={[-5, 0, 1]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2, 6, 1]}
          />
          <Lightformer
            intensity={2}
            position={[4, -1, 3]}
            rotation={[0, -Math.PI / 3, 0]}
            scale={[2, 4, 1]}
          />
        </Environment>
        <Dumbbell progress={progress} reduced={reduced} />
      </Suspense>
      <RenderOnScroll active={active} reduced={reduced} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  );
}
