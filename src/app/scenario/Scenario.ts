import { Scene } from "../core/Scene";

export interface Scenario {
  scene: Scene;
  update(delta: number): void;
  destroy(): void;
}
