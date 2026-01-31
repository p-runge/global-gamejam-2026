import { useMemo, useRef, useState } from "react";
import Chunk from "./chunk";
import { useFrame } from "@react-three/fiber";
import { useGame } from "./hooks/use-game";
const CHUNK_SIZE = 32;

function chunkOrigin(cx: number, cy: number) {
  return { x: cx * CHUNK_SIZE, y: cy * CHUNK_SIZE, z: 0 };
}
export default function World() {
  const [centerChunk, setCenterChunk] = useState({ cx: 0, cy: 0 });
  const { playerPosition } = useGame();
  const last = useRef<{ cx: number; cy: number } | null>(null);
  const chunks = useMemo(() => {
    const out: { x: number; y: number; z: number }[] = [];

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        out.push(chunkOrigin(centerChunk.cx + dx, centerChunk.cy + dy));
      }
    }

    return out;
  }, [centerChunk]);

  useFrame(() => {
    const cx = Math.floor(playerPosition.x / 32);
    const cy = Math.floor(playerPosition.y / 32);

    if (!last.current || last.current.cx !== cx || last.current.cy !== cy) {
      last.current = { cx, cy };
      setCenterChunk({ cx, cy });
    }
  });

  return (
    <>
      {chunks.map((pos) => (
        <Chunk key={`${pos.x},${pos.y}`} position={pos} />
      ))}
    </>
  );
}
