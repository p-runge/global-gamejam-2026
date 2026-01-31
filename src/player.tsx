import { OrthographicCamera, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useControls } from "./hooks/use-controls"
import { useGame } from "./hooks/use-game"
import UI from "./ui"
import { isColliding } from "./utils/collision"

export default function Player() {
  const { playerPosition, movePlayer, obstacleRefs, speedMultiplier } =
    useGame()
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const velocityRef = useRef(velocity)
  const playerMeshRef = useRef<THREE.Mesh>(null!)
  const characterTexture = useTexture("/src/assets/player.png", (texture) => {
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
  })

  useEffect(() => {
    velocityRef.current = velocity
  }, [velocity])

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
  })

  useFrame((_, delta) => {
    const baseSpeed = 5
    const speed = baseSpeed * speedMultiplier
    let vx = velocityRef.current.x
    let vy = velocityRef.current.y

    // Normalize velocity to always have magnitude 0 or 1
    const magnitude = Math.sqrt(vx * vx + vy * vy)
    if (magnitude > 0) {
      vx = vx / magnitude
      vy = vy / magnitude

      const newPos = {
        x: playerPosition.x + vx * speed * delta,
        y: playerPosition.y - vy * speed * delta,
        z: playerPosition.z,
      }

      // Temporarily move player to check collision
      if (playerMeshRef.current) {
        const originalPos = playerMeshRef.current.position.clone()
        playerMeshRef.current.position.set(newPos.x, newPos.y, newPos.z)

        // Check collision with all obstacles
        let hasCollision = false
        for (const obstacle of obstacleRefs.current) {
          if (obstacle && isColliding(playerMeshRef.current, obstacle)) {
            hasCollision = true
            break
          }
        }

        // Revert position
        playerMeshRef.current.position.copy(originalPos)

        // Only move if no collision
        if (!hasCollision) {
          movePlayer(newPos)
        }
      } else {
        movePlayer(newPos)
      }
    }
  })

  return (
    <>
      <mesh
        ref={playerMeshRef}
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
  )
}
