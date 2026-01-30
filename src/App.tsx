import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Menu from "./Scene/Menu"

export default function App() {
  return (
    <Menu>
      <div id='canvas-container'>
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </Menu>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
