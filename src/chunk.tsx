import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Position {
  x: number;
  y: number;
  z: number;
}
interface ChunkProps {
  position: Position;
}
export default function Chunk({ position }: ChunkProps) {
  const floorTexture = useTexture("/src/assets/floor.png", (texture) => {
    // Configure texture for pixel art and tiling
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(32, 32);
  });
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <planeGeometry args={[32, 32]} />
      <meshBasicMaterial map={floorTexture} />
    </mesh>
  );
}
