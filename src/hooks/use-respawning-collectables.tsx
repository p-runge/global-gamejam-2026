import { useState, useCallback } from "react";

interface ObstacleConfig {
  position: [number, number];
  size: [number, number];
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface CollectableConfig {
  healthPotions: number;
  speedUps: number;
}

interface RespawningCollectablesConfig {
  obstacles: ObstacleConfig[];
  bounds: Bounds;
  collectableConfig: CollectableConfig;
  respawnDelay?: number;
}

interface CollectableItem {
  id: string;
  position: [number, number, number];
}

export function useRespawningCollectables({
  obstacles,
  bounds,
  collectableConfig,
  respawnDelay = 3000,
}: RespawningCollectablesConfig) {
  // Generate unique IDs using Math.random()
  const generateId = () => `collectable-${Math.random().toString()}`;

  const generateRandomPosition = useCallback((): [number, number, number] => {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const x = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
      const y = Math.random() * (bounds.maxY - bounds.minY) + bounds.minY;

      // Check if position collides with any obstacle
      let hasCollision = false;
      for (const obstacle of obstacles) {
        const [obsX, obsY] = obstacle.position;
        const [sizeX, sizeY] = obstacle.size;

        const halfSizeX = sizeX / 2;
        const halfSizeY = sizeY / 2;
        const collectableRadius = 0.5;

        if (
          x + collectableRadius > obsX - halfSizeX &&
          x - collectableRadius < obsX + halfSizeX &&
          y + collectableRadius > obsY - halfSizeY &&
          y - collectableRadius < obsY + halfSizeY
        ) {
          hasCollision = true;
          break;
        }
      }

      if (!hasCollision) {
        return [x, y, 0];
      }

      attempts++;
    }

    // Fallback to center if no valid position found
    console.warn("Could not find valid spawn position, using fallback");
    return [0, 0, 0];
  }, [obstacles, bounds]);

  const generateInitialCollectables = useCallback(
    (count: number): CollectableItem[] => {
      return Array.from({ length: count }, () => ({
        id: generateId(),
        position: generateRandomPosition(),
      }));
    },
    [generateRandomPosition]
  );

  // Use lazy initialization
  const [healthPotions, setHealthPotions] = useState<CollectableItem[]>(() =>
    generateInitialCollectables(collectableConfig.healthPotions)
  );

  const [speedUps, setSpeedUps] = useState<CollectableItem[]>(() =>
    generateInitialCollectables(collectableConfig.speedUps)
  );

  const handleHealthPotionCollect = useCallback(
    (id: string) => {
      setHealthPotions((prev) => prev.filter((item) => item.id !== id));

      setTimeout(() => {
        setHealthPotions((prev) => [
          ...prev,
          {
            id: generateId(),
            position: generateRandomPosition(),
          },
        ]);
      }, respawnDelay);
    },
    [generateRandomPosition, respawnDelay]
  );

  const handleSpeedUpCollect = useCallback(
    (id: string) => {
      setSpeedUps((prev) => prev.filter((item) => item.id !== id));

      setTimeout(() => {
        setSpeedUps((prev) => [
          ...prev,
          {
            id: generateId(),
            position: generateRandomPosition(),
          },
        ]);
      }, respawnDelay);
    },
    [generateRandomPosition, respawnDelay]
  );

  return {
    healthPotions,
    speedUps,
    onHealthPotionCollect: handleHealthPotionCollect,
    onSpeedUpCollect: handleSpeedUpCollect,
  };
}
