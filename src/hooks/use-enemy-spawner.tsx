import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export type Enemy = {
  id: number;
  position: [number, number];
  speed: number;
};

interface EnemySpawnerConfig {
  spawnInterval: number;
  baseSpeed: number;
  maxSpeedIncrease: number;
  initialEnemies?: Enemy[];
  screenBorder?: number;
}

export function useEnemySpawner({
  initialEnemies = [],
  spawnInterval,
  baseSpeed,
  maxSpeedIncrease,
  screenBorder = 12,
}: EnemySpawnerConfig) {
  const [enemies, setEnemies] = useState<Enemy[]>(initialEnemies);
  const nextIdRef = useRef(
    initialEnemies.length > 0
      ? Math.max(...initialEnemies.map((e) => e.id)) + 1
      : 1
  );
  const spawnTimerRef = useRef(0);

  const removeEnemy = (id: number) => {
    setEnemies((prev) => prev.filter((enemy) => enemy.id !== id));
  };

  // Spawn new enemies over time with increasing difficulty
  useFrame((_, delta) => {
    spawnTimerRef.current += delta;

    if (spawnTimerRef.current >= spawnInterval) {
      spawnTimerRef.current = 0;

      const newId = nextIdRef.current++;
      // Random spawn position at the border of the visible screen
      const edge = Math.floor(Math.random() * 4);
      let position: [number, number];

      switch (edge) {
        case 0: // top
          position = [
            Math.random() * screenBorder * 2 - screenBorder,
            screenBorder,
          ];
          break;
        case 1: // right
          position = [
            screenBorder,
            Math.random() * screenBorder * 2 - screenBorder,
          ];
          break;
        case 2: // bottom
          position = [
            Math.random() * screenBorder * 2 - screenBorder,
            -screenBorder,
          ];
          break;
        default: // left
          position = [
            -screenBorder,
            Math.random() * screenBorder * 2 - screenBorder,
          ];
      }

      // Speed increases slightly with each spawned enemy
      const speedIncrease = Math.min(newId * 0.05, maxSpeedIncrease);

      setEnemies((prev) => [
        ...prev,
        { id: newId, position, speed: baseSpeed + speedIncrease },
      ]);
    }
  });

  return { enemies, removeEnemy };
}
