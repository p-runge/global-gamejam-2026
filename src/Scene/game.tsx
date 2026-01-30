import Player from "../player";

export default function Game() {
  return (
    <>
      <Player />

      {/* test object */}
      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </>
  );
}
