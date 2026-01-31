import { useCollectable } from "../../hooks/use-collectable"
import { usePlayerSpeed } from "../../hooks/use-player-speed"
import type { CollectableProps } from "../collectable"

interface SpeedUpProps extends CollectableProps {
  speedMultiplier?: number
  duration?: number
}

export default function SpeedUp({
  position = [0, 1, 0],
  onCollect,
  speedMultiplier = 2,
  duration = 10,
}: SpeedUpProps) {
  const { meshRef, isCollected } = useCollectable({
    onCollect: () => {
      applySpeedBoost(speedMultiplier, duration)
      console.log(
        `Speed boost collected! Multiplier: ${speedMultiplier}x for ${duration}s`,
      )

      onCollect?.()
    },
  })
  const { applySpeedBoost } = usePlayerSpeed()

  if (isCollected) {
    return null
  }

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color='#00FF00'
        emissive='#00AA00'
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}
