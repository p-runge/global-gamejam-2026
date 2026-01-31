import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import floorImage from "../../../assets/floor.png";
import { useEnemySpawner } from "../../../hooks/use-enemy-spawner";
import { useRespawningCollectables } from "../../../hooks/use-respawning-collectables";
import { followPlayer } from "../../../utils/movement";
import HealingPotion from "../../collectables/healing-potion";
import SpeedUp from "../../collectables/speed-up";
import Enemy from "../../enemy";
import Obstacle from "../../obstacle";

const obstacleConfigs = [
  { position: [3, 0] as [number, number], size: [2, 2] as [number, number] },
  {
    position: [-4, 2] as [number, number],
    size: [1.5, 1.5] as [number, number],
  },
  { position: [0, -3] as [number, number], size: [3, 1] as [number, number] },
  {
    position: [-2, -5] as [number, number],
    size: [1, 2] as [number, number],
  },
  { position: [5, -2] as [number, number], size: [2, 2] as [number, number] },
];

export default function Level1() {
  const { healthPotions, speedUps, onHealthPotionCollect, onSpeedUpCollect } =
    useRespawningCollectables({
      obstacles: obstacleConfigs,
      bounds: { minX: -10, maxX: 10, minY: -10, maxY: 10 },
      collectableConfig: { healthPotions: 3, speedUps: 3 },
      respawnDelay: 5000,
    });

  const floorTexture = useTexture(floorImage);
  const { enemies, removeEnemy } = useEnemySpawner({
    spawnInterval: 1,
    baseSpeed: 1.5,
    maxSpeedIncrease: 3,
    initialEnemies: [{ id: 1, position: [8, 8], speed: 1.5 }],
  });

  useMemo(() => {
    if (floorTexture) {
      // Configure texture for pixel art and tiling
      floorTexture.magFilter = THREE.NearestFilter;
      floorTexture.minFilter = THREE.NearestFilter;
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(32, 32);
    }
  }, [floorTexture]);

  return (
    <>
      {/* Floor plane */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[32, 32]} />
        <meshBasicMaterial map={floorTexture} />
      </mesh>

      {obstacleConfigs.map((config, index) => (
        <Obstacle
          key={index}
          position={config.position}
          size={config.size}
          color={["#ff6b6b", "#51cf66", "#339af0", "#ffd43b", "#f783ac"][index]}
        />
      ))}

      {speedUps.map((speedUp) => (
        <SpeedUp
          key={speedUp.id}
          id={speedUp.id}
          position={[speedUp.position[0], speedUp.position[1]]}
          duration={3}
          speedMultiplier={2}
          onCollect={onSpeedUpCollect}
        />
      ))}

      {healthPotions.map((potion) => (
        <HealingPotion
          key={potion.id}
          id={potion.id}
          position={[potion.position[0], potion.position[1]]}
          onCollect={onHealthPotionCollect}
        />
      ))}

      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          position={enemy.position}
          speed={enemy.speed}
          movementBehavior={followPlayer}
          onDestroy={() => removeEnemy(enemy.id)}
        />
      ))}
    </>
  );
}
