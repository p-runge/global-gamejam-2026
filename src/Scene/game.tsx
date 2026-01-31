import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Player from "../player";

export default function Game() {
  const floorTexture = useTexture("/src/assets/floor.png", (texture) => {
    // Configure texture for pixel art and tiling
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(32, 32);
  });

  return (
    <>
      {/* Floor plane */}
      <mesh position={[0, 0, -1]} receiveShadow>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      <Player />
    </>
  );
}
