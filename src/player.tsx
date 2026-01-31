import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useControls } from "./hooks/use-controls";
import { useGame } from "./hooks/use-game";
import UI from "./ui";

export default function Player() {
  const { playerPosition, movePlayer } = useGame();
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const velocityRef = useRef(velocity);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useControls({
    keyboard: {
      w: {
        onPress: () => setVelocity((prev) => ({ ...prev, y: prev.y - 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, y: prev.y + 1 })),
      },
      s: {
        onPress: () => setVelocity((prev) => ({ ...prev, y: prev.y + 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, y: prev.y - 1 })),
      },
      a: {
        onPress: () => setVelocity((prev) => ({ ...prev, x: prev.x - 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, x: prev.x + 1 })),
      },
      d: {
        onPress: () => setVelocity((prev) => ({ ...prev, x: prev.x + 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, x: prev.x - 1 })),
      },
      ArrowUp: {
        onPress: () => setVelocity((prev) => ({ ...prev, y: prev.y - 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, y: prev.y + 1 })),
      },
      ArrowDown: {
        onPress: () => setVelocity((prev) => ({ ...prev, y: prev.y + 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, y: prev.y - 1 })),
      },
      ArrowLeft: {
        onPress: () => setVelocity((prev) => ({ ...prev, x: prev.x - 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, x: prev.x + 1 })),
      },
      ArrowRight: {
        onPress: () => setVelocity((prev) => ({ ...prev, x: prev.x + 1 })),
        onRelease: () => setVelocity((prev) => ({ ...prev, x: prev.x - 1 })),
      },
    },
  });

  useFrame((_, delta) => {
    const speed = 5;
    const vx = velocityRef.current.x;
    const vy = velocityRef.current.y;

    if (vx !== 0 || vy !== 0) {
      movePlayer({
        x: playerPosition.x + vx * speed * delta,
        y: playerPosition.y - vy * speed * delta,
        z: playerPosition.z,
      });
    }
  });

  return (
    <>
      <mesh position={[playerPosition.x, playerPosition.y, playerPosition.z]}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <PerspectiveCamera
        makeDefault
        position={[playerPosition.x, playerPosition.y, playerPosition.z + 6]}
        fov={45}
        near={0.1}
        far={1000}
      >
        <UI />
      </PerspectiveCamera>
    </>
  );
}
