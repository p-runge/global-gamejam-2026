import { useGame } from "./use-game";

export function usePlayerHeal() {
  const { healPlayer } = useGame();

  const applyHealPlayer = () => {
    healPlayer();
  };
  return { applyHealPlayer };
}
