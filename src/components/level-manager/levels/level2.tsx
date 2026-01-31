import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import floorImage from "../../../assets/floor.png";
import { useEnemySpawner } from "../../../hooks/use-enemy-spawner";
import { fleeFromPlayer } from "../../../utils/movement";
import SpeedUp from "../../collectables/speed-up";
import Enemy from "../../enemy";
import Obstacle from "../../obstacle";

export default function Level2() {
  const floorTexture = useTexture(floorImage);
  const { enemies, removeEnemy } = useEnemySpawner({
    spawnInterval: 1.5,
    baseSpeed: 2,
    maxSpeedIncrease: 2,
    initialEnemies: [{ id: 1, position: [-8, -8], speed: 2 }],
  });

  useMemo(() => {
    if (floorTexture) {
      // Configure texture for pixel art and tiling
      floorTexture.magFilter = THREE.NearestFilter;
      floorTexture.minFilter = THREE.NearestFilter;
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(40, 40);
    }
  }, [floorTexture]);

  return (
    <>
      {/* Floor plane */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial map={floorTexture} />
      </mesh>

      <Obstacle position={[-8, 8]} size={[2, 2]} color="#51cf66" />
      <Obstacle position={[8, 8]} size={[2, 2]} color="#339af0" />
      <Obstacle position={[-8, -8]} size={[2, 2]} color="#ffd43b" />
      <Obstacle position={[8, -8]} size={[2, 2]} color="#f783ac" />

      <SpeedUp position={[10, 10]} duration={5} speedMultiplier={2.5} />
      <SpeedUp position={[-10, -10]} duration={4} speedMultiplier={3} />
      <SpeedUp position={[0, -12]} duration={6} speedMultiplier={2} />

      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          position={enemy.position}
          speed={enemy.speed}
          movementBehavior={fleeFromPlayer}
          onDestroy={() => removeEnemy(enemy.id)}
        />
      ))}
    </>
  );
}
