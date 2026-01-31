import * as THREE from "three";

export interface MovementContext {
  currentPosition: THREE.Vector3;
  playerPosition: { x: number; y: number };
  delta: number;
  speed: number;
}

export type MovementBehavior = (context: MovementContext) => void;

export const followPlayer: MovementBehavior = ({
  currentPosition,
  playerPosition,
  delta,
  speed,
}) => {
  const dx = playerPosition.x - currentPosition.x;
  const dy = playerPosition.y - currentPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0.1) {
    const normalizedX = dx / distance;
    const normalizedY = dy / distance;

    currentPosition.x += normalizedX * speed * delta;
    currentPosition.y += normalizedY * speed * delta;
  }
};

export const fleeFromPlayer: MovementBehavior = ({
  currentPosition,
  playerPosition,
  delta,
  speed,
}) => {
  const dx = currentPosition.x - playerPosition.x;
  const dy = currentPosition.y - playerPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5 && distance > 0) {
    const normalizedX = dx / distance;
    const normalizedY = dy / distance;

    currentPosition.x += normalizedX * speed * delta;
    currentPosition.y += normalizedY * speed * delta;
  }
};
