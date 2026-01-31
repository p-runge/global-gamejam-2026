import { usePlayerSpeed } from "../../hooks/use-player-speed";
import Collectable from "../collectable";

interface SpeedUpProps {
  position: [number, number];
  speedMultiplier: number;
  duration: number;
  id?: string;
  onCollect?: (id: string) => void;
}

export default function SpeedUp({
  position,
  speedMultiplier,
  duration,
  id,
  onCollect: onCollectCallback,
}: SpeedUpProps) {
  const { applySpeedBoost } = usePlayerSpeed();

  function onCollect() {
    applySpeedBoost(speedMultiplier, duration);
    if (onCollectCallback && id) {
      onCollectCallback(id);
    }
  }

  return (
    <Collectable position={position} color="#00FF00" onCollect={onCollect} />
  );
}
