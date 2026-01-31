import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGame } from "../hooks/use-game";
import { followPlayer, type MovementBehavior } from "../utils/movement";

interface EnemyProps {
  position: [number, number];
  speed: number;
  movementBehavior: MovementBehavior;
}

export default function Enemy({
  position,
  speed,
  movementBehavior = followPlayer,
}: EnemyProps) {
  const { playerPosition } = useGame();
  const enemyMeshRef = useRef<THREE.Mesh>(null!);
  const enemyTexture = useTexture("/src/assets/enemy.png", (texture) => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
  });

  useFrame((_, delta) => {
    if (!enemyMeshRef.current) return;

    movementBehavior({
      currentPosition: enemyMeshRef.current.position,
      playerPosition,
      delta,
      speed,
    });
  });

  return (
    <mesh ref={enemyMeshRef} position={[position[0], position[1], 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={enemyTexture} transparent color="#ff4444" />
    </mesh>
  );
}
