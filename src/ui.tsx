import { useLevelManager } from "./components/level-manager/use-level-manager";
import UIElement from "./components/ui-element";
import { useGame } from "./hooks/use-game";

export default function UI() {
  const { activeLevelName } = useLevelManager();
  const { playerHealth } = useGame();
  const maxHealth = 5;

  const healthStates = Array.from({ length: maxHealth }, (_, index) =>
    index < playerHealth ? "healthy" : "damaged"
  );

  return (
    <UIElement>
      <div className="flex justify-between text-4xl text-black">
        <div className="border rounded-lg bg-white flex flex-col p-4 m-4">
          <p>Health: {playerHealth}</p>
        </div>
        <div className="border rounded-lg bg-white flex p-4 m-4 gap-2 items-center">
          {healthStates.map((state, index) => (
            <div key={index}>{state}</div>
          ))}
        </div>
        <div className="border rounded-lg bg-white flex p-4 m-4 gap-2 items-center">
          <p>Current Level: {activeLevelName}</p>
        </div>
      </div>
    </UIElement>
  );
}
