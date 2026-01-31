import { useCollectable } from "../hooks/use-collectable"

export interface CollectableProps {
  position?: [number, number, number]
  onCollect?: () => void
}

export default function Collectable({
  position = [0, 1, 0],
  onCollect,
}: CollectableProps) {
  const { meshRef, isCollected } = useCollectable({
    onCollect: () => {
      console.log("Collectable collected!")
      onCollect?.()
    },
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
