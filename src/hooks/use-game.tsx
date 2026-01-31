import { createContext, useContext, useRef, useState } from "react";
import * as THREE from "three";

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

export const MAX_PLAYER_HEALTH = 3;

interface GameContextType {
  playerPosition: PlayerPosition;
  movePlayer: (position: PlayerPosition) => void;
  obstacleRefs: React.MutableRefObject<THREE.Object3D[]>;
  speedMultiplier: number;
  setSpeedMultiplier: (multiplier: number) => void;
  playerHealth: number;
  takePlayerDamage: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const obstacleRefs = useRef<THREE.Object3D[]>([]);

  const [playerHealth, setPlayerHealth] = useState<number>(3);
  const takePlayerDamage = () => {
    setPlayerHealth(Math.max(0, playerHealth - 1));
  };

  return (
    <GameContext.Provider
      value={{
        playerPosition,
        movePlayer: setPlayerPosition,
        obstacleRefs,
        speedMultiplier,
        setSpeedMultiplier,
        playerHealth,
        takePlayerDamage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
