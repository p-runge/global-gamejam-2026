import { useGame } from "./hooks/use-game";
import { useControls } from "./hooks/use-controls";
import { useCallback } from "react";

export default function Player() {
  const { playerPosition, movePlayer } = useGame();

  const handleMove = useCallback(
    (dx: number, dz: number) => {
      const speed = 0.1;
      movePlayer({
        x: playerPosition.x + dx * speed,
        y: playerPosition.y,
        z: playerPosition.z + dz * speed,
      });
    },
    [playerPosition, movePlayer],
  );

  useControls({
    keyboard: {
      w: () => handleMove(0, -1),
      s: () => handleMove(0, 1),
      a: () => handleMove(-1, 0),
      d: () => handleMove(1, 0),
      ArrowUp: () => handleMove(0, -1),
      ArrowDown: () => handleMove(0, 1),
      ArrowLeft: () => handleMove(-1, 0),
      ArrowRight: () => handleMove(1, 0),
    },
  });

  return (
    <mesh position={[playerPosition.x, playerPosition.y, playerPosition.z]}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
