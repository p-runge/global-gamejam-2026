import { Canvas } from "@react-three/fiber"
import { createRoot } from "react-dom/client"
import Menu from "./Scene/Menu"
import Controls from "./components/controls"
import SceneManager from "./components/scene-manager"
import { SceneManagerProvider } from "./components/scene-manager/use-scene-manager"
// todo : phillip implements this : import StartScreen from "./StartScreen"

export default function App() {
  return (
    <Menu>
      <div id='canvas-container'>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [6, 6, 6],
            fov: 45,
            near: 0.1,
            far: 50,
          }}
        >
          <ambientLight intensity={0.35} />

          <directionalLight
            position={[8, 10, 6]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={30}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <SceneManagerProvider>
            <Controls />
            <SceneManager />
          </SceneManagerProvider>
        </Canvas>
      </div>
    </Menu>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
