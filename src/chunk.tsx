import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import floorImage from "./assets/floor-grey.png";

interface Position {
  x: number;
  y: number;
  z: number;
}
interface ChunkProps {
  position: Position;
}
export default function Chunk({ position }: ChunkProps) {
  const floorTexture = useTexture(floorImage, (texture) => {
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
