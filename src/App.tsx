import "./App.css"

import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"

import { useEffect, useState } from "react"

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        setIsPlaying(true)
      }
    })
  }, [])

  return isPlaying ? (
    <div id='canvas-container'>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  ) : (
    <div className='start'>
      <p>Press space to start</p>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
