import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGame } from "../hooks/use-game";
import { isColliding } from "../utils/collision";
import { type MovementBehavior } from "../utils/movement";

interface EnemyProps {
  position: [number, number];
  speed: number;
  movementBehavior: MovementBehavior;
  onDestroy?: () => void;
}

export default function Enemy({
  position,
  speed,
  movementBehavior,
  onDestroy,
}: EnemyProps) {
  const { playerPosition, takePlayerDamage } = useGame();
  const enemyMeshRef = useRef<THREE.Mesh>(null!);
  const playerMeshRef = useRef<THREE.Mesh | null>(null);
  const hasCollidedRef = useRef<boolean>(false);
  const enemyTexture = useTexture("/src/assets/enemy.png", (texture) => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
  });

  useFrame(({ scene }, delta) => {
    if (!enemyMeshRef.current) return;

    movementBehavior({
      currentPosition: enemyMeshRef.current.position,
      playerPosition,
      delta,
      speed,
    });

    // Find player mesh once
    if (!playerMeshRef.current) {
      const playerMesh = scene.getObjectByName("player-mesh");
      if (playerMesh instanceof THREE.Mesh) {
        playerMeshRef.current = playerMesh;
      } else {
        return; // Exit early if player not found
      }
    }

    // Check collision with player
    if (
      isColliding(enemyMeshRef.current, playerMeshRef.current) &&
      !hasCollidedRef.current
    ) {
      hasCollidedRef.current = true;
      takePlayerDamage();
      onDestroy?.();
    }
  });

  return (
    <mesh ref={enemyMeshRef} position={[position[0], position[1], 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={enemyTexture} transparent color="#ff4444" />
    </mesh>
  );
}
