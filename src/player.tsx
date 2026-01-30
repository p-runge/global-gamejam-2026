import { PerspectiveCamera } from "@react-three/drei";
import { useCallback } from "react";
import { useControls } from "./hooks/use-controls";
import { useGame } from "./hooks/use-game";
import UI from "./ui";

export default function Player() {
  const { playerPosition, movePlayer } = useGame();

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      const speed = 0.1;
      movePlayer({
        x: playerPosition.x + dx * speed,
        y: playerPosition.y - dy * speed,
        z: playerPosition.z,
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
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 6]}
        fov={45}
        near={0.1}
        far={1000}
      />
      <UI />
    </mesh>
  );
}
