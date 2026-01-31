import { useGame } from "../hooks/use-game"

export function usePlayerSpeed() {
  const { setSpeedMultiplier } = useGame()

  const applySpeedBoost = (multiplier: number = 2, duration: number = 10) => {
    // Apply the speed boost
    setSpeedMultiplier(multiplier)

    // Reset to normal speed after duration
    setTimeout(() => {
      setSpeedMultiplier(1)
    }, duration * 1000)
  }

  return { applySpeedBoost }
}
