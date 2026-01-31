import { OrthographicCamera, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import playerSpriteSheet from "./assets/player-sprites.png";
import {
  useAnimation,
  type Animation,
  type SpriteSheetData,
} from "./hooks/use-animation";
import { useControls } from "./hooks/use-controls";
import { useGame } from "./hooks/use-game";
import UI from "./ui";
import { isColliding } from "./utils/collision";

const spriteSheet: SpriteSheetData = {
  url: playerSpriteSheet,
  tileWidth: 32,
  tileHeight: 32,
  rows: 1,
  cols: 5,
};

const idleAnimation: Animation = [{ x: 0, y: 0, duration: 0.1 }];
const runningAnimation: Animation = [
  { x: 1, y: 0, duration: 0.1 },
  { x: 2, y: 0, duration: 0.15 },
  { x: 3, y: 0, duration: 0.1 },
  { x: 2, y: 0, duration: 0.15 },
];
const beingHitAnimation: Animation = [{ x: 4, y: 0, duration: 0.2 }];

export default function Player() {
  const {
    playerPosition,
    movePlayer,
    obstacleRefs,
    speedMultiplier,
    playerHealth,
  } = useGame();
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const velocityRef = useRef(velocity);
  const playerMeshRef = useRef<THREE.Mesh>(null!);
  const [isBeingHit, setIsBeingHit] = useState(false);
  const previousHealthRef = useRef(playerHealth);
  const [facingDirection, setFacingDirection] = useState<"left" | "right">(
    "left"
  );
  const { playAnimation, updateFrame } = useAnimation(
    spriteSheet,
    idleAnimation
  );

  const characterTexture = useTexture(spriteSheet.url, (texture) => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // Set initial UV repeat based on sprite sheet
    texture.repeat.set(1 / spriteSheet.cols, 1 / spriteSheet.rows);
  });

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  // Track when player takes damage and trigger hit animation
  useEffect(() => {
    if (playerHealth < previousHealthRef.current) {
      setIsBeingHit(true);
      // Reset hit state after animation duration
      const timer = setTimeout(() => setIsBeingHit(false), 200);
      return () => clearTimeout(timer);
    }
    previousHealthRef.current = playerHealth;
  }, [playerHealth]);

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
    const baseSpeed = 5;
    const speed = baseSpeed * speedMultiplier;
    let vx = velocityRef.current.x;
    let vy = velocityRef.current.y;

    const magnitude = Math.sqrt(vx * vx + vy * vy);
    const isMoving = magnitude > 0;

    // Track horizontal movement direction for mirroring
    if (vx > 0) {
      setFacingDirection("left");
    } else if (vx < 0) {
      setFacingDirection("right");
    }

    // Mirror the mesh based on facing direction
    if (playerMeshRef.current) {
      playerMeshRef.current.scale.x = facingDirection === "left" ? -1 : 1;
    }

    // Update animation based on state priority: hit > movement > idle
    if (isBeingHit) {
      playAnimation(beingHitAnimation);
    } else if (isMoving) {
      playAnimation(runningAnimation);
    } else {
      playAnimation(idleAnimation);
    }
    updateFrame(delta, characterTexture);

    if (magnitude > 0) {
      vx /= magnitude;
      vy /= magnitude;

      const newPos = {
        x: playerPosition.x + vx * speed * delta,
        y: playerPosition.y - vy * speed * delta,
        z: playerPosition.z,
      };

      // Temporarily move player to check collision
      if (playerMeshRef.current) {
        const originalPos = playerMeshRef.current.position.clone();
        playerMeshRef.current.position.set(newPos.x, newPos.y, newPos.z);

        // Check collision with all obstacles
        let hasCollision = false;
        for (const obstacle of obstacleRefs.current) {
          if (obstacle && isColliding(playerMeshRef.current, obstacle)) {
            hasCollision = true;
            break;
          }
        }

        // Revert position
        playerMeshRef.current.position.copy(originalPos);

        // Only move if no collision
        if (!hasCollision) {
          movePlayer(newPos);
        }
      } else {
        movePlayer(newPos);
      }
    }
  });

  return (
    <>
      <mesh
        ref={playerMeshRef}
        name="player-mesh"
        position={[playerPosition.x, playerPosition.y, playerPosition.z]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={characterTexture} transparent />
      </mesh>
      <OrthographicCamera
        makeDefault
        position={[playerPosition.x, playerPosition.y, playerPosition.z + 1]}
        zoom={100}
      >
        <UI />
      </OrthographicCamera>
    </>
  );
}
