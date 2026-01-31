import LevelManager from "../components/level-manager";
import { LevelManagerProvider } from "../components/level-manager/use-level-manager";
import Player from "../player";
import World from "../world";

export default function Game() {
  return (
    <>
      <World />
      <LevelManagerProvider>
        <LevelManager />
        <Player />
      </LevelManagerProvider>
    </>
  );
}
