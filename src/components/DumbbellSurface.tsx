"use client";
import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
export function useRubberSurface(source: THREE.Group) {
  const { invalidate } = useThree();
  const result = useMemo(() => {
    const scene = source.clone(true);
    const size = 256;
    const pixels = new Uint8Array(size * size * 4);
    let seed = 37;
    for (let i = 0; i < pixels.length; i += 4) {
      seed = (seed * 16807) % 2147483647;
      const value = 175 + (seed % 50);
      pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
      pixels[i + 3] = 255;
    }
    const texture = new THREE.DataTexture(pixels, size, size);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.needsUpdate = true;
    const materials: THREE.MeshStandardMaterial[] = [];
    scene.traverse((obj) => {
      if (
        obj instanceof THREE.Mesh &&
        obj.material instanceof THREE.MeshStandardMaterial &&
        obj.material.metalness < 0.5
      ) {
        const mat = obj.material.clone();
        mat.bumpMap = texture;
        mat.bumpScale = 0.004;
        mat.roughnessMap = texture;
        mat.roughness = 0.95;
        obj.material = mat;
        materials.push(mat);
      }
    });
    return { scene, texture, materials };
  }, [source]);
  useEffect(() => {
    invalidate();
    return () => {
      result.texture.dispose();
      result.materials.forEach((m) => m.dispose());
    };
  }, [result, invalidate]);
  return result.scene;
}
export function WeightMarks() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#777775";
    context.textAlign = "center";
    context.font = "bold 100px Arial";
    context.fillText("20", 128, 131);
    context.font = "24px Arial";
    context.fillText("K G", 128, 175);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <>
      {[-1, 1].map((sign) => (
        <mesh
          key={sign}
          position={[sign * 1.582, 0, 0]}
          rotation={[0, (sign * Math.PI) / 2, 0]}
        >
          <planeGeometry args={[1.1, 1.1]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.8}
            metalness={0.1}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      ))}
    </>
  );
}
