import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import Obstacle from "../components/obstacle"
import Player from "../player"
import Collectable from "../components/collectable"
import SpeedUp from "../components/collectables/speed-up"

export default function Game() {
  const floorTexture = useTexture("/src/assets/floor.png", (texture) => {
    // Configure texture for pixel art and tiling
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(32, 32)
  })

  return (
    <>
      {/* Floor plane */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[32, 32]} />
        <meshBasicMaterial map={floorTexture} />
      </mesh>

      <Obstacle position={[3, 0]} size={[2, 2]} color='#ff6b6b' />
      <Obstacle position={[-4, 2]} size={[1.5, 1.5]} color='#51cf66' />
      <Obstacle position={[0, -3]} size={[3, 1]} color='#339af0' />
      <Obstacle position={[-2, -5]} size={[1, 2]} color='#ffd43b' />
      <Obstacle position={[5, -2]} size={[2, 2]} color='#f783ac' />

      <Collectable position={[0, 2, 0]} />
      <SpeedUp position={[0, 5, 0]} duration={3} speedMultiplier={2} />
      <Collectable position={[0, 8, 0]} />

      <Player />
    </>
  )
}
