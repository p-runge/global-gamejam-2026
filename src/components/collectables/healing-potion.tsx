import Collectable from "../collectable";
import { usePlayerHeal } from "../../hooks/use-player-heal";

interface HealingPotionProps {
  position: [number, number];
}

export default function HealingPotion({ position }: HealingPotionProps) {
  const { applyHealPlayer } = usePlayerHeal();

  function onCollect() {
    applyHealPlayer();
  }

  return (
    <Collectable position={position} color="#FF0000" onCollect={onCollect} />
  );
}
