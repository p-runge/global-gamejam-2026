import { createContext, useContext, useState } from "react";

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

interface GameContextType {
  playerPosition: PlayerPosition;
  movePlayer: (position: PlayerPosition) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 0,
    y: 0,
    z: 0,
  });

  return (
    <GameContext.Provider
      value={{ playerPosition, movePlayer: setPlayerPosition }}
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
