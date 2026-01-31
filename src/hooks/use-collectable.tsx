import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useGame } from "./use-game"
import { isColliding } from "../utils/collision"
import coinSound from "../assets/audio/effects/retro-coin.mp3"

interface UseCollectableOptions {
  onCollect?: () => void
}

export function useCollectable(options?: UseCollectableOptions) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isCollected, setIsCollected] = useState(false)
  const { playerPosition } = useGame()
  const hasCollectedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement>(new Audio(coinSound))

  useFrame(() => {
    if (meshRef.current && !hasCollectedRef.current) {
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
        hasCollectedRef.current = true
        setIsCollected(true)

        // Play collection sound
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((error) => {
          console.error("Failed to play sound:", error)
        })

        if (options?.onCollect) {
          options.onCollect()
        }
      }
    }
  })

  return { meshRef, isCollected }
}
