import { Box3, Object3D } from "three";

export function isColliding(object1: Object3D, object2: Object3D): boolean {
  const box1 = new Box3().setFromObject(object1);
  const box2 = new Box3().setFromObject(object2);
  return box1.intersectsBox(box2);
}
