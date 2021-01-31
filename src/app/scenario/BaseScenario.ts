import { BehaviorSubject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { Scene } from "../core/Scene";
import { Scenario } from "./Scenario";

export abstract class BaseScenario implements Scenario {
  scene: Scene = new Scene();
  constructor(protected status: BehaviorSubject<AppStatus>) {}
  abstract update(delta: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
