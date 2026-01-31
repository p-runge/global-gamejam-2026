import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useGame } from "../hooks/use-game"
import { isColliding } from "../utils/collision"

interface CollectableProps {
  position?: [number, number, number]
  onCollect?: () => void
}

export default function Collectable({
  position = [0, 1, 0],
  onCollect,
}: CollectableProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isCollected, setIsCollected] = useState(false)
  const { playerPosition } = useGame()
  const hasCollectedRef = useRef(false)

  useFrame(() => {
    if (meshRef.current && !hasCollectedRef.current) {
      // Create a temporary mesh at player position for collision check
      const playerMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial(),
      )
      playerMesh.position.set(
        playerPosition.x,
        playerPosition.y,
        playerPosition.z,
      )

      if (isColliding(playerMesh, meshRef.current)) {
        // todo: change this to store some kind of points
        console.log("Collectable collected!")
        hasCollectedRef.current = true
        setIsCollected(true)
        if (onCollect) {
          onCollect()
        }
      }
    }
  })

  if (isCollected) {
    return null
  }

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color='#FFD700'
        emissive='#FFA500'
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}
