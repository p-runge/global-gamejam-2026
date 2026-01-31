import { useGame } from "../../hooks/use-game";
import Collectable from "../collectable";

interface HealingPotionProps {
  position: [number, number];
}

export default function HealingPotion({ position }: HealingPotionProps) {
  const { healPlayer } = useGame();

  function onCollect() {
    healPlayer();
  }

  return (
    <Collectable position={position} color="#FF0000" onCollect={onCollect} />
  );
}
