import { Html, Text } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function StartScreen() {
  const textRef = useRef<any>(null)
  const lightRef = useRef<THREE.SpotLight>(null)

  useFrame(({ clock }) => {
    if (textRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.3 + 0.7
      if (textRef.current.fillOpacity !== undefined) {
        textRef.current.fillOpacity = pulse
      }
    }
    if (lightRef.current) {
      const intensity = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 2
      lightRef.current.intensity = intensity
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        ref={lightRef}
        position={[0, 2, 3]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        target-position={[0, 0, 0]}
        castShadow
      />
      <pointLight position={[-2, 1, 2]} intensity={1} color='#4488ff' />
      <pointLight position={[2, 1, 2]} intensity={1} color='#ff4488' />

      <Html position={[0, 0, 0]} fullscreen>
        <div className='text-2xl underline flex justify-center'>
          Press Space
        </div>
      </Html>
    </>
  )
}
