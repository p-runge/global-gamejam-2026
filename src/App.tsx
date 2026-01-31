import { Canvas } from "@react-three/fiber";
import SceneManager from "./components/scene-manager";
import { SceneManagerProvider } from "./components/scene-manager/use-scene-manager";
import { GameProvider } from "./hooks/use-game";

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <GameProvider>
          <SceneManagerProvider>
            <SceneManager />
          </SceneManagerProvider>
        </GameProvider>
      </Canvas>
    </div>
  );
}
