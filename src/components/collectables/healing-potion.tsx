import { useGame } from "../../hooks/use-game";
import Collectable from "../collectable";

interface HealingPotionProps {
  position: [number, number];
  id?: string;
  onCollect?: (id: string) => void;
}

export default function HealingPotion({
  position,
  id,
  onCollect: onCollectCallback,
}: HealingPotionProps) {
  const { healPlayer } = useGame();

  function onCollect() {
    healPlayer();
    if (onCollectCallback && id) {
      onCollectCallback(id);
    }
  }

  return (
    <Collectable position={position} color="#FF0000" onCollect={onCollect} />
  );
}
