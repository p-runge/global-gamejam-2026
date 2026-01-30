import { Html } from "@react-three/drei";

export default function UI() {
  return (
    <Html position={[0, 0, 0]} transform={false} fullscreen>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        abc
      </div>
    </Html>
  );
}
