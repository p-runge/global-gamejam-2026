import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import UIElement from "../components/ui-element";
import { useControls } from "../hooks/use-controls";
import { useSceneManager } from "../components/scene-manager/use-scene-manager";

export default function Start() {
  const { switchScene } = useSceneManager();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useControls({
    keyboard: {
      " ": () => switchScene("game"),
      Enter: () => switchScene("game"),
    },
  });

  useFrame(({ clock }) => {
    if (textRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.3 + 0.7;
      if (textRef.current.fillOpacity !== undefined) {
        textRef.current.fillOpacity = pulse;
      }
    }
    if (lightRef.current) {
      const intensity = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 2;
      lightRef.current.intensity = intensity;
    }
  });

  return (
    <UIElement>
      <h1 className="text-center text-9xl py-30 tracking-[.3em] font-black text-white drop-shadow-lg">
        Title of Game
      </h1>
      <div className="flex flex-col gap-7 justify-center items-center">
        <p className="text-3xl tracking-[.3em] uppercase">Menu Option 1</p>
        <p className="text-3xl tracking-[.3em] uppercase">Menu Option 2</p>
        <p className="text-3xl tracking-[.3em] uppercase">Menu Option 3</p>
      </div>
    </UIElement>
  );
}
